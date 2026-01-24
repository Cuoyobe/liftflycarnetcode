'use client';

import { useLocale } from '@/context/LocaleContext';
import { FullScreenSection } from './FullScreenSection';

/**
 * 公司愿景区块 - 手动切换模式（无自动进度条）
 */
export function Vision(): JSX.Element {
    const { t } = useLocale();

    return (
        <FullScreenSection
            id="vision"
            data={t.vision.data}
            categories={t.vision.categories}
            backgroundImage={[
                '/img/about/innovation.webp',
                '/img/about/people-first.webp',
                '/img/about/rd.webp'
            ]}
            sectionLabel={t.vision.sectionLabel}
            nextSectionId="csr"
            textAlignment="right"
            manualOnly={true}
        />
    );
}
