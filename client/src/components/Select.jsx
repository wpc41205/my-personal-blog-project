import React from 'react';

/**
 * Select component with consistent styling
 * @param {Object} props - Component props
 * @param {Array} props.options - Array of option objects with value and label
 * @param {string} props.value - Selected value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props... - Additional props passed to select element
 */
const Select = ({ 
  options = [],
  value,
  onChange,
  className = '',
  ...props 
}) => {
  const baseClasses = 'w-full px-4 py-3 border border-gray-300 rounded-md text-[#26231E] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none text-[16px] font-medium leading-[24px]';
  
  const selectClasses = `${baseClasses} ${className}`;
  
  return (
    <div className="relative">
      <select 
        value={value}
        onChange={onChange}
        className={selectClasses}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg 
          className="w-5 h-5 text-[#26231E]"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default Select;
