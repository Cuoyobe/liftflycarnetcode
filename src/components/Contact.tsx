'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { cn } from '@/lib/cn';

/**
 * 预订表单数据结构（历史遗留，当前组件使用扩展字段）
 */
interface FormData {
    name: string;    // 姓名
    email: string;   // 邮箱
    message: string; // 留言
}

/** 表单提交状态枚举 */
type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

/**
 * 联系/预订表单组件
 * 
 * 功能：
 * - 收集用户预订信息（姓名、邮箱、电话、地址、公司、备注）
 * - 通过 EmailJS 发送邮件通知
 * - 支持发送确认邮件给用户
 * - 表单验证与提交状态反馈
 */
export function Contact(): JSX.Element {
    const { t } = useLocale();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        company: '',
        notes: '',
    });

    const [status, setStatus] = useState<SubmitStatus>('idle');

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

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
                    type: 'Preorder (Homepage)',
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

            setStatus('success');
            setFormData({ name: '', email: '', phone: '', address: '', company: '', notes: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Failed to send:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const inputClasses = cn(
        'w-full bg-card-bg backdrop-blur-md border border-outline-border rounded-lg',
        'px-4 py-3 text-soft-white placeholder-muted-gray/50',
        'focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20',
        'transition-all duration-300'
    );

    return (
        <section id="contact" className="relative py-24 lg:py-32">
            {/* Background accent */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 blur-[100px] rounded-full" />
            </div>

            <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-soft-white mb-4">
                        {t.preorder.title}
                    </h2>
                    <p className="text-muted-gray text-base md:text-lg">
                        {t.preorder.subtitle}
                    </p>
                </motion.div>

                {/* Contact Form or Status Card */}
                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-12 bg-card-bg backdrop-blur-md border border-green-500/30 rounded-lg text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                            className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <CheckCircle className="w-10 h-10 text-green-400" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-soft-white mb-4">{t.contact.success}</h3>
                        <p className="text-muted-gray mb-8">感谢您的预订，我们会尽快联系您。</p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-soft-white text-sm font-medium transition-colors"
                        >
                            返回
                        </button>
                    </motion.div>
                ) : status === 'error' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-12 bg-card-bg backdrop-blur-md border border-red-500/30 rounded-lg text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                            className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <AlertCircle className="w-10 h-10 text-red-400" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-soft-white mb-4">{t.contact.error}</h3>
                        <p className="text-muted-gray mb-8">请检查网络连接后重试。</p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-soft-white text-sm font-medium transition-colors"
                        >
                            重试
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
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

                            {/* Email */}
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Phone */}
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

                            {/* Company */}
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
                        </div>

                        {/* Address */}
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

                        {/* Notes */}
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
                                rows={4}
                                disabled={status === 'sending'}
                                className={cn(inputClasses, 'resize-none')}
                            />
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={status === 'sending'}
                            className={cn(
                                'w-full flex items-center justify-center gap-2',
                                'px-8 py-4 text-sm font-medium tracking-wide uppercase',
                                'rounded-lg transition-all duration-300',
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
                                    {t.contact.sending}
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    {t.preorder.form.submit}
                                </>
                            )}
                        </motion.button>
                    </motion.form>
                )}
            </div>
        </section>
    );
}
