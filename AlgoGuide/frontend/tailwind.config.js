/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060d18',
          900: '#0a1628',
          850: '#0f1f38',
          800: '#142747',
          700: '#1e3863'
        }
      }
    },
  },
  plugins: [],
}
