
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Noto Sans Arabic', 'sans-serif'],
        noto: ['Noto Sans Arabic', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
