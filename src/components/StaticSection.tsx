'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * 静态全屏区块属性
 */
interface StaticSectionProps {
    /** 区块 ID */
    id: string;
    /** 标题 */
    title: string;
    /** 描述 */
    description: string;
    /** 背景图片路径 */
    backgroundImage: string;
    /** 区块标题标签 */
    sectionLabel: string;
    /** 下一区块 ID，用于滚动导航 */
    nextSectionId: string;
    /** 文本对齐方向 */
    textAlignment: 'left' | 'right';
}

/**
 * 静态全屏区块组件
 * 单一背景图片展示，无轮播切换
 */
export function StaticSection({
    id,
    title,
    description,
    backgroundImage,
    sectionLabel,
    nextSectionId,
    textAlignment,
}: StaticSectionProps): JSX.Element {
    const scrollToNext = () => {
        const element = document.querySelector(`#${nextSectionId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const isRightAligned = textAlignment === 'right';

    return (
        <section id={id} className="relative h-screen w-full overflow-hidden">
            {/* 静态背景图层 */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
                <div className={cn(
                    "absolute inset-0",
                    isRightAligned
                        ? "bg-gradient-to-l from-deep-space via-deep-space/80 to-transparent via-50%"
                        : "bg-gradient-to-r from-deep-space via-deep-space/80 to-transparent via-50%"
                )} />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-space/80 via-transparent to-deep-space/60" />
            </div>

            {/* 内容区域 */}
            <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 py-20 md:py-28">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={cn(
                        "max-w-xl",
                        isRightAligned ? "ml-auto text-right" : "mr-auto text-left"
                    )}
                >
                    <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">
                        {sectionLabel}
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-soft-white mb-4 md:mb-6">
                        {title}
                    </h2>
                    <p className="text-sm md:text-base text-soft-white/80 leading-relaxed">
                        {description}
                    </p>
                </motion.div>
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
                    className="text-white/50 hover:text-white transition-colors"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ChevronDown className="w-6 h-6" />
                </motion.button>
            </motion.div>
        </section>
    );
}
