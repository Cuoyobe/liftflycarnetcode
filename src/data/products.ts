/**
 * 产品数据结构
 */

export interface Product {
    id: string;
    name: string;
    nameEn: string;
    tagline: string;
    taglineEn: string;
    price: string;
    image: string;
    video?: string;
    highlights: {
        zh: string[];
        en: string[];
    };
    specs: {
        label: string;
        labelEn: string;
        value: string;
        valueEn: string;
    }[];
    features: {
        title: string;
        titleEn: string;
        description: string;
        descriptionEn: string;
        image: string;
        alignment: 'left' | 'right';
    }[];
}

/**
 * 涡流-F1 产品数据（两款产品暂用相同文案）
 */
const vortexF1Data = {
    tagline: '先于时代的个人低空感官体验',
    taglineEn: 'A personal low-altitude sensory experience ahead of its time.',
    highlights: {
        zh: [
            '电力驱动，快速补能',
            '超轻机身，碳纤维材质',
            '3分钟上手，安全满配'
        ],
        en: [
            'Electric Drive, Rapid Recharging',
            'Ultralight Frame, Carbon Fiber Build',
            '3-Minute Mastery, Full Safety Suite'
        ]
    },
    specs: [
        // 尺寸
        { label: '长度', labelEn: 'Length', value: '3 m', valueEn: '3 m' },
        { label: '宽度', labelEn: 'Width', value: '1.8 m', valueEn: '1.8 m' },
        { label: '高度', labelEn: 'Height', value: '1.3 m', valueEn: '1.3 m' },
        // 性能
        { label: '续航时间', labelEn: 'Flight Time', value: '20 分钟', valueEn: '20 mins' },
        { label: '最大速度', labelEn: 'Max Speed', value: '100 km/h', valueEn: '100 km/h' },
        { label: '最大高度', labelEn: 'Max Altitude', value: '500 m / 5 m', valueEn: '500 m / 5 m' },
        // 工作环境
        { label: '工作温度', labelEn: 'Operating Temp', value: '-10°C ~ +55°C', valueEn: '-10°C to +55°C' },
        { label: '抗风等级', labelEn: 'Wind Resistance', value: '6 级', valueEn: 'Level 6' },
        // 重量
        { label: '空机重量', labelEn: 'Empty Weight', value: '115 kg', valueEn: '115 kg' },
        { label: '最大载重', labelEn: 'Max Payload', value: '100 kg', valueEn: '100 kg' },
        { label: '最大起飞重量', labelEn: 'Max Takeoff Weight', value: '240 kg', valueEn: '240 kg' }
    ],
    features: [
        {
            title: '电力驱动 快速补能',
            titleEn: 'Electric Drive, Rapid Recharging',
            description: '与传统飞行器不同，涡流-F1采用高倍率电池供能。相比航空燃油等传统能源供能，电池供能拥有低碳环保、无排放和易于获取的特点，可以在保护环境的同时大大降低飞行成本与储能成本，实现个人的飞行梦想。',
            descriptionEn: 'Unlike traditional aircraft, the Vortex-F1 is powered by high-rate batteries. Compared to conventional aviation fuels, electric power is low-carbon, emission-free, and easily accessible. This protects the environment while significantly reducing flight and energy storage costs, making the dream of personal flight a reality.',
            image: '/img/product/electric-drive.webp',
            alignment: 'left' as const
        },
        {
            title: '轻而易"举"',
            titleEn: 'Ultralight Excellence',
            description: '涡流-F1大量使用碳纤维和航空级铝合金材料，将整机重量控制在116千克以下，属于超轻型eVTOL范围。在空机重量小于传统燃油摩托车的同时，碳纤维材料为涡流-F1提供了更高强度的机身，保障安全飞行。',
            descriptionEn: 'The Vortex-F1 utilizes extensive carbon fiber and aviation-grade aluminum alloys to keep the curb weight under 116 kg, categorizing it as an ultralight eVTOL. Despite weighing less than a traditional gasoline motorcycle, the carbon fiber construction provides a high-strength airframe to ensure flight safety.',
            image: '/img/product/lightweight.webp',
            alignment: 'right' as const
        },
        {
            title: '轻松上手',
            titleEn: 'Effortless Control',
            description: '3种操作模式，满足不同场景中的使用需求。涡流-F1有符合直觉逻辑的控制模式设计，3分钟即可掌握机上操作，完成基础飞行操作。',
            descriptionEn: 'Featuring three operation modes to suit various scenarios, the Vortex-F1 is designed with intuitive control logic. New users can master onboard operations and basic flight maneuvers in just 3 minutes.',
            image: '/img/product/easy-control.webp',
            alignment: 'left' as const
        },
        {
            title: '安全满配',
            titleEn: 'Full-Spectrum Safety',
            description: '主动避障系统、定高机动系统、低电返航系统、多动力失效保护系统……安全系统全满配，飞行才能更安心。',
            descriptionEn: 'Fly with peace of mind. Our comprehensive safety suite includes an Active Obstacle Avoidance System, Altitude-Hold Maneuvering, Low-Battery Return-to-Home, and Multi-Power Failure Protection.',
            image: '/img/product/safety.webp',
            alignment: 'right' as const
        }
    ]
};

/**
 * 产品列表 - 2款产品（暂用相同文案）
 */
export const products: Product[] = [
    {
        id: 'vortex-f1-flagship',
        name: '涡流-F1 标准版',
        nameEn: 'Vortex-F1 Standard Edition',
        tagline: vortexF1Data.tagline,
        taglineEn: vortexF1Data.taglineEn,
        price: '$89,999',
        image: '/img/product/hero.jpg',
        video: '/video/bg.mp4',
        highlights: vortexF1Data.highlights,
        specs: vortexF1Data.specs,
        features: vortexF1Data.features
    },
    {
        id: 'vortex-f1-standard',
        name: '涡流-F1 标准版',
        nameEn: 'Vortex-F1 Standard Edition',
        tagline: vortexF1Data.tagline,
        taglineEn: vortexF1Data.taglineEn,
        price: '$89,999',
        image: '/img/product/hero.jpg',
        video: '/video/bg.mp4',
        highlights: vortexF1Data.highlights,
        specs: vortexF1Data.specs,
        features: vortexF1Data.features
    }
];
