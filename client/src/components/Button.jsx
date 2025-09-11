import React from 'react';

/**
 * Button component with consistent styling and variants
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button variant (primary, secondary, ghost, highlight, outline)
 * @param {string} props.size - Button size (small, medium, large)
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {Object} props... - Additional props passed to button element
 */
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
    secondary: 'border border-[#757168]',
    ghost: 'text-[#75716B] rounded-md',
    highlight: 'bg-[#DAD6D1] rounded-md text-[#43403B]',
    outline: 'border border-[#26231E]'
  };
  
  const sizes = {
    small: 'px-4 py-2 text-[16px] font-medium leading-[24px]',
    medium: 'px-6 py-3 text-[16px] font-medium leading-[24px] h-12',
    large: 'px-10 py-3 text-[16px] font-medium leading-[24px] h-12'
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const buttonClasses = `${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.medium} ${disabledClasses} ${className}`;
  
  // Define text colors and hover styles for specific variants
  const getTextColor = () => {
    if (variant === 'secondary' || variant === 'outline' || variant === 'highlight') {
      return { color: '#43403B' };
    }
    return {};
  };

  const handleMouseEnter = (e) => {
    if (variant === 'secondary' || variant === 'outline' || variant === 'ghost') {
      e.target.classList.add('hover-bg-custom');
    }
  };

  const handleMouseLeave = (e) => {
    if (variant === 'secondary' || variant === 'outline' || variant === 'ghost') {
      e.target.classList.remove('hover-bg-custom');
    }
  };
  
  return (
    <>
      <style>
        {`
          .hover-bg-custom {
            background-color: #DAD6D1 !important;
          }
        `}
      </style>
      <button 
        className={buttonClasses} 
        style={getTextColor()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={disabled} 
        {...props}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
