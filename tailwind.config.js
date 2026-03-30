/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f8f1fb',
          100: '#f0e3f8',
          200: '#e0c7f0',
          300: '#cfa7e5',
          400: '#b97ed8',
          500: '#9e52c8',
          600: '#7b2ea3',
          700: '#642384',
          800: '#4f1c68',
          900: '#38134b',
          navy: '#24153f',
          green: '#7b2ea3'
        },
        accent: {
          50: '#f7f3fb',
          100: '#efe7f8',
          200: '#dfcef1',
          300: '#cdb0e7',
          400: '#b98bdb',
          500: '#9f62cb',
          600: '#8643b2',
          700: '#6d3491',
          800: '#572a72',
          900: '#431f57'
        },
        page: '#f8fafc'
      },
      boxShadow: {
        glow: '0 20px 50px rgba(123, 46, 163, 0.18)',
        soft: '0 18px 45px rgba(36, 21, 63, 0.08)'
      }
    }
  },
  plugins: []
};
