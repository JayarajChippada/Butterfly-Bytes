/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors: {
        'custom-dark': 'rgb(16, 23, 42)',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #00aaff, #ff0099, #ffcc00)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}