import { getKBArticles } from '@/lib/notion';
import { SupportContent } from '@/components/SupportContent';

export const revalidate = 3600;

export default async function SupportPage(): Promise<JSX.Element> {
    const articles = await getKBArticles();

    return <SupportContent articles={articles} />;
}
