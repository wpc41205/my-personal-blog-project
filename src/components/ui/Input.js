import React from 'react';

/**
 * Input component with icon support
 */
const Input = ({
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  onKeyDown,
  onBlur,
  className = '',
  icon,
  ...props
}) => {
  const baseClasses = 'w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-colors duration-200';
  const classes = `${baseClasses} ${className}`;
  
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        className={classes}
        {...props}
      />
      {icon && icon}
    </div>
  );
};

export default Input;
