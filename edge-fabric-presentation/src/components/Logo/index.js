import React from 'react';

/**
 * Logo - renders the transparent background EPAM logo
 */
const Logo = ({ alt = 'Logo', width = 220 }) => {
  return (
    <img
      src={require('../../assets/styles/official_epam_logo-removebg-preview.png')}
      alt={alt}
      style={{
        width,
        height: 'auto',
        display: 'block',
        filter: 'drop-shadow(0 0 16px rgba(0,200,232,0.45)) drop-shadow(0 0 6px rgba(0,200,232,0.3)) drop-shadow(0 0 2px rgba(0,200,232,0.15))',
      }}
      draggable={false}
    />
  );
};

export default Logo;
