import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
}

const Logo: React.FC<LogoProps> = ({ className = "h-12", variant = 'full' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg 
        viewBox="0 0 400 240" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 'i' */}
        <circle cx="45" cy="50" r="18" fill="#1bb0bd" />
        <rect x="30" y="85" width="30" height="110" rx="15" fill="#1bb0bd" />
        
        {/* 'c' with arrow */}
        <path 
          d="M200 140 A45 45 0 1 1 180 100" 
          stroke="#f6b21b" 
          strokeWidth="28" 
          fill="none" 
          strokeLinecap="round"
        />
        <path d="M175 95 L210 105 L195 70 Z" fill="#f6b21b" />

        {/* 'e' */}
        <path 
          d="M340 145 A45 45 0 1 0 260 145 A45 45 0 0 0 340 145 Z M260 145 L345 145" 
          stroke="#1bb0bd" 
          strokeWidth="28" 
          fill="none" 
          strokeLinecap="round"
        />

        {variant === 'full' && (
          <text 
            x="200" 
            y="230" 
            fontFamily="'Courier New', Courier, monospace" 
            fontSize="48" 
            fontWeight="bold" 
            fill="#1bb0bd" 
            textAnchor="middle"
            letterSpacing="8"
          >
            Media Lab
          </text>
        )}
      </svg>
    </div>
  );
};

export default Logo;