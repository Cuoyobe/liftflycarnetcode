'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useAutoSwitch } from '@/hooks/useAutoSwitch';

/**
 * 全屏轮播区块数据项
 */
export interface FullScreenSectionItem {
    title: string;
    description: string;
}

/**
 * 全屏轮播区块属性
 */
interface FullScreenSectionProps {
    /** 区块 ID */
    id: string;
    /** 数据项列表 */
    data: FullScreenSectionItem[];
    /** 分类标签列表 */
    categories: string[];
    /** 背景图片路径（可以是单个路径或路径数组，数组时每个分类对应一张图） */
    backgroundImage: string | string[];
    /** 区块标题标签 */
    sectionLabel: string;
    /** 下一区块 ID，用于滚动导航 */
    nextSectionId: string;
    /** 文本对齐方向 */
    textAlignment: 'left' | 'right';
    /** 自动切换间隔(ms) */
    autoSwitchInterval?: number;
    /** 仅手动切换模式（禁用自动切换和进度条动画） */
    manualOnly?: boolean;
}

/**
 * 全屏轮播区块公共组件
 * 适用于 ProductIntro、Scenarios、Vision、CSR 等页面区块
 */
export function FullScreenSection({
    id,
    data,
    categories,
    backgroundImage,
    sectionLabel,
    nextSectionId,
    textAlignment,
    autoSwitchInterval = 5000,
    manualOnly = false,
}: FullScreenSectionProps): JSX.Element {
    const { currentIndex, direction, handleManualSwitch, stopAutoSwitch, startAutoSwitch } = useAutoSwitch(
        categories.length,
        manualOnly ? 0 : autoSwitchInterval // 传入0禁用自动切换
    );

    const scrollToNext = () => {
        const element = document.querySelector(`#${nextSectionId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const slideVariants = {
        enter: { opacity: 0, scale: 1.02 },
        center: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.98 },
    };

    const textVariants = {
        enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir < 0 ? 60 : -60, opacity: 0 }),
    };

    const currentItem = data[currentIndex];
    const isRightAligned = textAlignment === 'right';

    // 获取当前背景图（支持单图或多图数组）
    const getCurrentBackground = (): string => {
        if (Array.isArray(backgroundImage)) {
            return backgroundImage[currentIndex] || backgroundImage[0];
        }
        return backgroundImage;
    };

    return (
        <section id={id} className="relative h-screen w-full overflow-hidden">
            {/* 背景图层 */}
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-deep-space"
                >
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-deep-space via-deep-space/90 to-deep-space bg-cover bg-center"
                        style={{ backgroundImage: `url(${getCurrentBackground()})` }}
                    />
                    <div className={cn(
                        "absolute inset-0 z-0",
                        isRightAligned
                            ? "bg-gradient-to-l from-deep-space via-deep-space/80 to-transparent via-50%"
                            : "bg-gradient-to-r from-deep-space via-deep-space/80 to-transparent via-50%"
                    )} />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-space/40 via-transparent to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* 内容区域 */}
            <div className="relative z-10 h-full flex flex-col justify-between px-6 md:px-12 lg:px-20 py-20 md:py-28">
                <div className={cn(
                    "flex-1 flex items-center",
                    isRightAligned ? "justify-end" : "justify-start"
                )}>
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            className="max-w-xl"
                        >
                            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4 break-words">
                                {sectionLabel}
                            </p>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-soft-white mb-4 md:mb-6 break-words">
                                {currentItem.title}
                            </h2>
                            <p className="text-sm md:text-base text-soft-white/80 leading-relaxed break-words">
                                {currentItem.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* 进度条导航 */}
                <div
                    className="w-full max-w-2xl mx-auto"
                    onMouseEnter={stopAutoSwitch}
                    onMouseLeave={startAutoSwitch}
                >
                    <div className="relative h-16 bg-card-bg/60 backdrop-blur-md border border-outline-border rounded-full p-1 flex items-center justify-between">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => handleManualSwitch(index)}
                                className="relative flex-1 h-full flex items-center justify-center"
                            >
                                {currentIndex === index && (
                                    <motion.div
                                        layoutId={manualOnly ? undefined : `active-pill-${id}`}
                                        key={manualOnly ? `pill-${index}` : undefined}
                                        className="absolute inset-0 bg-accent/10 border border-accent/30 shadow-sm rounded-full overflow-hidden"
                                        initial={manualOnly ? { opacity: 0 } : undefined}
                                        animate={manualOnly ? { opacity: 1 } : undefined}
                                        transition={manualOnly ? { duration: 0.2 } : {
                                            type: 'spring',
                                            stiffness: 300,
                                            damping: 30
                                        }}
                                    >
                                        {/* 进度填充 - 仅在非手动模式下显示 */}
                                        {!manualOnly && (
                                            <motion.div
                                                className="absolute inset-0 bg-accent/20 origin-left"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{
                                                    duration: autoSwitchInterval / 1000,
                                                    ease: 'linear'
                                                }}
                                            />
                                        )}
                                    </motion.div>
                                )}
                                <span
                                    className={cn(
                                        'relative z-10 text-sm md:text-base font-medium transition-colors duration-200',
                                        currentIndex === index
                                            ? 'text-soft-white'
                                            : 'text-muted-gray hover:text-soft-white'
                                    )}
                                >
                                    {category}
                                </span>
                            </button>
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
                    onClick={scrollToNext}
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
