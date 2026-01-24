'use client';

import { useState } from 'react';
import { NewsCard } from '@/components/NewsCard';
import type { NewsItem } from '@/lib/notion';
import { useLocale } from '@/context/LocaleContext';

interface NewsContentProps {
    newsItems: NewsItem[];
}

/**
 * 新闻列表客户端组件
 * 处理国际化和渲染逻辑
 */
export function NewsContent({ newsItems }: NewsContentProps): JSX.Element {
    const { locale } = useLocale();
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    const content = {
        zh: {
            title: '新闻动态',
            subtitle: '关注我们的最近进展',
            noNews: '暂无消息',
            prev: '上一页',
            next: '下一页',
        },
        en: {
            title: 'News',
            subtitle: 'Follow our latest news',
            noNews: 'No news yet',
            prev: 'Prev',
            next: 'Next',
        }
    };

    const t = locale === 'zh' ? content.zh : content.en;

    // Pagination Logic
    const totalPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const displayedNews = newsItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Optional: Scroll to top of list
        document.getElementById('news-list-top')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-deep-space">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-80"
                        style={{ backgroundImage: 'url(/img/fly5.webp)' }}
                    />
                    {/* 渐变遮罩 - 底部渐变衔接 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-deep-space/60 via-transparent to-transparent" />
                </div>

                <div className="relative z-10 h-full flex items-center justify-center px-6">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-soft-white mb-4">
                            {t.title}
                        </h1>
                        <p className="text-lg md:text-xl text-soft-white/60">
                            {t.subtitle}
                        </p>
                    </div>
                </div>
            </section>

            {/* News List */}
            <section id="news-list-top" className="relative py-20 px-6 md:px-12 lg:px-20">
                <div className="max-w-4xl mx-auto space-y-8 min-h-[600px]">
                    {displayedNews.map((item, index) => (
                        <div
                            key={item.id}
                            className="transform transition-all duration-300 hover:scale-[1.02]"
                        >
                            <NewsCard item={item} index={index + startIndex} />
                        </div>
                    ))}

                    {displayedNews.length === 0 && (
                        <div className="text-center text-muted-gray py-20">
                            {t.noNews}
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="max-w-4xl mx-auto mt-16 flex items-center justify-center gap-4">
                        {/* Prev Button */}
                        <button
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-full border border-white/10 text-soft-white text-sm hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            {t.prev}
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`
                                        w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                                        ${currentPage === page
                                            ? 'bg-soft-white text-deep-space scale-110 shadow-lg shadow-white/10'
                                            : 'bg-white/5 text-muted-gray hover:bg-white/10 hover:text-soft-white'}
                                    `}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-full border border-white/10 text-soft-white text-sm hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            {t.next}
                        </button>
                    </div>
                )}
            </section>
        </>
    );
}
