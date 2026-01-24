import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { LocaleProvider } from '@/context/LocaleContext';
import { Navbar } from '@/components';
import { ThemeProvider } from '@/context/ThemeContext';

/** HarmonyOS Sans SC 中文字体 */
const harmonyOS = localFont({
    src: [
        {
            path: '../../public/font/HarmonyOS_Sans_SC_Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/font/HarmonyOS_Sans_SC_Bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-harmony',
    display: 'swap',
});

/** Poppins 英文字体 */
const poppins = localFont({
    src: [
        {
            path: '../../public/font/Poppins-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/font/Poppins-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-poppins',
    display: 'swap',
});

export const metadata: Metadata = {
    title: '领飞特科技 | 个人eVTOL 飞行新体验 简单飞自由飞',
    description: '领飞特致力于打造优质的个人低空出行体验，一站式实现低空飞行娱乐竞技场景的商业化运营，为飞行爱好者提供可靠的竞技飞行装备与可定制化的解决方案。',
    keywords: '领飞特, Aerolus, aerolus, 涡流f1, 涡流, eVTOL, vortexf1, vortex, 载人无人机, 电动起降无人机, 垂直起降无人机, 电动垂直起降无人机',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <html lang="en" className={`${harmonyOS.variable} ${poppins.variable}`}>
            <body className="bg-deep-space min-h-screen antialiased">
                <ThemeProvider>
                    <LocaleProvider>
                        <Navbar />
                        {children}
                    </LocaleProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
