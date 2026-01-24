'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { cn } from '@/lib/cn';

/** 应用场景数据类型 */
interface ScenarioCard {
    id: string;
    title: string;
    subtitle: string;
    image: string;
}

/**
 * 苹果风格应用场景区块
 * 全屏展示，竖向长方形卡片，文字位于图片上方
 */
export function ApplicationScenarios(): JSX.Element {
    const { t, locale } = useLocale();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // 场景图片映射（对应 i18n 中定义的 6 个场景）
    const scenarioImages = [
        '/img/home/scenario-tourism.webp', // 旅游
        '/img/home/scenario-entertainment.webp', // 娱乐
        '/img/home/scenario-sport.webp', // 运动
        '/img/home/scenario-rescue.webp', // 救援
        '/img/home/scenario-transport.webp', // 物流
        '/img/home/scenario-patrol.webp', // 巡逻
    ];


    const scenarios: ScenarioCard[] = t.scenarios.data.map((item, index) => ({
        id: `scenario-${index + 1}`,
        title: item.title,
        subtitle: item.description,
        image: scenarioImages[index],
    }));

    /** 检查滚动状态 */
    const checkScrollState = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // 使用 10px 容差
        setCanScrollLeft(container.scrollLeft > 10);
        setCanScrollRight(
            container.scrollLeft < container.scrollWidth - container.clientWidth - 10
        );
    };

    /** 滚动到左边 */
    const scrollLeft = () => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const cardWidth = 320; // 卡片宽度
        const gap = 24; // 间距
        const scrollAmount = cardWidth + gap;
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        // 滚动动画结束后检查状态
        setTimeout(checkScrollState, 500);
    };

    /** 滚动到右边 */
    const scrollRight = () => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const cardWidth = 320;
        const gap = 24;
        const scrollAmount = cardWidth + gap;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        setTimeout(checkScrollState, 500);
    };

    // 初始化检查滚动状态
    useEffect(() => {
        checkScrollState();
        window.addEventListener('resize', checkScrollState);
        return () => window.removeEventListener('resize', checkScrollState);
    }, []);

    return (
        <section id="scenarios" className="relative h-screen flex flex-col justify-center bg-deep-space overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 md:mb-16 ml-2"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-soft-white mb-6">
                        {locale === 'zh' ? '应用场景' : 'Application Scenarios'}
                    </h2>
                    <p className="text-lg md:text-xl text-muted-gray max-w-2xl">
                        {locale === 'zh'
                            ? '测试'
                            : 'Test'}
                    </p>
                </motion.div>

                {/* Navigation Buttons + Cards */}
                <div className="relative group/container">
                    {/* Left Arrow - 悬浮在内容左侧 */}
                    <button
                        onClick={scrollLeft}
                        className={cn(
                            'absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300',
                            canScrollLeft
                                ? 'opacity-0 group-hover/container:opacity-100 hover:bg-white hover:text-black cursor-pointer'
                                : 'opacity-0 cursor-default hidden'
                        )}
                        disabled={!canScrollLeft}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    {/* Right Arrow - 悬浮在内容右侧 */}
                    <button
                        onClick={scrollRight}
                        className={cn(
                            'absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300',
                            canScrollRight
                                ? 'opacity-0 group-hover/container:opacity-100 hover:bg-white hover:text-black cursor-pointer'
                                : 'opacity-0 cursor-default hidden'
                        )}
                        disabled={!canScrollRight}
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    {/* Scrollable Cards Container */}
                    <div
                        ref={scrollContainerRef}
                        onScroll={checkScrollState}
                        className="flex gap-6 overflow-x-auto scrollbar-hide py-4 px-2 -mx-2"
                        style={{ scrollSnapType: 'x mandatory' }}
                    >
                        {scenarios.map((scenario, index) => (
                            <motion.div
                                key={scenario.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex-shrink-0 w-[70vw] md:w-[35vw] lg:w-[22vw] max-w-[360px] aspect-[3/5] relative rounded-3xl overflow-hidden group cursor-pointer bg-neutral-900"
                                style={{ scrollSnapAlign: 'start' }}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                                    <Image
                                        src={scenario.image}
                                        alt={scenario.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 280px, 320px"
                                    />
                                    {/* Gradient Overlay for Text Readability - Top down */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent opacity-80" />
                                    {/* Darken on hover effect */}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                                </div>

                                {/* Content - Located at the Top */}
                                <div className="absolute top-0 left-0 right-0 p-8 z-10">
                                    <p className="text-blue-400 font-medium text-xs tracking-widest uppercase mb-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        {locale === 'zh' ? '应用场景' : 'SCENARIO'}
                                    </p>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 shadow-black drop-shadow-lg break-words">
                                        {scenario.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-200 leading-relaxed drop-shadow-md break-words">
                                        {scenario.subtitle}
                                    </p>
                                </div>


                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 向下滚动按钮 */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <motion.button
                    onClick={() => {
                        const element = document.querySelector('#news');
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    className="text-soft-white/50 hover:text-soft-white transition-colors"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ChevronDown className="w-6 h-6" />
                </motion.button>
            </motion.div>
        </section>
    );
}
