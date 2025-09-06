import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  ...props 
}) => {
  const baseClasses = 'focus:outline-none transition-colors duration-200';
  
  const variants = {
    primary: 'bg-[#26231E] text-white hover:bg-[#757168]',
    secondary: 'border border-[#757168] text-[#26231E] hover:bg-[#757168] hover:text-white',
    ghost: 'text-[#26231E] rounded-md hover:bg-[#DAD6D1]'
  };
  
  const sizes = {
    small: 'px-4 py-2 text-[16px] font-medium leading-[24px]',
    medium: 'px-6 py-3 text-[16px] font-medium leading-[24px] h-12',
    large: 'px-10 py-3 text-[16px] font-medium leading-[24px] h-12'
  };
  
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
