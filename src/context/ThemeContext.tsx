'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';

/** 主题类型 */
type Theme = 'dark' | 'light';

/**
 * 主题上下文类型定义
 */
interface ThemeContextType {
    /** 当前主题 */
    theme: Theme;
    /** 切换主题 */
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * 主题上下文提供者
 * 
 * 功能：
 * - 自动检测用户主题偏好（优先级：localStorage > IP地理位置 > 系统偏好）
 * - 中国大陆/港澳台地区默认亮色，其他地区默认暗色
 * - 提供主题切换功能
 * - 同步更新 HTML 根元素的 class
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);
    const isManuallyToggled = useRef(false);

    // 初始化主题
    // 初始化主题
    useEffect(() => {
        const initTheme = async () => {
            // 1. 优先检查 localStorage
            const savedTheme = localStorage.getItem('theme') as Theme;

            // 标记是否有本地缓存，用于决定是否需要 IP 检测
            const hasSavedTheme = !!savedTheme;
            let currentTheme: Theme = 'light';

            if (savedTheme) {
                currentTheme = savedTheme;
                setTheme(savedTheme);
            } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                // 2. 如果没有保存的偏好，遵循系统设置
                currentTheme = 'dark';
                setTheme('dark');
            } else {
                currentTheme = 'light';
                setTheme('light');
            }
            setMounted(true);

            // 3. IP 地理位置检测 (非阻塞异步执行)
            // 仅在用户没有手动设置过偏好(local storage为空)时执行
            if (!hasSavedTheme) {
                try {
                    const response = await fetch('https://ipapi.co/json/');
                    const data = await response.json();

                    // 逻辑: 中国大陆/港澳台 (CN, HK, MO, TW) -> Light, 其他地区 -> Dark
                    const isChinaRegion = ['CN', 'HK', 'MO', 'TW'].includes(data.country_code);
                    const ipTheme = isChinaRegion ? 'light' : 'dark';

                    // 再次检查: 如果用户在 API 请求期间没有手动切换过主题，且 IP 主题与当前不同，则更新
                    if (!isManuallyToggled.current && ipTheme !== currentTheme) {
                        setTheme(ipTheme);
                    }
                } catch (error) {
                    console.error('Failed to fetch IP geolocation:', error);
                    // 失败时静默处理，保持系统偏好
                }
            }
        };

        initTheme();
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme, mounted]);

    const toggleTheme = () => {
        isManuallyToggled.current = true;
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    // 始终渲染 Provider，避免 SSR 期间 useTheme 抛出错误
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
