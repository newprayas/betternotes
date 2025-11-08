'use client';

import { useState, useEffect, useRef } from 'react';

const ImageSlideshow = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Placeholder images - using empty divs with gray backgrounds as requested
  const images = Array(5).fill(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2800); // Change image every 2 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, images.length]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
  };

  return (
    <div
      className="relative w-11/12 md:w-4/5 lg:w-3/4 h-[28rem] md:h-[40rem] overflow-hidden bg-gray-100 rounded-lg mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex h-full transition-transform duration-500 ease-in-out"
           style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
        {images.map((_, index) => (
          <div 
            key={index}
            className="w-full h-full flex-shrink-0 flex items-center justify-center bg-gray-200"
          >
            <div className="text-gray-400 text-center">
              <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2"></div>
              <p>Image {index + 1}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Dots indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentImageIndex ? 'bg-black' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlideshow;