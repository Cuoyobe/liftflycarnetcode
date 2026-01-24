import { Hero, ProductIntro, ApplicationScenarios, CSR, NewsSection, Contact, Footer } from '@/components';
import { getNewsItems } from '@/lib/notion';

export const revalidate = 3600;

export default async function HomePage(): Promise<JSX.Element> {
    const newsItems = await getNewsItems();

    return (
        <main className="bg-deep-space">
            <Hero />
            <ProductIntro />
            <ApplicationScenarios />
            <CSR />
            <NewsSection items={newsItems} />
            <Contact />
            <Footer />
        </main>
    );
}
