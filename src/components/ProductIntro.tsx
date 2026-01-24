'use client';

import { useLocale } from '@/context/LocaleContext';
import { FullScreenSection } from './FullScreenSection';

/**
 * 产品介绍区块
 */
export function ProductIntro(): JSX.Element {
    const { t } = useLocale();

    return (
        <FullScreenSection
            id="product-intro"
            data={t.productIntro.data}
            categories={t.productIntro.categories}
            backgroundImage={[
                '/img/home/feature-lightweight.png',
                '/img/home/feature-safety.webp',
                '/img/home/feature-easy.webp'
            ]}
            sectionLabel={t.productIntro.sectionLabel}
            nextSectionId="scenarios"
            textAlignment="right"
        />
    );
}
