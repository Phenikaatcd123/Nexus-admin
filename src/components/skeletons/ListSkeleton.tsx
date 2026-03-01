import React from 'react';

interface ListSkeletonProps {
  items?: number;
  hasAvatar?: boolean;
}

const ListSkeleton: React.FC<ListSkeletonProps> = ({ 
  items = 5,
  hasAvatar = true 
}) => {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(items)].map((_, index) => (
        <div 
          key={index} 
          className="bg-white dark:bg-dark-800 rounded-lg p-4 flex items-center gap-4"
        >
          {hasAvatar && (
            <div className="w-10 h-10 bg-secondary-200 dark:bg-dark-700 rounded-full flex-shrink-0"></div>
          )}
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-secondary-200 dark:bg-dark-700 rounded w-1/3"></div>
            <div className="h-3 bg-secondary-200 dark:bg-dark-700 rounded w-1/2"></div>
          </div>
          <div className="w-16 h-6 bg-secondary-200 dark:bg-dark-700 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default ListSkeleton;