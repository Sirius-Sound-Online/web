import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        graphite: '#191C1F',
        star: '#37E7FF',
        accent: {
          DEFAULT: '#00E5FF',
          500: '#00C4E6',
          600: '#009FC0'
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Space Grotesk', 'system-ui']
      },
      boxShadow: {
        smooth: '0 24px 48px -16px rgba(0, 229, 255, 0.25)'
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease both',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.65' }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
} satisfies Config;
