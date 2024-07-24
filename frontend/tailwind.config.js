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
        'custom-purple': 'rgb(118, 74, 188)',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #00aaff, #ff0099, #ffcc00)',
      },
      screens: {
        'custom': '500px', // Custom media query
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/line-clamp'),
  ],
}

// rgb(27, 27, 27) can be used for bg-dark mode