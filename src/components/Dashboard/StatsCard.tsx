import React from 'react';
import './StatsCard.css';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: string;
  trend?: number;
  prefix?: string;
  suffix?: string;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  prefix = '', 
  suffix = '',
  color = '#667eea'
}) => {
  const formatValue = (val: number | string) => {
    if (typeof val === 'number') {
      return new Intl.NumberFormat().format(val);
    }
    return val;
  };

  return (
    <div className="stats-card" style={{ borderLeftColor: color }}>
      <div className="stats-icon" style={{ background: `${color}20`, color }}>
        {icon}
      </div>
      <div className="stats-content">
        <div className="stats-title">{title}</div>
        <div className="stats-value">
          {prefix}{formatValue(value)}{suffix}
        </div>
        {trend !== undefined && (
          <div className={`stats-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
            <span className="trend-label">vs tháng trước</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;