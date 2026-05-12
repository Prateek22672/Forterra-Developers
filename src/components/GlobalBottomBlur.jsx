// src/components/GlobalBottomBlur.jsx
import React from 'react';

const GlobalBottomBlur = () => {
  return (
    <div 
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-[100]"
      style={{
        height: '12vh', // Adjust height for the blur "thickness"
        background: 'linear-gradient(to bottom, transparent, rgba(232, 229, 216, 0.2), rgba(232, 229, 216, 0.5))',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        maskImage: 'linear-gradient(to bottom, transparent, black)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',
      }}
    />
  );
};

export default GlobalBottomBlur;