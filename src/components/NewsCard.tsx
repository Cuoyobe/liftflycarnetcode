'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import type { NewsItem } from '@/lib/notion';
import { cn } from '@/lib/cn';
import { useLocale } from '@/context/LocaleContext';

/**
 * 新闻卡片属性
 */
interface NewsCardProps {
    /** 新闻数据项 */
    item: NewsItem;
    /** 列表索引（用于动画延迟） */
    index: number;
}

/**
 * 确保 URL 包含协议前缀
 * @param url - 原始 URL
 * @returns 带协议前缀的完整 URL
 */
function ensureUrlProtocol(url: string): string {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `https://${url}`;
}

/**
 * 新闻卡片组件
 * 
 * 功能：
 * - 左图右文布局（桌面端）/ 上图下文布局（移动端）
 * - 显示封面图、日期、标题、摘要
 * - 点击跳转到外部新闻链接
 * - 支持亮色/暗色主题
 */
export function NewsCard({ item, index }: NewsCardProps): JSX.Element {
    const { locale } = useLocale();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group flex flex-col md:flex-row w-full overflow-hidden transition-all duration-300 rounded-2xl hover:shadow-2xl hover:-translate-y-1 bg-white/80 dark:bg-zinc-900/90 backdrop-blur-md border border-gray-200/50 dark:border-white/10"
        >
            {/* Image Section - Left (Desktop) / Top (Mobile) */}
            <div className="relative w-full md:w-[45%] shrink-0 aspect-video md:aspect-[4/3] lg:aspect-video overflow-hidden">
                {item.cover ? (
                    <Image
                        src={item.cover}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 45vw"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                        <span className="text-gray-300 dark:text-zinc-600 font-bold tracking-widest text-lg">NEWS</span>
                    </div>
                )}
                {/* Gradient Overlay for integration */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                <div>
                    {/* Header: Date */}
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                        <Calendar className="w-4 h-4" />
                        <span className="tracking-wide">
                            {new Date(item.publishedAt).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                            })}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold leading-tight mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                    </h3>

                    {/* Summary */}
                    {item.summary && (
                        <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-3">
                            {item.summary}
                        </p>
                    )}
                </div>

                {/* Footer: Read More */}
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                    <a
                        href={item.link ? ensureUrlProtocol(item.link) : '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        <span>{locale === 'zh' ? '阅读全文' : 'READ STORY'}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
