/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        // Default breakpoints are still available:
        // 'sm': '640px',
        // 'md': '768px', 
        // 'lg': '1024px',
        // 'xl': '1280px',
        // '2xl': '1536px',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#0b182f', // Deep Indigo (Logo)
        secondary: '#415b3e', // Fern Green (Logo)
        dark: '#0b182f', // Text/Headings
        muted: '#98a29f', // Muted Gray-Green
        light: '#fefefe', // Off-white
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.2s ease-out infinite',
        'float': 'floatBlob 10s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%': {
            boxShadow: '0 0 0 0 rgba(122, 229, 130, 0.45), 0 0 0 0 rgba(22, 186, 197, 0.35)'
          },
          '70%': {
            boxShadow: '0 0 0 10px rgba(122, 229, 130, 0), 0 0 0 20px rgba(22, 186, 197, 0)'
          },
          '100%': {
            boxShadow: '0 0 0 0 rgba(122, 229, 130, 0), 0 0 0 0 rgba(22, 186, 197, 0)'
          },
        },
        floatBlob: {
          '0%': {
            transform: 'translateY(0) translateX(0) scale(1)'
          },
          '50%': {
            transform: 'translateY(-14px) translateX(6px) scale(1.03)'
          },
          '100%': {
            transform: 'translateY(0) translateX(0) scale(1)'
          },
        }
      },
      textShadow: {
        'lg': '0 2px 12px rgba(0, 0, 0, 0.65), 0 1px 2px rgba(0, 0, 0, 0.35)',
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-lg': {
          textShadow: '0 2px 12px rgba(0, 0, 0, 0.65), 0 1px 2px rgba(0, 0, 0, 0.35)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

