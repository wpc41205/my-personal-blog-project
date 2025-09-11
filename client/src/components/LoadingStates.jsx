import React from 'react';
import { LOADING_STATES } from '../constants';

/**
 * LoadingSpinner component
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.size - Spinner size (small, medium, large)
 */
const LoadingSpinner = ({ className = '', size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-[#26231E] ${sizeClasses[size]} ${className}`} />
  );
};

/**
 * LoadingState component for displaying loading states
 * @param {Object} props - Component props
 * @param {string} props.loadingState - Current loading state
 * @param {string} props.message - Custom loading message
 * @param {string} props.className - Additional CSS classes
 */
export const LoadingState = ({ 
  loadingState, 
  message = 'Loading...', 
  className = '' 
}) => {
  if (loadingState !== LOADING_STATES.LOADING) {
    return null;
  }

  return (
    <div className={`flex justify-center items-center w-full mt-8 ${className}`}>
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner size="medium" />
        <div className="text-[#75716B]">{message}</div>
      </div>
    </div>
  );
};

/**
 * LoadingMoreState component for displaying "loading more" state
 * @param {Object} props - Component props
 * @param {string} props.loadingState - Current loading state
 * @param {string} props.message - Custom loading message
 * @param {string} props.className - Additional CSS classes
 */
export const LoadingMoreState = ({ 
  loadingState, 
  message = 'Loading...', 
  className = '' 
}) => {
  if (loadingState !== LOADING_STATES.LOADING_MORE) {
    return null;
  }

  return (
    <div className={`flex justify-center items-center w-full ${className}`}>
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner size="small" />
        <div className="text-[#75716B] text-sm">{message}</div>
      </div>
    </div>
  );
};

/**
 * ErrorState component for displaying error messages
 * @param {Object} props - Component props
 * @param {string} props.error - Error message
 * @param {Function} props.onRetry - Retry function
 * @param {string} props.className - Additional CSS classes
 */
export const ErrorState = ({ 
  error, 
  onRetry, 
  className = '' 
}) => {
  if (!error) {
    return null;
  }

  return (
    <div className={`flex flex-col justify-center items-center w-full mt-8 gap-4 ${className}`}>
      <div className="text-red-500 text-center">{error}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-[#26231E] text-white rounded-md hover:bg-[#757168] transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

/**
 * EmptyState component for displaying empty results
 * @param {Object} props - Component props
 * @param {string} props.message - Empty state message
 * @param {string} props.className - Additional CSS classes
 */
export const EmptyState = ({ 
  message = 'No posts found. Try adjusting your search or filter.', 
  className = '' 
}) => {
  return (
    <div className={`flex justify-center items-center w-full mt-8 ${className}`}>
      <div className="text-[#75716B] text-center">{message}</div>
    </div>
  );
};

export default LoadingSpinner;
