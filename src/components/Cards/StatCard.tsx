// src/components/Cards/StatCard.tsx
import React from 'react';
import './StatCard.css';

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h4 className="stat-title">{title}</h4>
        <div className="stat-value">
          <span className="value">{value}</span>
          {trend && <span className="trend">{trend}</span>}
        </div>
      </div>
    </div>
  );
};

export default StatCard;