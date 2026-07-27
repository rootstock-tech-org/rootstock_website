"use client";

import React from 'react';

interface CarouselNavigationProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  className?: string;
}

const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  onPrevClick,
  onNextClick,
  className = ''
}) => {
  return (
    <div className={`absolute inset-y-0 left-0 w-full flex items-center justify-between z-20 pointer-events-none ${className}`}>
      <button
        onClick={onPrevClick}
        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 mx-2 pointer-events-auto hover:bg-white/20"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
        </svg>
      </button>
      <button
        onClick={onNextClick}
        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 mx-2 pointer-events-auto hover:bg-white/20"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default CarouselNavigation;
