import React from 'react';
import CardSkeleton from './CardSkeleton';
import ChartSkeleton from './ChartSkeleton';
import TableSkeleton from './TableSkeleton';

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[...Array(4)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartSkeleton type="bar" />
        <ChartSkeleton type="line" />
      </div>
      
      {/* Table */}
      <TableSkeleton rows={5} columns={5} />
    </div>
  );
};

export default DashboardSkeleton;