import React from 'react';

export default function GradualBlur() {
  return (
    <div 
      className="pointer-events-none absolute inset-x-0 z-30"
      style={{
        height: '15vh',
        top: '-7.5vh',
        background: 'linear-gradient(to bottom, transparent, rgba(232, 229, 216, 0.4), transparent)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    />
  );
}