/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#e6eeff',
          200: '#c7ddff',
          300: '#9dbbff',
          400: '#6b96ff',
          500: '#3f72ff',
          600: '#2f54d6',
          700: '#2340a8',
          800: '#172b7a',
          900: '#0c183d',
        },
        accent: {
          50: '#fff7f3',
          100: '#ffefe6',
          200: '#ffd7c7',
          300: '#ffb794',
          400: '#ff8a58',
          500: '#ff6a29',
          600: '#e65a22',
          700: '#b84218',
          800: '#8a2f10',
          900: '#5b1b07',
        },
        cloud: {
          100: '#ffffff',
          200: '#f3f4f6',
          300: '#e5e7eb',
          400: '#d1d5db',
        },
        glass: 'rgba(255,255,255,0.72)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'card': '0 10px 30px rgba(20, 20, 40, 0.12)'
      }
    },
  },
  plugins: [],
}

