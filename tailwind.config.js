/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base Colors
        brown: {
          600: '#28231E', // Very dark brown, almost black
          500: '#434038', // Dark brown
          400: '#757168', // Medium-dark grayish-brown
          300: '#DAD6D1', // Light beige-brown
          200: '#EFEEEB', // Very light off-white/cream
          100: '#F9F8F8', // Extremely light, almost white, off-white
        },
        white: '#FFFFFF', // Pure white

        // Brand Colors
        orange: '#F2BB8C', // Light, peachy orange
        green: {
          primary: '#128279', // Vibrant, medium shade of green
          light: '#D7F2E9', // Very light, pastel green
        },
        red: '#EBS164', // Bright, medium red color
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      fontSize: {
        // Headlines
        'h1': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }], // 56px
        'h2': ['2.5rem', { lineHeight: '1.2', fontWeight: '600' }], // 40px
        'h3': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],   // 32px
        'h4': ['1.5rem', { lineHeight: '1.4', fontWeight: '500' }], // 24px
        
        // Body Text
        'body1': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }], // 18px
        'body2': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],     // 16px
        'body3': ['0.875rem', { lineHeight: '1.4', fontWeight: '400' }], // 14px
        
        // Small Text
        'caption': ['0.75rem', { lineHeight: '1.3', fontWeight: '400' }], // 12px
        'overline': ['0.75rem', { lineHeight: '1.3', fontWeight: '500', letterSpacing: '0.1em' }], // 12px
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      lineHeight: {
        tight: '1.1',
        snug: '1.2',
        normal: '1.5',
        relaxed: '1.6',
        loose: '1.8',
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
    },
  },
  plugins: [],
}
