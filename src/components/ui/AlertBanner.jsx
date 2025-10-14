import React from 'react';

const VARIANT_STYLES = {
  error: {
    container: 'bg-[#EB5164] text-white',
    border: 'border-[#EB5164]',
  },
  success: {
    container: 'bg-[#12B279] text-white',
    border: 'border-[#12B279]',
  },
  info: {
    container: 'bg-[#3A86FF] text-white',
    border: 'border-[#3A86FF]',
  },
  warning: {
    container: 'bg-[#F59E0B] text-white',
    border: 'border-[#F59E0B]',
  },
};

const AlertBanner = ({
  variant = 'error',
  title = '',
  description = '',
  onClose,
  className = '',
  dismissLabel = 'Close',
  show = true,
}) => {
  if (!show) return null;

  const styles = VARIANT_STYLES[variant] || VARIANT_STYLES.error;

  return (
    <div
      className={`w-full rounded-[8px] px-4 py-4 border backdrop-blur-[20px] ${styles.container} ${styles.border} ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          {title && (
            <div className="font-['Poppins'] font-semibold text-[20px] leading-[28px]">{title}</div>
          )}
          {description && (
            <div className="opacity-90 font-['Poppins'] font-medium text-[14px] leading-[22px] mt-1">{description}</div>
          )}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label={dismissLabel}
            className="shrink-0 opacity-90 hover:opacity-100 transition-opacity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertBanner;


