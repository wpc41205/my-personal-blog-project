import React from 'react';

/**
 * Input component with consistent styling
 * @param {Object} props - Component props
 * @param {string} props.type - Input type (text, email, password, etc.)
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.icon - Icon component to display
 * @param {Object} props... - Additional props passed to input element
 */
const Input = ({ 
  type = 'text',
  placeholder = '',
  className = '',
  icon,
  ...props 
}) => {
  const baseClasses = 'px-4 border border-gray-300 rounded-md text-[#26231E] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-[16px] font-medium leading-[24px]';
  
  const inputClasses = `${baseClasses} ${className}`;
  
  if (icon) {
    return (
      <div className="relative">
        <input 
          type={type}
          placeholder={placeholder}
          className={inputClasses}
          {...props}
        />
        {icon}
      </div>
    );
  }
  
  return (
    <input 
      type={type}
      placeholder={placeholder}
      className={inputClasses}
      {...props}
    />
  );
};

export default Input;
