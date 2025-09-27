import React from 'react';

/**
 * Select component for dropdown selections
 */
const Select = ({
  options = [],
  value = '',
  onChange,
  className = '',
  ...props
}) => {
  const baseClasses = 'w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-colors duration-200 bg-white';
  const classes = `${baseClasses} ${className}`;
  
  return (
    <select
      value={value}
      onChange={onChange}
      className={classes}
      {...props}
    >
      <option value="" disabled>
        Select an option
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
