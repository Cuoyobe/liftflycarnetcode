'use client';

import { useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Newspaper, Search, X } from 'lucide-react';
import type { NewsItem } from '@/lib/notion';
import { useLocale } from '@/context/LocaleContext';
import styles from './NewsContent.module.css';

interface NewsContentProps {
    newsItems: NewsItem[];
    previewItems?: { zh: NewsItem[]; en: NewsItem[] };
}

const copy = {
    zh: {
        title: '新闻中心', latest: '最新消息', more: '更多领飞特动态', update: '新闻动态',
        search: '搜索新闻', clear: '清除搜索', results: '搜索结果',
        noResults: '没有找到相关消息', tryAgain: '试试其他关键词，或查看全部新闻。',
        reset: '查看全部新闻', empty: '新的消息，即将到来。',
        emptyDescription: '领飞特的最新动态将在这里与你见面。',
        loadMore: '加载更多', preview: '示例内容', count: (count: number) => `${count} 条消息`,
    },
    en: {
        title: 'Newsroom', latest: 'Latest updates', more: 'More from Aerolus', update: 'UPDATE',
        search: 'Search Newsroom', clear: 'Clear search', results: 'Search results',
        noResults: 'No matching updates', tryAgain: 'Try another keyword or explore all our news.',
        reset: 'View all news', empty: 'More to come.',
        emptyDescription: 'Find the latest news from Aerolus here soon.',
        loadMore: 'Load more', preview: 'Sample content',
        count: (count: number) => `${count} ${count === 1 ? 'update' : 'updates'}`,
    },
};

