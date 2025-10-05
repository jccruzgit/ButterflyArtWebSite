/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        butterfly: {
          50:  '#faf7ff',
          100: '#f2ecff',
          200: '#e5d9ff',
          300: '#d0bbff',
          400: '#b69aff',
          500: '#a78bfa',
          600: '#8b6de6',
          700: '#6d53c7',
          800: '#553fa0',
          900: '#422f7a'
        },
        pastel: {
          lavender: '#C7B9FF',
          rose: '#FFC7D1',
          cream: '#FFF4E0',
          mint: '#C9F7F2'
        }
      },
      fontFamily: {
        display: ['Marcellus', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem'
      },
      boxShadow: {
        soft: '0 10px 25px -10px rgba(0,0,0,0.25)'
      }
    }
  },
  plugins: []
}
