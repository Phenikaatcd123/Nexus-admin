import React from 'react';

interface ChartSkeletonProps {
  type?: 'bar' | 'line' | 'pie';
}

const ChartSkeleton: React.FC<ChartSkeletonProps> = ({ type = 'bar' }) => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm animate-pulse">
      {/* Chart Title */}
      <div className="h-5 bg-secondary-200 dark:bg-dark-700 rounded w-40 mb-6"></div>
      
      {type === 'bar' && (
        <div className="space-y-4">
          {/* Y-axis labels */}
          <div className="flex items-center gap-2">
            <div className="h-3 bg-secondary-200 dark:bg-dark-700 rounded w-8"></div>
            <div className="flex-1 h-32 flex items-end gap-2">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i}
                  className="flex-1 bg-secondary-200 dark:bg-dark-700 rounded-t"
                  style={{ height: `${Math.random() * 80 + 20}%` }}
                ></div>
              ))}
            </div>
          </div>
          {/* X-axis labels */}
          <div className="flex gap-2 pl-10">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex-1 h-3 bg-secondary-200 dark:bg-dark-700 rounded"></div>
            ))}
          </div>
        </div>
      )}
      
      {type === 'line' && (
        <div className="relative h-48">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-px bg-secondary-200 dark:bg-dark-700 w-full"></div>
            ))}
          </div>
          {/* Line placeholder */}
          <svg className="absolute inset-0 w-full h-full">
            <path
              d="M0,120 Q50,80 100,100 T200,60 T300,140 T400,80"
              stroke="#e2e8f0"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
            />
          </svg>
        </div>
      )}
      
      {type === 'pie' && (
        <div className="flex items-center justify-center h-48">
          <div className="relative w-32 h-32">
            {/* Circular segments */}
            <div className="absolute inset-0 border-8 border-secondary-200 dark:border-dark-700 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-transparent border-t-secondary-300 dark:border-t-dark-600 rounded-full animate-spin-slow"></div>
          </div>
          <div className="ml-8 space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 bg-secondary-200 dark:bg-dark-700 rounded"></div>
                <div className="h-3 bg-secondary-200 dark:bg-dark-700 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartSkeleton;