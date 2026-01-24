import { Footer } from '@/components';
import { getNewsItems } from '@/lib/notion';
import { NewsContent } from '@/components/NewsContent';

export const revalidate = 3600;

/**
 * 新闻页面 - Server Component
 * 服务端获取数据，避免客户端重复请求
 */
export default async function NewsPage(): Promise<JSX.Element> {
    const newsItems = await getNewsItems();

    return (
        <main className="bg-deep-space min-h-screen">
            <NewsContent newsItems={newsItems} />
            <Footer />
        </main>
    );
}
