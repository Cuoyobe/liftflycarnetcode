'use client';

import { Footer } from '@/components';
import { useLocale } from '@/context/LocaleContext';

export default function AboutPage(): JSX.Element {
    const { locale } = useLocale();

    const content = {
        zh: {
            about: '关于我们',
            subtitle: '领飞特公司',
            tagline: '以卓越的技术，定义飞行乐趣。',
            innovation: {
                title: '创新力量',
                content: '领飞特科技是一家低空领域的研发探索公司，拥有学术领军人物和顶尖科研学者组成的研发团队。雄厚的研发实力，为技术创新提供源源不断的动力，并提供安全可靠的产品和服务。\n\n领飞特致力于成为一家通过推动可持续科技进步，不断在低空设备研发和制造领域精进的科技公司。'
            },
            people: {
                title: '以人为本',
                content: '领飞特的使命是让每个人都能够实现飞行梦想，致力于将科技和文明的力量与每个人的生活紧密相连。\n\n我们倡导“促进公共利益，坚定追求真理，以积极的心态解决问题”，鼓励每个人都发现自我，挑战困难，在学习与实践中成长。\n\n领飞特将持续打造高科技产品，同时培养卓越人才。我们希望接纳更多志同道合的探索者，为他们提供助力他们迈向自我实现的旅程，并为人类文明的进步做出贡献。'
            },
            join: {
                title: '加入我们',
                items: [
                    {
                        title: '技术研发',
                        desc: '领飞特致力于研发和设计世界级技术，研发团队由追求热情的远见者组成，探索和突破困难，将技术想象转化为现实。',
                        icon: '/img/about/rd.webp'
                    },
                    {
                        title: '全球化服务支持',
                        desc: '建立全球服务平台，构建增值服务系统，推进产品合规化和本地化，提供有效的产品服务和解决方案。',
                        icon: '/img/about/global-service.webp'
                    },
                    {
                        title: '市场拓展',
                        desc: '作为领飞特与客户之间的桥梁，打造和提升品牌形象，制定营销策略并在全球推广领飞特。设计领飞特的视觉媒体，包括网页、包装、展位以及周边产品。',
                        icon: '/img/about/market-expansion.webp'
                    }
                ]
            }
        },
        en: {
            about: 'About Us',
            subtitle: 'Aerolus',
            tagline: 'Redefining the Joy of Flight through Technological Excellence.',
            innovation: {
                title: 'The Power of Innovation',
                content: 'Aerolus is a pioneering R&D firm dedicated to the low-altitude sector. Our team, led by visionary academic pioneers and top-tier researchers, provides a robust foundation for continuous technological breakthroughs, ensuring the delivery of safe and reliable products and services.\n\nWe are committed to driving sustainable progress, striving for excellence in the research, development, and manufacturing of advanced low-altitude equipment.'
            },
            people: {
                title: 'A People-First Philosophy',
                content: 'Our mission is to make the dream of flight accessible to everyone, seamlessly integrating the power of technology and human progress into daily life.\n\nWe champion the values of "Serving the Public Good, Steadfastly Pursuing Truth, and Solving Challenges with Optimism." We empower every individual to discover their potential, embrace challenges, and grow through continuous learning and practice.\n\nBeyond building high-tech products, Aerolus is dedicated to nurturing exceptional talent. We welcome like-minded explorers to join us on a journey of self-actualization, contributing together to the advancement of human civilization.'
            },
            join: {
                title: 'Join Us',
                items: [
                    {
                        title: 'Research & Development (R&D)',
                        desc: 'Aerolus is committed to engineering world-class technologies. Our R&D team is comprised of passionate visionaries who thrive on overcoming complex challenges and transforming bold imagination into reality.',
                        icon: '/img/about/rd.webp'
                    },
                    {
                        title: 'Global Service & Support',
                        desc: 'We are building a global service platform and a comprehensive value-added system. By advancing product compliance and localization, we provide efficient, professional solutions and support to our global clientele.',
                        icon: '/img/about/global-service.webp'
                    },
                    {
                        title: 'Market Expansion',
                        desc: 'Acting as the bridge between Aerolus and our customers, this team focuses on elevating our brand global identity. We develop international marketing strategies and design Aerolus’s visual presence across all touchpoints—including web platforms, packaging, exhibition booths, and brand merchandise.',
                        icon: '/img/about/market-expansion.webp'
                    }
                ]
            }
        }
    };

    const t = locale === 'zh' ? content.zh : content.en;

    return (
        <main className="bg-deep-space">
            {/* Hero Section */}
            <section className="relative h-screen w-full overflow-hidden">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: 'url(/img/ground.webp)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-deep-space/80 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/20 to-transparent" />

                <div className="relative z-10 h-full flex items-start justify-center px-6 pt-32 md:pt-40">
                    <div className="text-center max-w-4xl">
                        <p className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-accent mb-6">
                            {t.about}
                        </p>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-soft-white mb-6 leading-tight">
                            {t.subtitle}
                        </h1>
                        <p className="text-xl md:text-2xl text-soft-white/90 leading-relaxed font-light">
                            {t.tagline}
                        </p>
                    </div>
                </div>
            </section>

            {/* Innovation Block - Now first */}
            <section className="relative py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-6">
                                {t.innovation.title}
                            </h2>
                            <p className="text-lg text-muted-gray leading-relaxed whitespace-pre-line">
                                {t.innovation.content}
                            </p>
                        </div>
                        <div className="relative h-[400px] md:h-[600px] rounded-[24px] overflow-hidden order-1 md:order-2">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: 'url(/img/about/innovation.webp)' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* People First Block - Now second and rotated */}
            <section className="relative py-20 md:py-32 bg-white/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[400px] md:h-[600px] rounded-[24px] overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center transform -rotate-90"
                                style={{ backgroundImage: 'url(/img/about/people-first.webp)' }}
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-6">
                                {t.people.title}
                            </h2>
                            <p className="text-lg text-muted-gray leading-relaxed whitespace-pre-line">
                                {t.people.content}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Showcase Images */}
            <div className="w-full h-screen relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(/img/about/showcase-about.webp)' }}
                />
            </div>
            <div className="w-full h-screen relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(/img/about/ground3.webp)' }}
                />
            </div>

            {/* Join Us Section */}
            <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-16 text-center">
                        {t.join.title}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {t.join.items.map((item, index) => (
                            <div key={index} className="p-8 rounded-2xl border border-transparent hover:border-accent/50 transition-colors">
                                <div className="w-16 h-16 mb-6 rounded-xl overflow-hidden bg-white/10">
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{ backgroundImage: `url(${item.icon})` }}
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-soft-white mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-muted-gray leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main >
    );
}
