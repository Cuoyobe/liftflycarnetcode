'use client';

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    type ReactNode
} from 'react';
import { type Locale, translations, type Translations } from '@/lib/i18n';

/**
 * 语言上下文类型定义
 */
interface LocaleContextType {
    /** 当前语言代码 */
    locale: Locale;
    /** 当前语言的翻译文本 */
    t: Translations;
    /** 切换语言（中/英互切） */
    toggleLocale: () => void;
    /** 设置指定语言 */
    setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

/** localStorage 存储键名 */
const STORAGE_KEY = 'aerolus-locale';

interface LocaleProviderProps {
    children: ReactNode;
}

/**
 * 语言上下文提供者
 * 
 * 功能：
 * - 自动检测用户语言偏好（优先级：localStorage > IP地理位置 > 浏览器语言）
 * - 提供语言切换功能
 * - 防止语言闪烁（初始化完成前显示占位符）
 */
export function LocaleProvider({ children }: LocaleProviderProps): JSX.Element {
    const [locale, setLocaleState] = useState<Locale>('en');
    const [isInitialized, setIsInitialized] = useState(false);

    /**
     * 检测浏览器语言偏好
     * @returns 'zh' | 'en' 根据浏览器语言返回对应语言代码
     */
    const detectBrowserLocale = (): Locale => {
        // 确保在浏览器环境中执行
        if (typeof window === 'undefined') {
            return 'en';
        }

        const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || '';
        // 检查是否为中文（zh, zh-CN, zh-TW, zh-HK 等）
        if (browserLang.toLowerCase().startsWith('zh')) {
            return 'zh';
        }
        return 'en';
    };

    // 初始化时检测语言
    useEffect(() => {
        const detectLocale = async () => {
            // 1. 优先检查 localStorage（用户手动设置过的语言）
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored === 'zh' || stored === 'en') {
                setLocaleState(stored);
                setIsInitialized(true);
                return;
            }

            // 2. 尝试基于 IP 的地理位置检测
            try {
                const response = await fetch('https://ipapi.co/json/', {
                    signal: AbortSignal.timeout(3000), // 3秒超时
                });

                if (response.ok) {
                    const data = await response.json();
                    // 根据国家代码判断语言 (CN, HK, MO, TW -> zh)
                    const cnRegions = ['CN', 'HK', 'MO', 'TW'];
                    const detectedLocale: Locale = cnRegions.includes(data.country_code) ? 'zh' : 'en';
                    setLocaleState(detectedLocale);
                    localStorage.setItem(STORAGE_KEY, detectedLocale);
                    setIsInitialized(true);
                    return;
                }
            } catch {
                // IP 检测失败，继续降级到浏览器语言检测
                console.log('IP detection failed, falling back to browser language');
            }

            // 3. 降级方案：基于浏览器语言偏好检测
            const browserLocale = detectBrowserLocale();
            console.log(`Using browser language preference: ${browserLocale}`);
            setLocaleState(browserLocale);
            localStorage.setItem(STORAGE_KEY, browserLocale);
            setIsInitialized(true);
        };

        detectLocale();
    }, []);

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem(STORAGE_KEY, newLocale);
    }, []);

    const toggleLocale = useCallback(() => {
        const newLocale: Locale = locale === 'zh' ? 'en' : 'zh';
        setLocale(newLocale);
    }, [locale, setLocale]);

    const t = translations[locale];

    // 不再阻塞渲染，允许内容立即显示
    // 语言检测完成后会自动切换（可能有短暂闪烁，但比 3s 空白好得多）

    return (
        <LocaleContext.Provider value={{ locale, t, toggleLocale, setLocale }}>
            {children}
        </LocaleContext.Provider>
    );
}

export function useLocale(): LocaleContextType {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error('useLocale must be used within a LocaleProvider');
    }
    return context;
}
