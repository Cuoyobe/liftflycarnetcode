'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { Navbar, Footer } from '@/components';
import { cn } from '@/lib/cn';

interface FormData {
    name: string;
    email: string;
    phone: string;
    address: string;
    company: string;
    notes: string;
}

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

export default function PreorderPage(): JSX.Element {
    const { t } = useLocale();

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        address: '',
        company: '',
        notes: '',
    });

    const [status, setStatus] = useState<SubmitStatus>('idle');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Rate Limit Check (5 minutes)
        const RATE_LIMIT_KEY = `preorder_limit_${formData.email}`;
        const lastSubmitTime = localStorage.getItem(RATE_LIMIT_KEY);
        const now = Date.now();
        const FIVE_MINUTES = 5 * 60 * 1000;

        if (lastSubmitTime && now - parseInt(lastSubmitTime, 10) < FIVE_MINUTES) {
            setStatus('error');
            console.warn('Rate limit exceeded for this email');
            return;
        }

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const confirmTemplateId = process.env.NEXT_PUBLIC_EMAILJS_CONFIRM_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            console.error('EmailJS configuration is incomplete');
            setStatus('error');
            return;
        }

        setStatus('sending');

        try {
            await emailjs.send(
                serviceId,
                templateId,
                {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    company: formData.company || 'N/A',
                    notes: formData.notes || 'N/A',
                    type: 'Preorder',
                },
                publicKey
            );

            if (confirmTemplateId) {
                await emailjs.send(
                    serviceId,
                    confirmTemplateId,
                    {
                        to_name: formData.name,
                        to_email: formData.email,
                        type: 'Preorder',
                    },
                    publicKey
                );
            }

            localStorage.setItem(RATE_LIMIT_KEY, now.toString());
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', address: '', company: '', notes: '' });
        } catch (error) {
            console.error('Failed to send:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const inputClasses = cn(
        'w-full bg-card-bg backdrop-blur-md border border-outline-border rounded-sm',
        'px-4 py-3 text-soft-white placeholder-muted-gray/50',
        'focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20',
        'transition-all duration-300'
    );

    return (
        <main className="relative bg-deep-space min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute top-0 left-0 right-0 h-[50vh]"
                        style={{
                            background: 'radial-gradient(ellipse 100% 70% at 50% 0%, rgba(102, 252, 241, 0.15) 0%, transparent 60%)',
                        }}
                    />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4"
                    >
                        {t.preorder.subtitle}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-soft-white"
                    >
                        {t.preorder.title}
                    </motion.h1>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 lg:py-24">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Steps */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl font-bold text-soft-white mb-8">
                                {t.preorder.steps.title}
                            </h2>

                            <div className="space-y-6">
                                {t.preorder.steps.items.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-soft-white font-semibold text-sm">
                                            {index + 1}
                                        </div>
                                        <p className="text-muted-gray pt-1">{step}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            {status === 'success' ? (
                                <div className="p-8 bg-card-bg backdrop-blur-md border border-green-500/30 rounded-lg text-center">
                                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                                    <p className="text-soft-white text-lg font-medium">{t.preorder.form.success}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="p-8 bg-card-bg backdrop-blur-md border border-outline-border rounded-lg space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-muted-gray mb-2">
                                            {t.preorder.form.name} *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder={t.preorder.form.namePlaceholder}
                                            required
                                            disabled={status === 'sending'}
                                            className={inputClasses}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-muted-gray mb-2">
                                                {t.preorder.form.email} *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder={t.preorder.form.emailPlaceholder}
                                                required
                                                disabled={status === 'sending'}
                                                className={inputClasses}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-muted-gray mb-2">
                                                {t.preorder.form.phone} *
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder={t.preorder.form.phonePlaceholder}
                                                required
                                                disabled={status === 'sending'}
                                                className={inputClasses}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-muted-gray mb-2">
                                            {t.preorder.form.address} *
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder={t.preorder.form.addressPlaceholder}
                                            required
                                            disabled={status === 'sending'}
                                            className={inputClasses}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="company" className="block text-sm font-medium text-muted-gray mb-2">
                                            {t.preorder.form.company}
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder={t.preorder.form.companyPlaceholder}
                                            disabled={status === 'sending'}
                                            className={inputClasses}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="notes" className="block text-sm font-medium text-muted-gray mb-2">
                                            {t.preorder.form.notes}
                                        </label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            placeholder={t.preorder.form.notesPlaceholder}
                                            disabled={status === 'sending'}
                                            rows={3}
                                            className={cn(inputClasses, 'resize-none')}
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className={cn(
                                            'w-full flex items-center justify-center gap-2',
                                            'px-8 py-4 text-sm font-medium tracking-wide uppercase',
                                            'rounded-sm transition-all duration-300',
                                            status === 'sending'
                                                ? 'bg-muted-gray/20 text-muted-gray cursor-not-allowed'
                                                : 'bg-soft-white text-deep-space hover:bg-soft-white/90'
                                        )}
                                        whileHover={status !== 'sending' ? { scale: 1.01 } : {}}
                                        whileTap={status !== 'sending' ? { scale: 0.99 } : {}}
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                {t.preorder.form.sending}
                                            </>
                                        ) : (
                                            t.preorder.form.submit
                                        )}
                                    </motion.button>

                                    {status === 'error' && (
                                        <div className="flex items-center gap-2 text-red-400 text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            {t.preorder.form.error}
                                        </div>
                                    )}
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
