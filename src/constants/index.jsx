/**
 * Filter options for article categories
 * These will be fetched from API, but we keep defaults as fallback
 */
export const DEFAULT_FILTER_OPTIONS = [
  { value: 'highlight', label: 'Highlight' },
  { value: 'skills', label: 'Skills' },
  { value: 'mindset', label: 'Mindset' },
  { value: 'health', label: 'Health' }
];

/**
 * Date formatting utility
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
