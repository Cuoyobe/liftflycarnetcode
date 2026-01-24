'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';

/**
 * 首页主视觉区块（Hero Section）
 * 
 * 功能：
 * - 全屏背景视频展示
 * - 品牌标语与产品介绍
 * - CTA 按钮（了解产品 / 预订）
 * - 底部滚动指示器（点击平滑滚动到下一区块）
 */
export function Hero(): JSX.Element {
    const { t } = useLocale();

    /**
     * 平滑滚动到产品介绍区块
     */
    const scrollToNext = () => {
        const element = document.querySelector('#product-intro');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="hero"
            className="relative h-screen flex items-center overflow-hidden"
        >
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            >
                <source src="/video/intro.webm" type="video/webm" />
            </video>

            {/* Overlay - 降低遮罩透明度，保留少量以确保文字可读 */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />



            {/* Content - Left aligned */}
            <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 pointer-events-none">
                <div className="max-w-xl">
                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-white/80 mb-4"
                    >
                        {t.hero.subtitle}
                    </motion.p>

                    {/* Main Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6"
                    >
                        {t.hero.title}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-md"
                    >
                        {t.hero.description}
                    </motion.p>

                    {/* CTA Buttons - Responsive Layout */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
                        <Link href="/product" className="w-full sm:w-auto">
                            <motion.span
                                className="w-full sm:w-40 h-12 flex items-center justify-center text-sm font-medium tracking-wider uppercase border border-white/40 text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t.hero.cta}
                            </motion.span>
                        </Link>

                        <Link href="/preorder" className="w-full sm:w-auto">
                            <motion.span
                                className="w-full sm:w-40 h-12 flex items-center justify-center text-sm font-medium tracking-wider uppercase bg-white text-black hover:bg-white/90 transition-all duration-300 cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t.hero.preorder}
                            </motion.span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <motion.button
                    onClick={scrollToNext}
                    className="text-white/50 hover:text-white transition-colors pointer-events-auto"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ChevronDown className="w-6 h-6" />
                </motion.button>
            </motion.div>
        </section>
    );
}
