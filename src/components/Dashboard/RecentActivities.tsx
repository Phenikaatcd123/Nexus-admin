import React from 'react';
import { RecentActivity } from '../../types/dashboard';
import './RecentActivities.css';

interface RecentActivitiesProps {
  activities: RecentActivity[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'user': return '👤';
      case 'order': return '🛒';
      case 'product': return '📦';
      case 'review': return '⭐';
      default: return '📝';
    }
  };

  const getActivityColor = (type: string) => {
    switch(type) {
      case 'user': return '#667eea';
      case 'order': return '#10b981';
      case 'product': return '#f59e0b';
      case 'review': return '#ef4444';
      default: return '#6c757d';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    return `${diffDays} ngày trước`;
  };

  return (
    <div className="recent-activities">
      <div className="widget-header">
        <h3>⏱️ Hoạt động gần đây</h3>
        <button className="view-all">Xem tất cả →</button>
      </div>

      <div className="activities-list">
        {activities.map(activity => (
          <div key={activity.id} className="activity-item">
            <div 
              className="activity-icon"
              style={{ background: `${getActivityColor(activity.type)}20` }}
            >
              {getActivityIcon(activity.type)}
            </div>
            <div className="activity-content">
              <div className="activity-header">
                <span className="activity-user">{activity.user}</span>
                <span className="activity-time">{formatTime(activity.timestamp)}</span>
              </div>
              <div className="activity-details">{activity.details}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;