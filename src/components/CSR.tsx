'use client';

import { useLocale } from '@/context/LocaleContext';
import { FullScreenSection } from './FullScreenSection';

/**
 * 企业社会责任区块
 */
export function CSR(): JSX.Element {
    const { t } = useLocale();

    return (
        <FullScreenSection
            id="csr"
            data={t.csr.data}
            categories={t.csr.categories}
            backgroundImage={[
                '/img/home/news-lab.webp',
                '/img/home/scenario-transport.webp',
                '/img/home/news-expo.webp'
            ]}
            sectionLabel={t.csr.sectionLabel}
            nextSectionId="news"
            textAlignment="left"
        />
    );
}
