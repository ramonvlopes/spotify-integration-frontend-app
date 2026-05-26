import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1DB954',
        accent: '#7C3AED',
        neon: '#22D3EE',
        background: '#030309',
        surface: {
          DEFAULT: '#08080F',
          alt: '#0E0E1C',
        },
        border: 'rgba(255,255,255,0.07)',
        text: {
          primary: '#F1F5F9',
          secondary: '#64748B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(29, 185, 84, 0.25)',
        'glow-green-sm': '0 0 10px rgba(29, 185, 84, 0.15)',
        'glow-violet': '0 0 20px rgba(124, 58, 237, 0.25)',
        'glow-cyan': '0 0 20px rgba(34, 211, 238, 0.15)',
        'card': '0 4px 24px rgba(0,0,0,0.6)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(29,185,84,0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-card': 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)',
        'gradient-hero': 'linear-gradient(to top, #030309 0%, #030309 30%, transparent 100%)',
        'gradient-green-violet': 'linear-gradient(135deg, #1DB954 0%, #7C3AED 100%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
