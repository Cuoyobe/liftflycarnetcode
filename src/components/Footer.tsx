'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';
import { cn } from '@/lib/cn';

/**
 * 全局页脚组件
 * 
 * 功能：
 * - 品牌 Logo 与预订按钮
 * - 站内导航链接
 * - 社交媒体链接（图标从 public/social/ 加载）
 * - 法律条款链接
 * - 版权信息与 ICP 备案号（仅中文）
 */
export function Footer(): JSX.Element {
    const { t, locale } = useLocale();
    const currentYear = new Date().getFullYear();

    // 站内导航链接配置
    const navLinks = [
        { label: t.nav.home, href: '/' },
        { label: t.nav.product, href: '/product' },
        { label: t.nav.news, href: '/news' },
        { label: t.nav.about, href: '/about' },
        { label: t.footer.navigation === '导航' ? '支持' : 'Support', href: '/support' },
    ];

    // 社交媒体链接配置（图标路径指向 public/social/）
    const socialLinks = [
        { label: 'Email', href: 'mailto:support@liftflycar.com', src: '/social/email.svg' },
        { label: 'Discord', href: 'https://discord.gg/VhegnvM6AQ', src: '/social/discord.svg' },
        { label: 'X (Twitter)', href: 'https://x.com/Aerolus_', src: '/social/x.svg' },
        { label: 'Instagram', href: 'https://www.instagram.com/aerolus_lift', src: '/social/instagram.svg' },
        { label: 'YouTube', href: 'https://www.youtube.com/@%E6%9E%81%E9%A3%8E%E9%A3%9E%E8%BD%A6_Aerolus', src: '/social/youtube.svg' },
        { label: 'Bilibili', href: 'https://space.bilibili.com/1486958597', src: '/social/bilibili.svg' },
        { label: 'Weibo', href: 'https://weibo.com/u/7318659716', src: '/social/weibo.svg' },
    ];

    return (
        <footer className="relative border-t border-outline-border bg-deep-space">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand & Subscribe */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block mb-6">
                            <Image
                                src="/img/footer.png"
                                alt="Aerolus Logo"
                                width={120}
                                height={40}
                                className="h-8 w-auto object-contain transition-opacity hover:opacity-80"
                            />
                        </Link>

                        {/* Preorder Button */}
                        <Link href="/preorder" className="block">
                            <motion.button
                                className="px-8 py-3 text-sm font-medium bg-soft-white text-deep-space hover:bg-soft-white/90 transition-all w-auto rounded-sm"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {t.nav.preorder}
                            </motion.button>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-sm font-semibold text-soft-white tracking-wide mb-4">
                            {t.footer.navigation}
                        </h4>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-gray hover:text-soft-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-sm font-semibold text-soft-white tracking-wide mb-4">
                            {t.footer.social}
                        </h4>
                        <div className="inline-grid grid-rows-4 grid-flow-col gap-x-6 gap-y-2 w-fit">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-sm text-muted-gray hover:text-soft-white transition-colors group"
                                    aria-label={link.label}
                                >
                                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all overflow-hidden relative">
                                        <Image
                                            src={link.src}
                                            alt={link.label}
                                            width={16}
                                            height={16}
                                            className={cn(
                                                "w-4 h-4 object-contain transition-transform group-hover:scale-110",
                                                !link.src.includes('color') && "dark:brightness-0 dark:invert"
                                            )}
                                        />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-sm font-semibold text-soft-white tracking-wide mb-4">
                            {t.footer.legal}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/policy"
                                    className="text-sm text-muted-gray hover:text-soft-white transition-colors"
                                >
                                    {t.footer.privacy}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/policy"
                                    className="text-sm text-muted-gray hover:text-soft-white transition-colors"
                                >
                                    {t.footer.terms}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-outline-border">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-muted-gray/70">
                            {t.footer.copyright} {currentYear} liftflycar.com. {t.footer.rights}.
                        </p>
                        {locale === 'zh' && t.footer.icp && (
                            <p className="text-xs text-muted-gray/70">
                                {t.footer.icp}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </footer >
    );
}
