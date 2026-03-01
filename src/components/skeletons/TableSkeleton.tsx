import React from 'react';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ 
  rows = 5, 
  columns = 4 
}) => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm animate-pulse">
      {/* Table Header */}
      <div className="p-4 border-b border-secondary-200 dark:border-dark-700">
        <div className="h-6 bg-secondary-200 dark:bg-dark-700 rounded w-48"></div>
      </div>
      
      {/* Table Body */}
      <div className="p-4">
        {/* Column Headers */}
        <div className="flex gap-4 mb-4 pb-2 border-b border-secondary-200 dark:border-dark-700">
          {[...Array(columns)].map((_, i) => (
            <div key={i} className="h-4 bg-secondary-200 dark:bg-dark-700 rounded w-24"></div>
          ))}
        </div>
        
        {/* Table Rows */}
        {[...Array(rows)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-4 mb-3">
            {[...Array(columns)].map((_, colIndex) => (
              <div 
                key={colIndex} 
                className="h-4 bg-secondary-200 dark:bg-dark-700 rounded"
                style={{ width: `${Math.random() * 30 + 20}%` }}
              ></div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Table Footer/Pagination */}
      <div className="p-4 border-t border-secondary-200 dark:border-dark-700">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-secondary-200 dark:bg-dark-700 rounded w-32"></div>
          <div className="flex gap-2">
            <div className="h-8 bg-secondary-200 dark:bg-dark-700 rounded w-20"></div>
            <div className="h-8 bg-secondary-200 dark:bg-dark-700 rounded w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;