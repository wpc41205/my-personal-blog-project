// Server constants

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

// Pagination Defaults
export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 6,
  MAX_LIMIT: 50
};

// Validation Rules
export const VALIDATION_RULES = {
  TITLE: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 200
  },
  DESCRIPTION: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 500
  },
  PASSWORD: {
    MIN_LENGTH: 6
  },
  EMAIL: {
    REGEX: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  }
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  API_ERROR: 'Failed to load data. Please try again.',
  INVALID_PARAMS: 'Invalid parameters provided.',
  NOT_FOUND: 'Resource not found.',
  UNAUTHORIZED: 'Unauthorized access.',
  FORBIDDEN: 'Access forbidden.',
  VALIDATION_ERROR: 'Validation failed.',
  UNKNOWN_ERROR: 'An unexpected error occurred.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  POST_CREATED: 'Post created successfully.',
  POST_UPDATED: 'Post updated successfully.',
  POST_DELETED: 'Post deleted successfully.',
  USER_REGISTERED: 'User registered successfully.',
  USER_LOGGED_IN: 'User logged in successfully.'
};

// Blog Post Categories
export const BLOG_CATEGORIES = {
  HIGHLIGHT: 'highlight',
  GENERAL: 'General',
  CAT: 'Cat',
  INSPIRATION: 'Inspiration'
};
