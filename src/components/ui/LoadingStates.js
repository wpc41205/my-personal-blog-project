import React from 'react';
import Button from './Button';

/**
 * LoadingState component - Display loading spinner
 * @param {Object} props - Component props
 * @param {string} props.loadingState - Loading state type
 * @param {string} props.message - Custom loading message
 */
export const LoadingState = ({ loadingState = "loading", message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#26231E] mb-4"></div>
      <p className="text-[#75716B] text-lg font-medium">{message}</p>
    </div>
  );
};

export const ErrorState = ({ 
  error, 
  onRetry, 
  title = "Something went wrong" 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center max-w-md">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <svg 
          className="w-8 h-8 text-red-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
          />
        </svg>
      </div>
      
      <h3 className="text-xl font-semibold text-[#26231E] mb-2">{title}</h3>
      <p className="text-[#75716B] mb-6">{error}</p>
      
      {onRetry && (
        <Button
          variant="primary"
          size="medium"
          onClick={onRetry}
          className="px-6 py-2"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

/**
 * EmptyState component - Display empty state message
 * @param {Object} props - Component props
 * @param {string} props.title - Empty state title
 * @param {string} props.message - Empty state message
 * @param {React.ReactNode} props.icon - Optional icon
 * @param {React.ReactNode} props.action - Optional action button
 */
export const EmptyState = ({ 
  title = "No items found", 
  message = "There are no items to display at the moment.",
  icon,
  action 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center max-w-md">
      {icon && (
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      
      <h3 className="text-xl font-semibold text-[#26231E] mb-2">{title}</h3>
      <p className="text-[#75716B] mb-6">{message}</p>
      
      {action}
    </div>
  );
};
