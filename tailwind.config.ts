import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Backgrounds
                'deep-space': 'var(--color-deep-space)',
                'card-bg': 'var(--color-card-bg)',

                // Accents & Text
                'accent': 'var(--color-accent)',
                'accent-dim': 'var(--color-accent-dim)',
                'muted-gray': 'var(--color-muted-gray)',
                'soft-white': 'var(--color-soft-white)',
                'outline-border': 'var(--color-border)',
            },
            fontFamily: {
                sans: ['var(--font-poppins)', 'var(--font-harmony)', 'system-ui', 'sans-serif'],
                barlow: ['var(--font-poppins)', 'sans-serif'], // Alias Barlow to Poppins
            },
            letterSpacing: {
                'barlow': '0.05em',
            },
            backgroundImage: {
                'glow-gradient': 'radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
                'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,255,255,0.08), transparent)',
            },
            animation: {
                'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
                'fade-in': 'fade-in 0.6s ease-out forwards',
            },
            keyframes: {
                'glow-pulse': {
                    '0%, 100%': { opacity: '0.3' },
                    '50%': { opacity: '0.6' },
                },
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
