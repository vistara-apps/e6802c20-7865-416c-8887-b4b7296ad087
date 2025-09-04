/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(210, 30%, 95%)',
        text: 'hsl(210, 30%, 20%)',
        accent: 'hsl(140, 60%, 45%)',
        primary: 'hsl(210, 80%, 50%)',
        surface: 'hsl(210, 30%, 100%)',
        purple: {
          dark: '#1a0a2e',
          medium: '#16213e',
          light: '#0f3460',
          accent: '#9333ea',
        },
      },
      borderRadius: {
        lg: '16px',
        md: '10px',
        sm: '6px',
      },
      spacing: {
        lg: '20px',
        md: '12px',
        sm: '8px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(210, 30%, 20%, 0.1)',
        glow: '0 0 20px rgba(147, 51, 234, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
