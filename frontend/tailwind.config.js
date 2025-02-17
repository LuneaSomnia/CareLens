/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        frost: {
          DEFAULT: '#a8d0e6',
          light: '#d0e7f5',
          dark: '#7698a6'
        },
        ice: {
          DEFAULT: '#e0f7fa',
          deep: '#b2ebf2'
        }
      },
      backgroundImage: {
        'snowflakes': "url('/images/snowflakes.png')" // add your snowflake pattern image
      },
    },
  },
  plugins: [],
}
