/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A1A',
        secondary: '#D4A373',
        accent: '#E8D5C4',
        textColor: '#F5F5F5',
        cardBg: '#242424',
      },
    },
  },
  plugins: [],
};
