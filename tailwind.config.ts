import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        bricolage: ['Bricolage Grotesque', 'sans-serif'],
      },
      colors: {
        primary: 'var(--color-primary)',
        cta: 'var(--color-cta)',
        'cta-gold': 'var(--color-cta-gold)',
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
    },
  },
} satisfies Config