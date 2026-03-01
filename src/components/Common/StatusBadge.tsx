import React from 'react';

interface StatusBadgeProps {
  status: 'Active' | 'Inactive' | 'IN STOCK' | 'LOW STOCK' | 'OUT OF STOCK';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span className={`status-badge ${status.toLowerCase().replace(' ', '-')}`}>
      {status}
    </span>
  );
};

export default StatusBadge;