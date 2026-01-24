'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Newspaper } from 'lucide-react';
import type { NewsItem } from '@/lib/notion';
import { NewsCard } from './NewsCard';
import { useLocale } from '@/context/LocaleContext';

/**
 * 新闻列表区块属性
 */
interface NewsSectionProps {
    /** 从 Notion 获取的新闻列表 */
    items: NewsItem[];
}

/**
 * 首页新闻列表区块
 * 
 * 功能：
 * - 展示最多 3 条新闻卡片
 * - 无新闻时显示占位提示
 * - Notion 数据为空时使用假数据降级
 * - "查看更多"按钮跳转到新闻页
 */
export function NewsSection({ items }: NewsSectionProps): JSX.Element {
    const { t } = useLocale();
    const displayItems = items.slice(0, 3);

    return (
        <section id="news" className="relative py-24 lg:py-32">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-soft-white mb-4">
                        {t.news.title}
                    </h2>
                    <p className="text-muted-gray text-base md:text-lg max-w-2xl mx-auto">
                        {t.news.subtitle}
                    </p>
                </motion.div>
            </div>

            {/* News Grid - 展示最多 3 条新闻，单列布局 */}
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
                {displayItems.length > 0 ? (
                    <div className="flex flex-col gap-8">
                        {displayItems.slice(0, 3).map((item, index) => (
                            <NewsCard key={item.id} item={item} index={index} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-card-bg flex items-center justify-center mb-6">
                            <Newspaper className="w-8 h-8 text-muted-gray" />
                        </div>
                        <p className="text-muted-gray text-lg">
                            {t.news.noNews}
                        </p>
                    </motion.div>
                )}
            </div>
            {/* View More Button */}
            {displayItems.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center mt-12 md:mt-16"
                >
                    <Link href="/news">
                        <button className="px-8 py-3 rounded-full border border-outline-border bg-card-bg/30 text-soft-white hover:bg-accent/10 hover:border-accent transition-all duration-300 backdrop-blur-sm text-sm md:text-base font-medium">
                            {t.news.viewAll}
                        </button>
                    </Link>
                </motion.div>
            )}
        </section>
    );
}
