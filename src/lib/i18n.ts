export type Locale = 'zh' | 'en';

export interface Translations {
    nav: {
        home: string;
        product: string;
        news: string;
        about: string;
        preorder: string;
        language: string;
    };
    hero: {
        title: string;
        subtitle: string;
        description: string;
        cta: string;
        preorder: string;
    };
    productIntro: {
        sectionLabel: string;
        categories: string[];
        data: { title: string; description: string }[];
    };
    scenarios: {
        sectionLabel: string;
        categories: string[];
        data: { title: string; description: string }[];
    };
    vision: {
        sectionLabel: string;
        categories: string[];
        data: { title: string; description: string }[];
    };
    csr: {
        sectionLabel: string;
        categories: string[];
        data: { title: string; description: string }[];
    };
    news: {
        title: string;
        subtitle: string;
        readMore: string;
        viewAll: string;
        noNews: string;
    };
    contact: {
        title: string;
        subtitle: string;
        name: string;
        namePlaceholder: string;
        email: string;
        emailPlaceholder: string;
        message: string;
        messagePlaceholder: string;
        submit: string;
        sending: string;
        success: string;
        error: string;
    };
    footer: {
        subscribe: string;
        subscribePlaceholder: string;
        subscribeButton: string;
        navigation: string;
        social: string;
        contact: string;
        legal: string;
        privacy: string;
        terms: string;
        copyright: string;
        rights: string;
        icp: string;
    };
    product: {
        title: string;
        subtitle: string;
        specs: {
            title: string;
            items: { label: string; value: string }[];
        };
        advantages: {
            title: string;
            items: { title: string; description: string }[];
        };
        cta: string;
    };
    about: {
        title: string;
        subtitle: string;
        story: {
            title: string;
            description: string;
        };
        timeline: {
            title: string;
            items: { year: string; event: string }[];
        };
        team: {
            title: string;
            description: string;
        };
    };
    preorder: {
        title: string;
        subtitle: string;
        steps: {
            title: string;
            items: string[];
        };
        form: {
            name: string;
            namePlaceholder: string;
            email: string;
            emailPlaceholder: string;
            phone: string;
            phonePlaceholder: string;
            address: string;
            addressPlaceholder: string;
            company: string;
            companyPlaceholder: string;
            notes: string;
            notesPlaceholder: string;
            submit: string;
            sending: string;
            success: string;
            error: string;
            rateLimitError: string;
        };
    };
}

