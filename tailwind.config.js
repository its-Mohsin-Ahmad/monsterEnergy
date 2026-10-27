/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050705',
        'bg-2': '#090D0A',
        sidebar: '#030403',
        card: '#0D130F',
        'card-elev': '#111A14',
        neon: '#B7FF00',
        'neon-bright': '#D1FF4D',
        border: '#1C2A20',
        text: '#F5F7F4',
        'text-2': '#A1ABA3',
        muted: '#68746C',
        error: '#FF5555',
        warn: '#FFB547',
        success: '#B7FF00',
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Impact"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
      },
      boxShadow: {
        glow: '0 0 12px rgba(183,255,0,0.35), 0 0 24px rgba(183,255,0,0.15)',
      },
    },
  },
  plugins: [],
}
