'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from '@/context/LocaleContext';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/cn';

/**
 * 全局导航栏组件
 * 
 * 功能：
 * - 响应式设计：桌面端显示完整导航，移动端显示汉堡菜单
 * - 滚动时背景变化（毛玻璃效果）
 * - 语言切换（中/英）
 * - 主题切换（亮色/暗色）
 * - 移动端全屏菜单（通过 Portal 渲染到 body）
 */
export function Navbar(): JSX.Element {
    const { t, locale, toggleLocale } = useLocale();
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();
    const router = useRouter();

    // 状态管理
    const [isScrolled, setIsScrolled] = useState(false);      // 是否已滚动（用于背景变化）
    const [isVisible, setIsVisible] = useState(true);         // 导航栏是否可见
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 移动端菜单开关
    const [mounted, setMounted] = useState(false);            // 客户端挂载状态（用于 Portal）

    // 客户端挂载检测
    useEffect(() => {
        setMounted(true);
    }, []);

    // 移动端菜单打开时禁止页面滚动
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    // 监听滚动，控制导航栏背景样式
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 导航菜单项配置
    const navItems = [
        { label: t.nav.home, href: '/' },
        { label: t.nav.product, href: '/product' },
        { label: t.nav.news, href: '/news' },
        { label: t.nav.product === '产品' ? '支持' : 'Support', href: '/support' },
        { label: t.nav.about, href: '/about' },
    ];

    /**
     * 平滑滚动到指定锚点
     * @param href - 锚点链接，如 "/#section-id"
     */
    const scrollToSection = useCallback((href: string) => {
        if (href.startsWith('/#')) {
            const sectionId = href.substring(2);
            const element = document.querySelector(`#${sectionId}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsMobileMenuOpen(false);
    }, []);

    /**
     * 判断链接是否为当前激活状态
     * @param href - 链接路径
     */
    const isActiveLink = (href: string) => {
        if (href === '/') return pathname === '/';
        if (href.startsWith('/#')) return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <>
            <motion.nav
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    isScrolled
                        ? 'bg-deep-space/95 backdrop-blur-md border-b border-outline-border shadow-lg'
                        : 'bg-deep-space/80 backdrop-blur-md border-b border-outline-border/50'
                )}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="relative z-50 flex items-center justify-between h-16 lg:h-20">
                        {/* Logo - Left */}
                        <div className="flex items-center gap-12">
                            <Link href="/" className="relative z-10 flex items-center gap-2" onClick={(e) => {
                                if (pathname === '/') {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }}>
                                <Image
                                    src="/img/header.png"
                                    alt="Aerolus Logo"
                                    width={120}
                                    height={40}
                                    className="h-8 lg:h-10 w-auto object-contain transition-opacity hover:opacity-80"
                                    priority
                                />
                                {/* Logo 文字 - 中英文切换 */}
                                <span className="text-lg lg:text-xl font-bold text-soft-white tracking-wide">
                                    {locale === 'zh' ? '领飞特' : 'Aerolus'}
                                </span>
                            </Link>
                        </div>

                        {/* Center Navigation - Absolute Center */}
                        <div className="hidden 2xl:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => {
                                        if (item.href.startsWith('/#')) {
                                            e.preventDefault();
                                            scrollToSection(item.href);
                                        }
                                    }}
                                >
                                    <motion.span
                                        className={cn(
                                            'text-sm font-semibold tracking-wide transition-colors cursor-pointer',
                                            isActiveLink(item.href)
                                                ? 'text-soft-white'
                                                : 'text-muted-gray hover:text-soft-white'
                                        )}
                                        whileHover={{ y: -2 }}
                                    >
                                        {item.label}
                                    </motion.span>
                                </Link>
                            ))}
                        </div>

                        {/* Right Buttons */}
                        <div className="hidden 2xl:flex items-center gap-4">
                            {/* Discord Icon */}
                            <a href="https://discord.gg/VhegnvM6AQ" target="_blank" rel="noopener noreferrer"
                                className="text-muted-gray hover:text-soft-white transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" /></svg>
                            </a>

                            {/* Preorder Button */}
                            <Link href="/preorder">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-2 text-xs font-bold tracking-widest uppercase bg-accent text-deep-space hover:bg-accent-dim transition-all duration-300"
                                >
                                    {t.nav.preorder}
                                </motion.button>
                            </Link>

                            {/* Language Switcher - 方形按钮 */}
                            <button
                                onClick={toggleLocale}
                                className="px-4 py-2 text-xs font-bold tracking-widest uppercase bg-transparent border border-outline-border text-muted-gray hover:text-soft-white hover:border-accent transition-all duration-300"
                            >
                                {locale === 'zh' ? 'EN' : '中文'}
                            </button>

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="w-10 h-10 flex items-center justify-center transition-all rounded-full border text-muted-gray hover:text-soft-white border-outline-border hover:border-accent"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {theme === 'dark' ? (
                                        <motion.div
                                            key="moon"
                                            initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                            exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                            </svg>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="sun"
                                            initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                            exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </div>

                        {/* Mobile Menu Button - shows until 2xl */}
                        <motion.button
                            className="2xl:hidden p-2 text-muted-gray hover:text-white transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay - Rendered via Portal */}
            {mounted && typeof window !== 'undefined' && createPortal(
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-[9999] 2xl:hidden flex flex-col bg-deep-space overflow-y-auto"
                        >
                            {/* Mobile Menu Header - Logo & Close */}
                            <div className="flex items-center justify-between px-6 h-16 border-b border-outline-border bg-deep-space">
                                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Image
                                        src="/img/header.png"
                                        alt="Aerolus Logo"
                                        width={120}
                                        height={40}
                                        className="h-8 w-auto object-contain"
                                        priority
                                    />
                                </Link>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 text-muted-gray hover:text-soft-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Mobile Menu Content */}
                            <div className="flex flex-col gap-6 px-8 pt-8 pb-8">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + index * 0.1 }}
                                    >
                                        <a
                                            href={item.href}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (item.href.startsWith('/#')) {
                                                    scrollToSection(item.href);
                                                } else {
                                                    setIsMobileMenuOpen(false);
                                                    router.push(item.href);
                                                }
                                            }}
                                            className={cn(
                                                'block text-2xl font-medium transition-colors cursor-pointer',
                                                isActiveLink(item.href)
                                                    ? 'text-soft-white'
                                                    : 'text-muted-gray hover:text-soft-white'
                                            )}
                                        >
                                            {item.label}
                                        </a>
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="pt-8 border-t border-outline-border flex flex-col gap-6"
                                >
                                    <Link
                                        href="/preorder"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block w-full"
                                    >
                                        <span className="flex items-center justify-center w-full h-14 text-lg font-medium tracking-wider uppercase bg-accent text-deep-space hover:bg-accent-dim transition-all rounded-sm">
                                            {t.nav.preorder}
                                        </span>
                                    </Link>

                                    <button
                                        onClick={() => {
                                            toggleLocale();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="flex items-center gap-3 text-lg font-medium text-muted-gray hover:text-soft-white transition-colors"
                                    >
                                        <Globe className="w-5 h-5" />
                                        <span>{t.nav.language}</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            toggleTheme();
                                        }}
                                        className="flex items-center gap-3 text-lg font-medium text-muted-gray hover:text-soft-white transition-colors"
                                    >
                                        {theme === 'dark' ? (
                                            <>
                                                <Sun className="w-5 h-5" />
                                                <span>{locale === 'zh' ? '浅色模式' : 'Light Mode'}</span>
                                            </>
                                        ) : (
                                            <>
                                                <Moon className="w-5 h-5" />
                                                <span>{locale === 'zh' ? '深色模式' : 'Dark Mode'}</span>
                                            </>
                                        )}
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}

        </>
    );
}
