import React from 'react';

const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-sm animate-pulse">
      {/* Image placeholder */}
      <div className="h-48 bg-secondary-200 dark:bg-dark-700 rounded-lg mb-4"></div>
      
      {/* Title placeholder */}
      <div className="h-5 bg-secondary-200 dark:bg-dark-700 rounded w-3/4 mb-2"></div>
      
      {/* Subtitle placeholder */}
      <div className="h-4 bg-secondary-200 dark:bg-dark-700 rounded w-1/2 mb-4"></div>
      
      {/* Description lines */}
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-secondary-200 dark:bg-dark-700 rounded w-full"></div>
        <div className="h-3 bg-secondary-200 dark:bg-dark-700 rounded w-5/6"></div>
      </div>
      
      {/* Footer buttons */}
      <div className="flex gap-2">
        <div className="h-8 bg-secondary-200 dark:bg-dark-700 rounded w-20"></div>
        <div className="h-8 bg-secondary-200 dark:bg-dark-700 rounded w-20"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;