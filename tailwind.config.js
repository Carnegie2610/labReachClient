/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
    
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#271F30', // dark base, good for navbars or dark backgrounds
        },
        accent: {
          DEFAULT: '#E3B505', // vibrant gold, best for CTAs (buttons, highlights)
        },
        secondary: {
          DEFAULT: '#6DD3CE', // teal/mint, ideal for highlights and cards
        },
        muted: {
          DEFAULT: '#757780', // grey, for secondary text or disabled states
        },
        neutral: {
          DEFAULT: '#E2DADB', // light background, containers, surface
        },
      },
    },
  },
  plugins: [],
}
