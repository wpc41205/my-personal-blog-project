// Typography system for the personal blog
export const typography = {
  // Font Families
  fontFamily: {
    sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
    mono: ['var(--font-geist-mono)', 'monospace'],
  },

  // Font Sizes
  fontSize: {
    // Headlines
    'h1': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }], // 56px
    'h2': ['2.5rem', { lineHeight: '1.2', fontWeight: '600' }], // 40px
    'h3': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],   // 32px
    'h4': ['1.5rem', { lineHeight: '1.4', fontWeight: '500' }], // 24px
    
    // Body Text
    'body1': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }], // 18px
    'body2': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],     // 16px
    'body3': ['0.875rem', { lineHeight: '1.4', fontWeight: '400' }], // 14px
    
    // Small Text
    'caption': ['0.75rem', { lineHeight: '1.3', fontWeight: '400' }], // 12px
    'overline': ['0.75rem', { lineHeight: '1.3', fontWeight: '500', letterSpacing: '0.1em' }], // 12px
  },

  // Font Weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Line Heights
  lineHeight: {
    tight: '1.1',
    snug: '1.2',
    normal: '1.5',
    relaxed: '1.6',
    loose: '1.8',
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// Typography utility classes
export const typographyClasses = {
  // Headlines
  h1: 'text-h1 font-bold leading-tight',
  h2: 'text-h2 font-semibold leading-snug',
  h3: 'text-h3 font-semibold leading-normal',
  h4: 'text-h4 font-medium leading-normal',
  
  // Body Text
  body1: 'text-body1 font-normal leading-relaxed',
  body2: 'text-body2 font-normal leading-normal',
  body3: 'text-body3 font-normal leading-normal',
  
  // Small Text
  caption: 'text-caption font-normal leading-normal',
  overline: 'text-overline font-medium leading-normal tracking-wider',
};
