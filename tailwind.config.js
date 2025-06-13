/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-01': '#201C2E',
        'bg-02': '#2F2B40',
        'accent-lilac': '#8B7EE6',
        'accent-moss': '#5CC6A4',
        'text-primary': '#F5F5F5',
        'text-muted': '#C5C5C7'
      },
      backgroundImage: {
        'gradient-pulse': 'linear-gradient(135deg, #8B7EE6 0%, #5CC6A4 100%)'
      },
      fontFamily: {
        'display': ['DM Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      },
      spacing: {
        'base': '1rem'
      },
      borderRadius: {
        'md': '8px',
        'pill': '28px'
      },
      keyframes: {
        pulse: {
          '0%': { 
            transform: 'scale(1)',
            filter: 'drop-shadow(0 0 0 rgba(187, 156, 246, 0))'
          },
          '50%': { 
            transform: 'scale(1.05)',
            filter: 'drop-shadow(0 8px 16px rgba(187, 156, 246, 0.4))'
          },
          '100%': { 
            transform: 'scale(1)',
            filter: 'drop-shadow(0 0 0 rgba(187, 156, 246, 0))'
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