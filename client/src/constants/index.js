// Color constants
export const COLORS = {
  primary: '#26231E',
  secondary: '#757168',
  accent: '#128279',
  lightGray: '#75716B',
  mediumGray: '#43403B',
  background: '#F9F8F6',
  lightBackground: '#F5F3F0',
  border: '#DAD6D1',
  white: '#FFFFFF',
  error: '#EF4444',
  success: '#10B981'
};

// API Response Status
export const API_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading'
};

// Blog Post Categories
export const BLOG_CATEGORIES = {
  HIGHLIGHT: 'highlight',
  GENERAL: 'General',
  CAT: 'Cat',
  INSPIRATION: 'Inspiration'
};

// Typography constants
export const FONTS = {
  poppins: 'font-[\'Poppins\']'
};

// Spacing constants
export const SPACING = {
  containerPadding: 'px-4 md:pr-[120px] md:pl-[120px]',
  sectionPadding: 'px-4',
  cardPadding: 'px-4 py-4'
};

// Button variants
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  GHOST: 'ghost',
  HIGHLIGHT: 'highlight',
  OUTLINE: 'outline'
};

// Button sizes
export const BUTTON_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://blog-post-project-api.vercel.app',
  DEFAULT_PAGE_SIZE: 6,
  MAX_PAGE_SIZE: 50,
  TIMEOUT: 10000
};

// Pagination constants
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 6,
  MAX_LIMIT: 50
};

// Filter options for articles
export const FILTER_OPTIONS = [
  { value: 'highlight', label: 'Highlight' },
  { value: 'General', label: 'General' },
  { value: 'Cat', label: 'Cat' },
  { value: 'Inspiration', label: 'Inspiration' }
];

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  API_ERROR: 'Failed to load posts. Please try again.',
  INVALID_PARAMS: 'Invalid parameters provided.',
  POST_NOT_FOUND: 'Post not found.',
  UNKNOWN_ERROR: 'An unexpected error occurred.'
};

// Loading states
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  LOADING_MORE: 'loading_more',
  SUCCESS: 'success',
  ERROR: 'error'
};

// Component dimensions
export const DIMENSIONS = {
  NAVBAR_HEIGHT: {
    MOBILE: '64px',
    DESKTOP: '80px'
  },
  HERO_IMAGE: {
    WIDTH: '386px',
    HEIGHT: '529px'
  },
  BLOG_CARD: {
    HEIGHT: {
      MOBILE: '212px',
      DESKTOP: '360px'
    }
  }
};
