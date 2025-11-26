/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f8ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#60c5fa',
          500: '#3b9ef5',
          600: '#2b8ce8',
          700: '#1e7cd4',
          800: '#1a6bb0',
          900: '#1a5a91',
        },
      },
    },
  },
  plugins: [],
}

