// src/components/Content/ContentPreview.tsx
import React from 'react';
import { ContentPage } from '../../types';
import './ContentPreview.css';

interface ContentPreviewProps {
  page: ContentPage;
  onClose: () => void;
  onEdit: () => void;
}

const ContentPreview: React.FC<ContentPreviewProps> = ({ page, onClose, onEdit }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="preview-overlay">
      <div className="preview-modal">
        <div className="preview-header">
          <h2>Xem trước: {page.title}</h2>
          <div className="preview-actions">
            <button className="edit-btn" onClick={onEdit}>
              ✏️ Chỉnh sửa
            </button>
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        <div className="preview-content">
          {page.featuredImage && (
            <div className="preview-image">
              <img src={page.featuredImage} alt={page.title} />
            </div>
          )}

          <div className="preview-meta">
            <div className="meta-item">
              <span className="meta-label">Trạng thái:</span>
              <span className={`meta-value status-${page.status.toLowerCase()}`}>
                {page.status === 'PUBLISHED' ? 'Đã xuất bản' : 
                 page.status === 'DRAFT' ? 'Bản nháp' : 'Lưu trữ'}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Tác giả:</span>
              <span className="meta-value">{page.author}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Ngày tạo:</span>
              <span className="meta-value">{formatDate(page.createdAt)}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Cập nhật:</span>
              <span className="meta-value">{formatDate(page.updatedAt)}</span>
            </div>
            {page.publishedAt && (
              <div className="meta-item">
                <span className="meta-label">Xuất bản:</span>
                <span className="meta-value">{formatDate(page.publishedAt)}</span>
              </div>
            )}
          </div>

          <div className="preview-body">
            <h1 className="preview-title">{page.title}</h1>
            {page.excerpt && (
              <div className="preview-excerpt">{page.excerpt}</div>
            )}
            <div 
              className="preview-html"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>

          <div className="preview-footer">
            <div className="preview-tags">
              {page.tags.map(tag => (
                <span key={tag} className="preview-tag">#{tag}</span>
              ))}
            </div>
            <div className="preview-views">
              👁️ {page.views.toLocaleString()} lượt xem
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPreview;