import React from 'react';
import { ContentPage } from '../../types';
import './ContentStats.css';

interface ContentStatsProps {
  pages: ContentPage[];
}

const ContentStats: React.FC<ContentStatsProps> = ({ pages }) => {
  const totalPages = pages.length;
  const publishedPages = pages.filter(p => p.status === 'PUBLISHED').length;
  const draftPages = pages.filter(p => p.status === 'DRAFT').length;
  const archivedPages = pages.filter(p => p.status === 'ARCHIVED').length;
  const totalViews = pages.reduce((sum, p) => sum + p.views, 0);

  return (
    <div className="content-stats">
      <div className="stat-item">
        <div className="stat-icon">📄</div>
        <div className="stat-info">
          <div className="stat-value">{totalPages}</div>
          <div className="stat-label">Tổng số trang</div>
        </div>
      </div>
      
      <div className="stat-item published">
        <div className="stat-icon">✅</div>
        <div className="stat-info">
          <div className="stat-value">{publishedPages}</div>
          <div className="stat-label">Đã xuất bản</div>
        </div>
      </div>
      
      <div className="stat-item draft">
        <div className="stat-icon">📝</div>
        <div className="stat-info">
          <div className="stat-value">{draftPages}</div>
          <div className="stat-label">Bản nháp</div>
        </div>
      </div>
      
      <div className="stat-item archived">
        <div className="stat-icon">📦</div>
        <div className="stat-info">
          <div className="stat-value">{archivedPages}</div>
          <div className="stat-label">Lưu trữ</div>
        </div>
      </div>
      
      <div className="stat-item views">
        <div className="stat-icon">👁️</div>
        <div className="stat-info">
          <div className="stat-value">{totalViews.toLocaleString()}</div>
          <div className="stat-label">Lượt xem</div>
        </div>
      </div>
    </div>
  );
};

export default ContentStats;