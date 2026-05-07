/**
 * Design Tokens — Typography
 * Headers  : Museo Sans  (local) → Josefin Sans (Google web fallback)
 * Body     : Source Sans Pro
 */
const typography = {
  fontDisplay: "'Museo Sans', 'Josefin Sans', 'Trebuchet MS', sans-serif",
  fontBody: "'Source Sans Pro', 'Segoe UI', Arial, sans-serif",

  weightLight: 300,
  weightRegular: 400,
  weightSemibold: 600,
  weightBold: 700,
  weightBlack: 900,

  size: {
    xs: '0.688rem',   /* 11px */
    sm: '0.875rem',   /* 14px */
    base: '1rem',     /* 16px */
    md: '1.125rem',   /* 18px */
    lg: '1.375rem',   /* 22px */
    xl: '2rem',       /* 32px */
    xxl: '3.25rem',   /* 52px */
    hero: '5rem',     /* 80px */
    display: '6.5rem',/* 104px */
  },

  lineHeight: {
    tight: 1.0,
    snug: 1.15,
    normal: 1.5,
    loose: 1.7,
  },

  tracking: {
    tight: '-0.02em',
    normal: '0em',
    wide: '0.06em',
    wider: '0.14em',
    widest: '0.32em',
  },
};

export default typography;