function newsLink(value: string): string | undefined {
    const trimmed = value.trim();
    if (!trimmed || trimmed.startsWith('#')) return undefined;
    try {
        const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`);
        return ['https:', 'http:'].includes(url.protocol) ? url.href : undefined;
    } catch {
        return undefined;
    }
}

function timestamp(value: string): number {
    const result = Date.parse(value);
    return Number.isNaN(result) ? 0 : result;
}

function NewsArticle({ item, variant, locale, preview = false }: {
    item: NewsItem;
    variant: 'lead' | 'card' | 'compact' | 'row';
    locale: 'zh' | 'en';
    preview?: boolean;
}): JSX.Element {
    const [failedCover, setFailedCover] = useState<string | null>(null);
    const href = newsLink(item.link);
    const date = timestamp(item.publishedAt);
    const content = (
        <>
            <div className={styles.media}>
                {item.cover && failedCover !== item.cover ? (
                    // Notion covers may be temporary URLs from different media hosts.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={item.cover}
                        alt=""
                        loading={variant === 'lead' ? 'eager' : 'lazy'}
                        decoding="async"
                        onError={() => setFailedCover(item.cover)}
                    />
                ) : (
                    <div className={styles.imageFallback} aria-hidden="true">
                        <Newspaper size={36} strokeWidth={1.2} />
                        <span>AEROLUS</span>
                    </div>
                )}
            </div>
            <div className={styles.articleBody}>
                <span className={styles.category}>{preview ? copy[locale].preview : copy[locale].update}</span>
                <h3>{item.title}</h3>
                {date !== 0 && (
                    <time dateTime={new Date(date).toISOString()}>
                        {new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
                            year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
                        }).format(date)}
                    </time>
                )}
            </div>
            {href && variant === 'row' && <ArrowUpRight className={styles.rowArrow} size={20} aria-hidden="true" />}
        </>
    );

    return (
        <article className={`${styles.article} ${styles[variant]}`}>
            {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className={styles.articleInner}>
                    {content}
                </a>
            ) : <div className={styles.articleInner}>{content}</div>}
        </article>
    );
}

const FEATURED_COUNT = 6;
const PAGE_SIZE = 8;

export function NewsContent({ newsItems, previewItems }: NewsContentProps): JSX.Element {
    const { locale } = useLocale();
    const t = copy[locale];
    const [query, setQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const searchRef = useRef<HTMLInputElement>(null);
    const isPreview = newsItems.length === 0 && !!previewItems;
    const items = [...(isPreview ? previewItems[locale] : newsItems)]
        .sort((a, b) => timestamp(b.publishedAt) - timestamp(a.publishedAt));
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const searching = normalizedQuery.length > 0;
    const filteredItems = items.filter((item) =>
        `${item.title} ${item.summary}`.toLocaleLowerCase().includes(normalizedQuery));
    const featured = items.slice(0, FEATURED_COUNT);
    const listItems = searching ? filteredItems : items.slice(FEATURED_COUNT);
    const visibleItems = listItems.slice(0, visibleCount);

    const clearSearch = () => {
        setQuery('');
        setVisibleCount(PAGE_SIZE);
        searchRef.current?.focus();
    };

    return (
        <div className={styles.newsroom}>
            <header className={styles.localNav}>
                <div className={styles.navInner}>
                    <h1>{t.title}</h1>
                    <form role="search" className={styles.search} onSubmit={(event) => event.preventDefault()}>
                        <Search size={16} aria-hidden="true" />
                        <input
                            ref={searchRef}
                            type="search"
                            aria-label={t.search}
                            placeholder={t.search}
                            value={query}
                            onChange={(event) => { setQuery(event.target.value); setVisibleCount(PAGE_SIZE); }}
                            onKeyDown={(event) => { if (event.key === 'Escape') clearSearch(); }}
                        />
                        {query && (
                            <button type="button" onClick={clearSearch} aria-label={t.clear} title={t.clear}>
                                <X size={15} aria-hidden="true" />
                            </button>
                        )}
                    </form>
                </div>
            </header>

            <div className={styles.container}>
                {!searching && (
                    <section className={styles.latest} aria-labelledby="latest-news-heading">
                        <div className={styles.sectionHeading}>
                            <h2 id="latest-news-heading">{t.latest}</h2>
                            {isPreview && <span className={styles.previewLabel}>{t.preview}</span>}
                        </div>
                        {featured.length > 0 ? (
                            <div className={styles.featuredGrid}>
                                {featured.map((item, index) => (
                                    <NewsArticle
                                        key={item.id} item={item}
                                        variant={index === 0 ? 'lead' : index < 3 ? 'card' : 'compact'}
                                        locale={locale} preview={isPreview}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className={styles.empty}>
                                <Newspaper size={36} strokeWidth={1.3} aria-hidden="true" />
                                <h3>{t.empty}</h3>
                                <p>{t.emptyDescription}</p>
                            </div>
                        )}
                    </section>
                )}

                {(searching || listItems.length > 0) && (
                    <section className={styles.archive} aria-labelledby="more-news-heading">
                        <div className={styles.sectionHeading}>
                            <h2 id="more-news-heading">{searching ? t.results : t.more}</h2>
                            {searching && <span className={styles.resultCount} role="status">{t.count(filteredItems.length)}</span>}
                        </div>
                        {visibleItems.length > 0 ? (
                            <div className={styles.newsList}>
                                {visibleItems.map((item) => (
                                    <NewsArticle key={item.id} item={item} variant="row" locale={locale} preview={isPreview} />
                                ))}
                            </div>
                        ) : (
                            <div className={styles.empty}>
                                <Search size={32} strokeWidth={1.3} aria-hidden="true" />
                                <h3>{t.noResults}</h3>
                                <p>{t.tryAgain}</p>
                                <button type="button" className={styles.textButton} onClick={clearSearch}>{t.reset}</button>
                            </div>
                        )}
                        {listItems.length > visibleCount && (
                            <div className={styles.loadMoreWrap}>
                                <button
                                    type="button" className={styles.loadMore}
                                    onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                                >
                                    {t.loadMore}<ArrowDown size={17} aria-hidden="true" />
                                </button>
                            </div>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
}
