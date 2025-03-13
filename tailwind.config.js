const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./node_modules/@heroui/theme/dist/components/tabs.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
};