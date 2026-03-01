import React from 'react';

const ProfileSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm animate-pulse">
      <div className="flex items-center gap-4 mb-6">
        {/* Avatar */}
        <div className="w-20 h-20 bg-secondary-200 dark:bg-dark-700 rounded-full"></div>
        
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-secondary-200 dark:bg-dark-700 rounded w-32"></div>
          <div className="h-4 bg-secondary-200 dark:bg-dark-700 rounded w-48"></div>
          <div className="h-4 bg-secondary-200 dark:bg-dark-700 rounded w-40"></div>
        </div>
      </div>
      
      {/* Info rows */}
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-24 h-4 bg-secondary-200 dark:bg-dark-700 rounded"></div>
            <div className="flex-1 h-4 bg-secondary-200 dark:bg-dark-700 rounded"></div>
          </div>
        ))}
      </div>
      
      {/* Action buttons */}
      <div className="flex gap-3 mt-6 pt-4 border-t border-secondary-200 dark:border-dark-700">
        <div className="h-10 bg-secondary-200 dark:bg-dark-700 rounded w-24"></div>
        <div className="h-10 bg-secondary-200 dark:bg-dark-700 rounded w-24"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;