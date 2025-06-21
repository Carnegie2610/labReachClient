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
          DEFAULT: '#271F30',
        },
        accent: {
          DEFAULT: '#E35805',
        },
        secondary: {
          DEFAULT: '#6DD3CE',
        },
        muted: {
          DEFAULT: '#757780',
        },
        neutral: {
          DEFAULT: '#E2DADB',
        },
      },
    },
  },
  plugins: [],
}
