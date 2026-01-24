import { NewsItem, KBArticle } from '@/lib/notion';

export const FAKE_NEWS_ZH: NewsItem[] = [
    {
        id: 'news-1',
        title: '涡流-F1成为中国人保首个保障飞行的超轻型eVTOL',
        summary: '领飞特科技与中国人保达成深度合作，为每一架Vortex-F1提供全方位的飞行安全保障，树立行业安全新标杆。',
        link: '#',
        publishedAt: '2025-05-20',
        cover: '/img/home/news-picc.webp',
    },
    {
        id: 'news-2',
        title: '领飞特与天目山实验室的战略合作',
        summary: '双方将在低空飞行器气动布局、新材料应用及智能飞控系统等领域展开深度研发合作，共同推动eVTOL技术革新。',
        link: '#',
        publishedAt: '2025-05-15',
        cover: '/img/home/news-lab.webp',
    },
    {
        id: 'news-3',
        title: '涡流-F1亮相第七届浙江智慧交通博览会',
        summary: '做为低空经济领域的代表性产品，Vortex-F1受邀参展，凭借其超轻量化设计和独特的个人娱乐定位，成为全场焦点。',
        link: '#',
        publishedAt: '2025-05-10',
        cover: '/img/home/news-expo.webp',
    },
];

export const FAKE_NEWS_EN: NewsItem[] = [
    {
        id: 'news-1',
        title: 'Vortex-F1 becomes the first ultra-light eVTOL insured by PICC',
        summary: 'Aerolus Technology partners with PICC to provide comprehensive flight safety insurance for every Vortex-F1, setting a new safety benchmark for the industry.',
        link: '#',
        publishedAt: '2025-05-20',
        cover: '/img/home/news-picc.webp',
    },
    {
        id: 'news-2',
        title: 'Lingfeite and Tianmushan Laboratory announce strategic collaboration',
        summary: 'Both parties will conduct deep R&D cooperation in aerodynamic layout, new materials application, and intelligent flight control systems to drive eVTOL innovation.',
        link: '#',
        publishedAt: '2025-05-15',
        cover: '/img/home/news-lab.webp',
    },
    {
        id: 'news-3',
        title: 'Vortex-F1 debuts at the 7th Zhejiang Smart Transportation Expo',
        summary: 'As a representative product of the low-altitude economy, Vortex-F1 attracted wide attention with its ultra-light design and unique positioning for personal entertainment.',
        link: '#',
        publishedAt: '2025-05-10',
        cover: '/img/home/news-expo.webp',
    },
];

export const FAKE_NEWS = FAKE_NEWS_ZH;

export const FAKE_ARTICLES: KBArticle[] = [
    {
        id: 'fake-kb-1',
        title: '测试测试测试测试测试测试测试',
        summary: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
        category: '测试',
        slug: 'test-1',
        order: 1,
        publishedAt: new Date().toISOString(),
        locale: 'zh',
        content: [],
    },
    {
        id: 'fake-kb-2',
        title: '测试测试测试测试测试测试测试',
        summary: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
        category: '测试',
        slug: 'test-2',
        order: 2,
        publishedAt: new Date().toISOString(),
        locale: 'zh',
        content: [],
    },
];
