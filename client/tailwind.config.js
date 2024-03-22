/** @type {import('tailwindcss').Config} */

import plug from  '@tailwindcss/line-clamp'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plug,
    // ...
  ],
}