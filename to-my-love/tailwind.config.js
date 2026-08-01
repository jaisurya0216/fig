/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        night: {
          950: '#05040c',
          900: '#0a0818',
          800: '#120e26',
          700: '#1c1638',
        },
        sakura: {
          100: '#ffe9f2',
          200: '#ffd1e6',
          300: '#ffb3d6',
          400: '#ff8fc4',
          500: '#f766ab',
          600: '#e14b8f',
        },
        rosegold: {
          200: '#f6d9c8',
          300: '#eec2ab',
          400: '#e0a98d',
          500: '#c98a6f',
        },
        moon: {
          100: '#fff9ec',
          200: '#fef2d8',
          glow: '#ffe9b8',
        },
        fairy: {
          purple: '#8a6fd8',
          violet: '#6b4fb0',
          deep: '#2c1a4d',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        script: ['"Parisienne"', 'cursive'],
        body: ['"Quicksand"', 'sans-serif'],
      },
      boxShadow: {
        glowSm: '0 0 12px rgba(255, 182, 217, 0.55)',
        glowMd: '0 0 32px rgba(255, 182, 217, 0.45)',
        glowLg: '0 0 64px rgba(199, 148, 255, 0.35)',
        moonGlow: '0 0 80px 20px rgba(255, 233, 184, 0.35)',
      },
      backgroundImage: {
        'night-gradient':
          'radial-gradient(ellipse at 50% 20%, #1c1638 0%, #0a0818 55%, #05040c 100%)',
        'aurora-gradient':
          'linear-gradient(120deg, rgba(138,111,216,0.25), rgba(247,102,171,0.2), rgba(255,233,184,0.15))',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 0.3, transform: 'scale(0.9)' },
          '50%': { opacity: 1, transform: 'scale(1.15)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg) translateX(0)' },
          '50%': { transform: 'rotate(3deg) translateX(6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,182,217,0.4)' },
          '50%': { boxShadow: '0 0 48px rgba(255,182,217,0.8)' },
        },
      },
      animation: {
        twinkle: 'twinkle 3s ease-in-out infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        sway: 'sway 5s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
