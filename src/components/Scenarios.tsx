'use client';

import { useLocale } from '@/context/LocaleContext';
import { StaticSection } from './StaticSection';

/**
 * 应用场景区块 - 静态单一图片展示
 */
export function Scenarios(): JSX.Element {
    const { t } = useLocale();

    return (
        <StaticSection
            id="scenarios"
            title={t.scenarios.data[0]?.title || ''}
            description={t.scenarios.data[0]?.description || ''}
            backgroundImage="/img/home/scenario-tourism.webp"
            sectionLabel={t.scenarios.sectionLabel}
            nextSectionId="vision"
            textAlignment="left"
        />
    );
}
