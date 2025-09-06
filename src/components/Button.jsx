import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'focus:outline-none transition-colors duration-200';
  
  const variants = {
    primary: 'bg-[#26231E] text-white hover:bg-[#757168]',
    secondary: 'border border-[#757168] text-[#26231E] hover:bg-[#757168] hover:text-white',
    ghost: 'text-[#75716B] rounded-md hover:bg-white hover:text-[#26231E]',
    highlight: 'bg-[#DAD6D1] text-[#26231E] rounded-md'
  };
  
  const sizes = {
    small: 'px-4 py-2 text-[16px] font-medium leading-[24px]',
    medium: 'px-6 py-3 text-[16px] font-medium leading-[24px] h-12',
    large: 'px-10 py-3 text-[16px] font-medium leading-[24px] h-12'
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed hover:bg-[#DAD6D1]' : '';
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`;
  
  return (
    <button className={buttonClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
