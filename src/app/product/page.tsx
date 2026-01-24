'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Footer } from '@/components';
import { products } from '@/data/products';
import { useLocale } from '@/context/LocaleContext';
import { cn } from '@/lib/cn';

export default function ProductPage(): JSX.Element {
    const [selectedProduct, setSelectedProduct] = useState(products[0]);
    const { locale } = useLocale();

    return (
        <main className="bg-deep-space min-h-screen">
            {/* Product Selector (Sticky Top) */}
            <div className="fixed top-24 left-0 right-0 z-40 flex justify-center pointer-events-none">
                <div className="pointer-events-auto bg-deep-space/80 backdrop-blur-md border border-white/10 rounded-full p-1 flex gap-1 shadow-2xl">
                    {products.map((product) => (
                        <button
                            key={product.id}
                            onClick={() => setSelectedProduct(product)}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                selectedProduct.id === product.id
                                    ? "bg-soft-white text-deep-space shadow-lg"
                                    : "text-muted-gray hover:text-soft-white hover:bg-white/5"
                            )}
                        >
                            {locale === 'zh' ? product.name : product.nameEn}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedProduct.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Hero Section */}
                    <section className="relative h-screen w-full overflow-hidden flex items-center">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${selectedProduct.image})` }}
                        />
                        {/* Overlay - Match Homepage Hero (Lighter gradients + Bottom gradient) */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                        <div className="relative z-10 px-6 md:px-12 lg:px-20 mt-20 max-w-4xl">
                            <motion.h1
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight"
                            >
                                {locale === 'zh' ? selectedProduct.name : selectedProduct.nameEn}
                            </motion.h1>

                            <motion.p
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-lg md:text-xl text-white/90 font-light mb-6 break-words whitespace-normal max-w-full"
                            >
                                {locale === 'zh' ? selectedProduct.tagline : selectedProduct.taglineEn}
                            </motion.p>

                            <motion.p
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl md:text-4xl font-bold text-white mb-8"
                            >
                                {selectedProduct.price}
                            </motion.p>

                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="flex gap-4 mb-12"
                            >
                                <Link
                                    href="/preorder"
                                    className="px-8 py-3 bg-white text-black font-bold text-sm tracking-widest uppercase hover:bg-white/90 transition-colors"
                                >
                                    {locale === 'zh' ? '预订' : 'PREORDER'}
                                </Link>
                            </motion.div>

                            {/* Description Text List */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="space-y-2"
                            >
                                {(locale === 'zh' ? selectedProduct.highlights.zh : selectedProduct.highlights.en).map((text, i) => (
                                    <p key={i} className="text-gray-300 text-sm md:text-base max-w-2xl shadow-black drop-shadow-md break-words whitespace-normal">
                                        {text}
                                    </p>
                                ))}
                            </motion.div>
                        </div>
                    </section>

                    {/* Features - Split Layouts */}
                    <section className="py-24 space-y-24">
                        {selectedProduct.features.map((feature, index) => (
                            <div key={index} className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
                                {/* Text Section */}
                                <div className={cn(
                                    "order-2 md:order-1",
                                    feature.alignment === 'right' ? "md:order-1" : "md:order-2"
                                )}>
                                    <div className="bg-card-bg/60 backdrop-blur-md border border-outline-border p-8 md:p-12 rounded-[32px]">
                                        <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-4">
                                            {locale === 'zh' ? feature.title : feature.titleEn}
                                        </h2>
                                        <p className="text-lg text-muted-gray leading-relaxed break-words whitespace-normal">
                                            {locale === 'zh' ? feature.description : feature.descriptionEn}
                                        </p>
                                    </div>
                                </div>

                                {/* Image Section */}
                                <div className={cn(
                                    "order-1 md:order-2 h-[400px] md:h-[600px] relative rounded-[32px] overflow-hidden shadow-2xl",
                                    feature.alignment === 'right' ? "md:order-2" : "md:order-1"
                                )}>
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                                        style={{ backgroundImage: `url(${feature.image})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Product Gallery - 3 Full-Width Vertical Images */}
                    <section className="bg-deep-space">
                        {/* Full-width Image 1 */}
                        <div className="w-full h-screen relative overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: 'url(/img/product/showcase-1.webp)' }}
                            />
                        </div>
                        {/* Full-width Image 2 */}
                        <div className="w-full h-screen relative overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: 'url(/img/product/showcase-2.webp)' }}
                            />
                        </div>
                        {/* Full-width Image 3 */}
                        <div className="w-full h-screen relative overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: 'url(/img/home/scenario-patrol.webp)' }}
                            />
                        </div>
                    </section>

                    {/* Market Reviews */}
                    <section className="py-24 bg-card-bg/30">
                        <div className="max-w-7xl mx-auto px-6 md:px-12">
                            <h2 className="text-3xl font-bold text-center text-soft-white mb-16 tracking-wide">
                                {locale === 'zh' ? '行业评价' : 'Industry Reviews'}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    {
                                        zh: "这是传统通用航空降维新应用。依靠材料和能源发展，上下游协同推动新型出行方式。低空经济潜力巨大！",
                                        en: "This isn't just an upgrade; it’s a generational leap for general aviation. By leveraging breakthroughs in material science and energy density, the industry is creating a synchronized ecosystem for a new era of mobility. The 'Low-Altitude Economy' is no longer a concept—it’s a massive, untapped market frontier."
                                    },
                                    {
                                        zh: "超轻型eVTOL会给空中观景、景区直达等文旅项目带来新体验。串联景区资源，助力立体化旅游交通体系建设。",
                                        en: "Ultralight eVTOLs are set to redefine experiential travel, offering everything from panoramic sightseeing to direct-to-resort transfers. By seamlessly connecting scenic landmarks, these aircraft are the cornerstone of a new 3D tourism infrastructure."
                                    },
                                    {
                                        zh: "超轻型eVTOL就像是‘空中赛车’：部署快、机动性强、使用场景灵活。它能令驾驶者充满激情，未来可能会因此诞生新型的竞技运动形式。",
                                        en: "Dubbed the 'Formula 1 of the skies,' the ultralight eVTOL combines rapid deployment with razor-sharp maneuverability. It’s a visceral, high-octane experience for pilots that could very well catalyze the birth of a new breed of competitive aerial sports."
                                    }
                                ].map((review, i) => (
                                    <div key={i} className="bg-card-bg/80 backdrop-blur-sm p-8 rounded-[24px] border border-outline-border hover:border-soft-white/20 transition-all hover:-translate-y-1">
                                        <div className="mb-6 opacity-30">
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-soft-white">
                                                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                                            </svg>
                                        </div>
                                        <p className="text-soft-white/90 leading-relaxed font-light text-base md:text-lg">
                                            {locale === 'zh' ? review.zh : review.en}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Technical Specs */}
                    <section className="py-24 px-6 md:px-12">
                        <div className="max-w-5xl mx-auto bg-deep-space/50 backdrop-blur-md rounded-[40px] border border-outline-border p-8 md:p-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-center text-soft-white mb-16">
                                {locale === 'zh' ? '技术参数' : 'Technical Specifications'}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
                                {selectedProduct.specs.map((spec, index) => (
                                    <div key={index} className="text-center group">
                                        <p className="text-sm uppercase tracking-widest text-muted-gray mb-2 group-hover:text-soft-white transition-colors">
                                            {locale === 'zh' ? spec.label : spec.labelEn}
                                        </p>
                                        <p className="text-2xl md:text-3xl font-bold text-soft-white group-hover:text-accent transition-colors">
                                            {locale === 'zh' ? spec.value : spec.valueEn}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <Footer />
                </motion.div>
            </AnimatePresence>
        </main>
    );
}
