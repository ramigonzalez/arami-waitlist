/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-01': '#0E062A',
        'bg-02': '#130C3C',
        'primary-base': '#6556B9',
        'primary-hover': '#846FDA',
        'accent-300': '#BA9BE6',
        'text-primary': '#F5EFE8',
        'text-muted': '#C5C5C7'
      },
      backgroundImage: {
        'gradient-pulse': 'linear-gradient(135deg, #846FDA 0%, #6556B9 100%)',
        'app-background': 'radial-gradient(circle at 50% 45%, #23143e 0%, #1c1433 40%, #130c3c 70%, #0e062a 100%)'
      },
      fontFamily: {
        'display': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      },
      spacing: {
        'base': '1rem'
      },
      borderRadius: {
        'md': '8px',
        'pill': '24px'
      },
      keyframes: {
        pulse: {
          '0%': { 
            transform: 'scale(1)',
            filter: 'drop-shadow(0 0 0 rgba(101, 86, 185, 0))'
          },
          '50%': { 
            transform: 'scale(1.04)',
            filter: 'drop-shadow(0 8px 16px rgba(101, 86, 185, 0.4))'
          },
          '100%': { 
            transform: 'scale(1)',
            filter: 'drop-shadow(0 0 0 rgba(101, 86, 185, 0))'
          }
        }
      },
      animation: {
        'pulse-btn': 'pulse 600ms ease-out'
      }
    },
  },
  plugins: [],
};