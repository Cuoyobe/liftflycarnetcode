'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, BookOpen, Search } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import type { KBArticle } from '@/lib/notion';
import { cn } from '@/lib/cn';


interface SupportContentProps {
    articles: KBArticle[];
}

interface CategoryNode {
    name: string;
    articles: KBArticle[];
    isExpanded: boolean;
}

/**
 * 支持页面内容组件 - 飞书知识库样式
 * 左侧目录树 + 右侧文档内容
 */
export function SupportContent({ articles }: SupportContentProps): JSX.Element {
    const { t, locale } = useLocale();
    const effectiveArticles = useMemo(() => {
        const targetLocale = locale === 'zh' ? 'zh' : 'en';
        return articles.filter(article => article.locale === targetLocale);
    }, [articles, locale]);

    const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
        effectiveArticles.length > 0 ? effectiveArticles[0].id : null
    );
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

    // 按分类分组并排序
    const categoryTree = useMemo(() => {
        const grouped: Record<string, KBArticle[]> = {};

        effectiveArticles.forEach(article => {
            if (!grouped[article.category]) {
                grouped[article.category] = [];
            }
            grouped[article.category].push(article);
        });

        // 对每个分类内的文章按 order 排序
        Object.keys(grouped).forEach(category => {
            grouped[category].sort((a, b) => a.order - b.order);
        });

        return grouped;
    }, [effectiveArticles]);

    // 搜索过滤
    const filteredTree = useMemo(() => {
        if (!searchQuery) return categoryTree;

        const filtered: Record<string, KBArticle[]> = {};
        Object.entries(categoryTree).forEach(([category, arts]) => {
            const matchedArticles = arts.filter(article =>
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.summary.toLowerCase().includes(searchQuery.toLowerCase())
            );
            if (matchedArticles.length > 0) {
                filtered[category] = matchedArticles;
            }
        });

        return filtered;
    }, [categoryTree, searchQuery]);

    // 切换分类展开/折叠
    const toggleCategory = (category: string) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(category)) {
            newExpanded.delete(category);
        } else {
            newExpanded.add(category);
        }
        setExpandedCategories(newExpanded);
    };

    // 选中的文章
    const selectedArticle = useMemo(() => {
        return articles.find(a => a.id === selectedArticleId) || articles[0] || null;
    }, [articles, selectedArticleId]);

    // 默认展开所有分类
    useState(() => {
        const allCategories = new Set(Object.keys(categoryTree));
        setExpandedCategories(allCategories);
    });

    return (
        <div className="flex h-screen pt-20 bg-deep-space">
            {/* 左侧导航栏 - 在移动端隐藏 */}
            <aside className="hidden md:block md:w-80 border-r border-outline-border bg-card-bg flex-col">
                {/* 搜索框 */}
                <div className="p-4 border-b border-outline-border">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-gray" />
                        <input
                            type="text"
                            placeholder={t.nav.product === '产品' ? '搜索文档...' : 'Search docs...'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-deep-space/50 border border-outline-border rounded text-soft-white placeholder:text-muted-gray text-sm focus:outline-none focus:border-accent transition-colors"
                        />
                    </div>
                </div>

                {/* 目录树 */}
                <nav className="flex-1 overflow-y-auto p-4">
                    {Object.entries(filteredTree).map(([category, categoryArticles]) => (
                        <div key={category} className="mb-4">
                            {/* 分类标题 */}
                            <button
                                onClick={() => toggleCategory(category)}
                                className="w-full flex items-center gap-2 px-2 py-1.5 text-soft-white hover:bg-accent/10 rounded transition-colors group"
                            >
                                {expandedCategories.has(category) ? (
                                    <ChevronDown className="w-4 h-4 text-muted-gray group-hover:text-soft-white transition-colors" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 text-muted-gray group-hover:text-soft-white transition-colors" />
                                )}
                                <span className="text-sm font-semibold">{category}</span>
                                <span className="ml-auto text-xs text-muted-gray">
                                    {categoryArticles.length}
                                </span>
                            </button>

                            {/* 分类下的文章列表 */}
                            <AnimatePresence>
                                {expandedCategories.has(category) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="ml-6 mt-1 space-y-1">
                                            {categoryArticles.map((article) => (
                                                <button
                                                    key={article.id}
                                                    onClick={() => setSelectedArticleId(article.id)}
                                                    className={cn(
                                                        'w-full text-left px-3 py-2 rounded text-sm transition-all',
                                                        selectedArticleId === article.id
                                                            ? 'bg-accent/10 text-accent font-medium border-l-2 border-accent'
                                                            : 'text-muted-gray hover:text-soft-white hover:bg-white/5'
                                                    )}
                                                >
                                                    {article.title}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </nav>
            </aside>

            {/* 右侧内容区域 */}
            <main className="flex-1 overflow-y-auto">
                {selectedArticle ? (
                    <article className="max-w-4xl mx-auto px-12 py-8">
                        {/* 文章头部 */}
                        <div className="mb-8 pb-8 border-b border-outline-border">
                            <div className="flex items-center gap-2 text-sm text-muted-gray mb-4">
                                <BookOpen className="w-4 h-4" />
                                <span>{selectedArticle.category}</span>
                            </div>
                            <h1 className="text-4xl font-bold text-soft-white mb-4">
                                {selectedArticle.title}
                            </h1>
                            <p className="text-muted-gray text-lg">
                                {selectedArticle.summary}
                            </p>
                            <div className="mt-4 text-sm text-muted-gray">
                                {t.nav.product === '产品' ? '最后更新' : 'Last updated'}:{' '}
                                {new Date(selectedArticle.publishedAt).toLocaleDateString(
                                    t.nav.product === '产品' ? 'zh-CN' : 'en-US',
                                    { year: 'numeric', month: 'long', day: 'numeric' }
                                )}
                            </div>
                        </div>

                        {/* 文章内容占位 */}
                        {/* Article Content */}
                        <div className="prose prose-invert max-w-none">
                            {selectedArticle.content && selectedArticle.content.length > 0 ? (
                                <div className="space-y-4">
                                    {selectedArticle.content.map((block, index) => {
                                        switch (block.type) {
                                            case 'heading_1':
                                                return <h1 key={index} className="text-3xl font-bold text-soft-white mt-8 mb-4">{block.text}</h1>;
                                            case 'heading_2':
                                                return <h2 key={index} className="text-2xl font-bold text-soft-white mt-6 mb-3">{block.text}</h2>;
                                            case 'heading_3':
                                                return <h3 key={index} className="text-xl font-bold text-soft-white mt-4 mb-2">{block.text}</h3>;
                                            case 'bulleted_list_item':
                                                return (
                                                    <ul key={index} className="list-disc list-inside text-muted-gray ml-4">
                                                        <li>{block.text}</li>
                                                    </ul>
                                                );
                                            case 'numbered_list_item':
                                                return (
                                                    <ol key={index} className="list-decimal list-inside text-muted-gray ml-4">
                                                        <li>{block.text}</li>
                                                    </ol>
                                                );
                                            case 'quote':
                                                return (
                                                    <blockquote key={index} className="border-l-4 border-accent pl-4 py-2 italic text-muted-gray bg-white/5 rounded-r">
                                                        {block.text}
                                                    </blockquote>
                                                );
                                            default:
                                                return <p key={index} className="text-muted-gray leading-relaxed">{block.text}</p>;
                                        }
                                    })}
                                </div>
                            ) : (
                                <div className="bg-card-bg border border-outline-border rounded-lg p-8 text-center">
                                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-gray" />
                                    <p className="text-muted-gray mb-2">
                                        {t.nav.product === '产品'
                                            ? '文档内容为空或无法加载'
                                            : 'No content available'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </article>
                ) : (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-gray" />
                            <p className="text-muted-gray text-lg">
                                {t.nav.product === '产品' ? '暂无文档' : 'No documents available'}
                            </p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
