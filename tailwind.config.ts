import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1DB954',
        accent: '#6C63FF',
        background: '#0A0A0F',
        surface: {
          DEFAULT: '#12121A',
          alt: '#1A1A26',
        },
        border: '#2A2A3E',
        text: {
          primary: '#FFFFFF',
          secondary: '#A0A0B8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
