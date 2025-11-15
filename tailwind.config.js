/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#111111',
        primary: '#FFFFFF',
        accent: '#0070F3',
        textColor: '#EDEDED',
        border: '#333333',
      },
    },
  },
  plugins: [],
};
