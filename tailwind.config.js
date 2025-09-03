/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        brown: {
          100: '#F9F8F6',
          200: '#EFEEEB',
          300: '#DAD6D1',
          400: '#757168',
          500: '#434038',
          600: '#26231E',
        },
        white: '#FFFFFF',
        
        // Brand colors
        brand: {
          orange: '#F2BB8C',
          green: {
            DEFAULT: '#128279',
            light: '#D7F2E9',
          },
          red: '#EBS164',
        }
      },
    },
  },
  plugins: [],
}
