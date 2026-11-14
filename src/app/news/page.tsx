import { Footer } from '@/components';
import { getNewsItems } from '@/lib/notion';
import { NewsContent } from '@/components/NewsContent';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
    title: '新闻中心 | 领飞特 Aerolus',
    description: '了解领飞特的最新消息、产品动态与合作进展。',
};

/**
 * 新闻页面 - Server Component
 * 服务端获取数据，避免客户端重复请求
 */
export default async function NewsPage(): Promise<JSX.Element> {
    const newsItems = await getNewsItems();
    let previewItems;
    if (process.env.NODE_ENV === 'development' &&
        (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID)) {
        const { FAKE_NEWS_ZH, FAKE_NEWS_EN } = await import('@/data/atmospheric');
        previewItems = { zh: FAKE_NEWS_ZH, en: FAKE_NEWS_EN };
    }

    return (
        <main className="bg-deep-space min-h-screen">
            <NewsContent newsItems={newsItems} previewItems={previewItems} />
            <Footer />
        </main>
    );
}
