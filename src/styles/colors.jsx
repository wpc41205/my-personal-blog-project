// Color palette for the personal blog
export const colors = {
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
};

// CSS Custom Properties for Tailwind
export const cssVariables = {
  '--color-brown-600': colors.brown[600],
  '--color-brown-500': colors.brown[500],
  '--color-brown-400': colors.brown[400],
  '--color-brown-300': colors.brown[300],
  '--color-brown-200': colors.brown[200],
  '--color-brown-100': colors.brown[100],
  '--color-white': colors.white,
  '--color-orange': colors.orange,
  '--color-green-primary': colors.green.primary,
  '--color-green-light': colors.green.light,
  '--color-red': colors.red,
};

// Tailwind color classes mapping
export const tailwindColors = {
  'brown-600': colors.brown[600],
  'brown-500': colors.brown[500],
  'brown-400': colors.brown[400],
  'brown-300': colors.brown[300],
  'brown-200': colors.brown[200],
  'brown-100': colors.brown[100],
  'white': colors.white,
  'orange': colors.orange,
  'green-primary': colors.green.primary,
  'green-light': colors.green.light,
  'red': colors.red,
};