export const translations: Record<Locale, Translations> = {
    zh: {
        nav: {
            home: '首页',
            product: '产品',
            news: '新闻',
            about: '关于',
            preorder: '立即预订',
            language: 'EN',
        },
        hero: {
            title: '涡流-F1',
            subtitle: '简单飞 自由飞',
            description: '面向个人娱乐场景的智能个人超轻型eVTOL。',
            cta: '了解详情',
            preorder: '现在预订',
        },
        productIntro: {
            sectionLabel: '核心亮点',
            categories: ['轻量化', '安全', '易用'],
            data: [
                { title: '超轻量化设计', description: '大量使用航空级铝合金和碳纤维材质，降低重量并提高强度，让飞行从从容容。' },
                { title: '全方位安全保障', description: '主动避障系统、电子围栏系统、多动力失效保护系统、定高机动系统等等……麻雀虽小，安全保护不能少。' },
                { title: '易上手的操作', description: '三分钟即可学会基础操作，符合感知逻辑的操作方式，轻松上手更上头。' },
            ],
        },
        scenarios: {
            sectionLabel: '应用场景',
            categories: ['文旅', '娱乐', '竞技', '救援', '物流', '巡查'],
            data: [
                { title: '旅游观光', description: '低空飞行项目与旅游景区相结合，为游客提供旅游观摩的新视角。' },
                { title: '个人娱乐', description: '超大视角的空中娱乐新体验，简单易上手的操作逻辑满足飞行梦想。' },
                { title: '飞行竞技', description: '举办空中体育竞技项目，进行速度和技巧的比拼。' },
                { title: '应急救援', description: '遭遇突发灾情或者事件时，以高机动和空中优势快速到达现场。' },
                { title: '应急运输', description: '承担必要情况时的紧急小件运输，与时间赛跑。' },
                { title: '低空巡查', description: '利用低空飞行的特性，对道路封闭或阻塞的区域进行巡查。' },
            ],
        },
        vision: {
            sectionLabel: '公司愿景',
            categories: ['创新', '人文', '研发'],
            data: [
                { title: '创新力量', description: '领飞特科技是一家低空领域的研发探索公司，拥有学术领军人物和顶尖科研学者组成的研发团队。雄厚的研发实力，为技术创新提供源源不断的动力。' },
                { title: '以人为本', description: '领飞特的使命是让每个人都能够实现飞行梦想，致力于将科技和文明的力量与每个人的生活紧密相连。我们倡导“促进公共利益，坚定追求真理”。' },
                { title: '技术研发', description: '领飞特致力于研发和设计世界级技术，研发团队由追求热情的远见者组成，探索和突破困难，将技术想象转化为现实。' },
            ],
        },
        csr: {
            sectionLabel: '社会责任',
            categories: ['环保', '公益', '教育'],
            data: [
                { title: '绿色环保', description: '采用纯电驱动，零排放，低噪音，致力于保护地球生态环境。' },
                { title: '公益活动', description: '积极参与社会公益，利用飞行技术优势协助应急救援和物资输送。' },
                { title: '航空教育', description: '开展青少年航空科普教育，播种飞行梦想，培养未来航空人才。' },
            ],
        },
        news: {
            title: '新闻动态',
            subtitle: '关注我们的最近进展',
            readMore: '阅读全文',
            viewAll: '查看更多',
            noNews: '暂无最新消息',
        },
        contact: {
            title: '联系我们',
            subtitle: '商务合作与技术咨询',
            name: '姓名',
            namePlaceholder: '请输入您的姓名',
            email: '邮箱',
            emailPlaceholder: '请输入您的联系邮箱',
            message: '留言',
            messagePlaceholder: '请输入您的留言内容',
            submit: '提交',
            sending: '提交中...',
            success: '提交成功',
            error: '提交失败',
        },
        footer: {
            subscribe: '订阅更新',
            subscribePlaceholder: '请输入邮箱',
            subscribeButton: '订阅',
            navigation: '导航',
            social: '关注我们',
            contact: '联系方式',
            legal: '法律条款',
            privacy: '隐私政策',
            terms: '使用条款',
            copyright: '版权所有',
            rights: '保留所有权利',
            icp: '▲',
        },
        product: {
            title: '核心科技',
            subtitle: '重新定义个人飞行',
            specs: {
                title: '技术参数',
                items: [
                    { label: '续航', value: '30 分钟' },
                    { label: '航程', value: '30 公里' },
                    { label: '极速', value: '80 km/h' },
                    { label: '载重', value: '100 kg' },
                ],
            },
            advantages: {
                title: '产品优势',
                items: [
                    { title: '垂直起降', description: '无需跑道，随时随地起降。' },
                    { title: '纯电驱动', description: '绿色环保，静音飞行。' },
                    { title: '智能操控', description: '简易操作，智能辅助飞行。' },
                ],
            },
            cta: '立即预订',
        },
        about: {
            title: '关于我们',
            subtitle: '致力于个人飞行技术的革新',
            story: {
                title: '我们的使命',
                description: '让每个人都能享受飞行的乐趣，探索天空的无限可能。',
            },
            timeline: {
                title: '发展历程',
                items: [
                    { year: '2023', event: '公司成立，启动超轻型eVTOL项目' },
                    { year: '2024', event: '原型机首飞成功，获得多项专利' },
                    { year: '2025', event: '发布 Vortex-F1，开启全球预订' },
                ],
            },
            team: {
                title: '精英团队',
                description: '汇聚航空航天、人工智能、新材料等领域的顶尖专家。',
            },
        },
        preorder: {
            title: '预订产品',
            subtitle: '开启您的飞行之旅',
            steps: {
                title: '预订流程',
                items: [
                    '请准确填写右侧的预订信息，在提交后，您将收到我们的确认的邮件。',
                    '我们收到您的预订信息，会有我们的专员与您取得联系锁定订单。',
                    '支付定金以后，我们将为您排产，您可以随时与您的专员联系获得当前进度，或者可以加入我们的社群实时了解我们的生产动态。',
                    '完成生产后将通过合适的方式交付在与您约定的地址，您在验收后完成签收流程。',
                    '享受您的飞行。',
                ],
            },
            form: {
                name: '联系人',
                namePlaceholder: '请输入联系人姓名',
                email: '电子邮箱',
                emailPlaceholder: '请输入电子邮箱',
                phone: '联系电话',
                phonePlaceholder: '请输入联系电话',
                address: '收货地址',
                addressPlaceholder: '请输入详细地址',
                company: '公司名称(可选)',
                companyPlaceholder: '请输入公司名称',
                notes: '备注需求',
                notesPlaceholder: '如有特殊定制需求请备注',
                submit: '提交预订',
                sending: '正在提交...',
                success: '预订信息已提交',
                error: '提交失败，请重试',
                rateLimitError: '提交过于频繁，请稍后再试',
            },
        },
    },
    en: {
        nav: {
            home: 'Home',
            product: 'Product',
            news: 'News',
            about: 'About',
            preorder: 'Preorder',
            language: '中文',
        },
        hero: {
            title: 'SimpleFly | FreeFly',
            subtitle: 'Vortex-F1',
            description: 'An intelligent, ultra-light personal eVTOL designed for individual entertainment scenarios.',
            cta: 'Learn More',
            preorder: 'Preorder Now',
        },
        productIntro: {
            sectionLabel: 'Key Features',
            categories: ['Lightweight', 'Safety', 'Easy'],
            data: [
                { title: 'Ultra-Lightweight Design', description: 'Extensive use of aerospace-grade aluminum alloys and carbon fiber materials reduces weight while enhancing structural strength—making flight effortless and smooth.' },
                { title: 'Comprehensive Safety Assurance', description: 'Active obstacle avoidance, geofencing, multi-redundant power-failure protection, altitude-hold maneuvering systems, and more ensure your safety at every moment.' },
                { title: 'Intuitive Operation', description: 'Master the basics in just three minutes. Designed with human-centered logic, its controls are easy to learn—and even harder to put down.' },
            ],
        },
        scenarios: {
            sectionLabel: 'Applications',
            categories: ['Tourism', 'Fun', 'Sport', 'Rescue', 'Logistics', 'Patrol'],
            data: [
                { title: 'Tourism & Sightseeing', description: 'Integrated with scenic tourist destinations, Vortex-F1 offers visitors a breathtaking aerial perspective on sightseeing.' },
                { title: 'Personal Entertainment', description: 'Experience the thrill of flight like never before—expansive aerial views combined with simple, intuitive controls make your flying dreams come true.' },
                { title: 'Aerial Sports & Competitions', description: 'Host thrilling air-sport events where pilots compete in speed, agility, and aerial skill.' },
                { title: 'Emergency Rescue', description: 'Leverage high mobility and aerial access to rapidly reach disaster zones or incident sites during emergencies.' },
                { title: 'Urgent Logistics', description: 'Perform time-critical delivery of small emergency payloads when every second counts.' },
                { title: 'Low-Altitude Patrol', description: 'Conduct aerial inspections over road closures or blocked areas, utilizing the unique advantages of low-altitude flight.' },
            ],
        },
        vision: {
            sectionLabel: 'Our Vision',
            categories: ['Innovation', 'People', 'R&D'],
            data: [
                { title: 'Power of Innovation', description: 'Aerolus is a pioneering R&D firm dedicated to the low-altitude sector. Our world-class research team provides a robust foundation for continuous technological breakthroughs.' },
                { title: 'People-First Philosophy', description: 'Our mission is to make the dream of flight accessible to everyone. We champion the values of "Serving the Public Good, Steadfastly Pursuing Truth".' },
                { title: 'Research & Development', description: 'Aerolus is committed to engineering world-class technologies. Our R&D team thrives on overcoming complex challenges and transforming bold imagination into reality.' },
            ],
        },
        csr: {
            sectionLabel: 'CSR',
            categories: ['Eco', 'Social', 'Edu'],
            data: [
                { title: 'Green & Eco-friendly', description: 'Adopt pure electric drive, zero emission, low noise, committed to protecting the earth\'s ecological environment.' },
                { title: 'Social Responsibility', description: 'Actively participate in social welfare, using flight technology advantages to assist in emergency rescue and material transportation.' },
                { title: 'Aviation Education', description: 'Carry out youth aviation popularization education, sow flight dreams, and cultivate future aviation talents.' },
            ],
        },
        news: {
            title: 'News',
            subtitle: 'Follow our latest news',
            readMore: 'Read More',
            viewAll: 'View All',
            noNews: 'No updates yet',
        },
        contact: {
            title: 'Contact Us',
            subtitle: 'Business & Technical Inquiries',
            name: 'Name',
            namePlaceholder: 'Your Name',
            email: 'Email',
            emailPlaceholder: 'Your Email',
            message: 'Message',
            messagePlaceholder: 'Your Message',
            submit: 'Submit',
            sending: 'Sending...',
            success: 'Successfully Sent',
            error: 'Failed to Send',
        },
        footer: {
            subscribe: 'Subscribe',
            subscribePlaceholder: 'Enter your email',
            subscribeButton: 'Subscribe',
            navigation: 'Navigation',
            social: 'Social',
            contact: 'Contact',
            legal: 'Legal',
            privacy: 'Privacy Policy',
            terms: 'Terms',
            copyright: 'Copyright',
            rights: 'All rights reserved',
            icp: '▲',
        },
        product: {
            title: 'Core Tech',
            subtitle: 'Redefining Personal Flight',
            specs: {
                title: 'Specs',
                items: [
                    { label: 'Endurance', value: '30 Minutes' },
                    { label: 'Range', value: '30 km' },
                    { label: 'Max Speed', value: '80 km/h' },
                    { label: 'Payload', value: '100 kg' },
                ],
            },
            advantages: {
                title: 'Advantages',
                items: [
                    { title: 'VTOL', description: 'No runway needed, take off and land anywhere.' },
                    { title: 'Electric Drive', description: 'Green, eco-friendly, and quiet flight.' },
                    { title: 'Smart Control', description: 'Easy operation with intelligent flight assistance.' },
                ],
            },
            cta: 'Preorder Now',
        },
        about: {
            title: 'About Us',
            subtitle: 'Innovating Personal Flight Technology',
            story: {
                title: 'Our Mission',
                description: 'To let everyone enjoy the fun of flying and explore the infinite possibilities of the sky.',
            },
            timeline: {
                title: 'History',
                items: [
                    { year: '2023', event: 'Founded & Started Ultra-Light eVTOL Project' },
                    { year: '2024', event: 'Prototype Maiden Flight & Patents Secured' },
                    { year: '2025', event: 'Vortex-F1 Launch & Global Preorders' },
                ],
            },
            team: {
                title: 'Team',
                description: 'Gathering top experts in aerospace, AI, and new materials.',
            },
        },
        preorder: {
            title: 'Preorder',
            subtitle: 'Start Your Flight Journey',
            steps: {
                title: 'Process',
                items: [
                    'Please accurately fill out the booking form on the right. Once submitted, you will receive a confirmation email from us.',
                    'After we receive your reservation details, a dedicated specialist will contact you to finalize the order.',
                    'Once the deposit is paid, we will schedule production. You may contact your specialist at any time for progress updates, or join our community for real-time production news.',
                    'Upon completion of production, delivery will be arranged to your agreed address via an appropriate method. Please complete the sign-off process after inspecting the product.',
                    'Enjoy your flight.',
                ],
            },
            form: {
                name: 'Contact',
                namePlaceholder: 'Name',
                email: 'Email',
                emailPlaceholder: 'Email Address',
                phone: 'Phone',
                phonePlaceholder: 'Phone Number',
                address: 'Address',
                addressPlaceholder: 'Delivery Address',
                company: 'Company',
                companyPlaceholder: 'Company Name (Optional)',
                notes: 'Notes',
                notesPlaceholder: 'Special Requirements',
                submit: 'Submit Order',
                sending: 'Submitting...',
                success: 'Order Submitted',
                error: 'Submission Failed',
                rateLimitError: 'Too many requests, please try again later',
            },
        },
    },
};
