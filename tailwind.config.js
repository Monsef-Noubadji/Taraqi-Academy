/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primaryGreen': '#3BB349',
      'secondaryGreen': '#5FCE6C',
      'tertiaryGreen':'#167821',
      'primaryGolden':'#EAC842',
      'secondaryGolden':'#C28F0F',
      'white': '#ffffff',
      'smokeWhite': '#FCFCFC',
      'black': '#1C1E1C',
      'paragraph': '#9A9A9A',
      'lighGray': '#F3F3F3',
      'lace':'#FFF4E4',
      'lightLace':'#C28F0F1A',
      'lightSmoke':'#FFFCF4'
    },
  },
  plugins: [],
}

