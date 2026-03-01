import React from 'react';
import { ContentPage } from '../../types';
import { formatDistanceToNow, format } from 'date-fns';
import { vi } from 'date-fns/locale';
import './ContentTable.css';

interface ContentTableProps {
  pages: ContentPage[];
  onEdit: (page: ContentPage) => void;
  onDelete: (pageId: string) => void;
  onDuplicate: (page: ContentPage) => void;
  onView: (page: ContentPage) => void;
  onStatusChange: (pageId: string, status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED') => void;
}

const ContentTable: React.FC<ContentTableProps> = ({
  pages,
  onEdit,
  onDelete,
  onDuplicate,
  onView,
  onStatusChange
}) => {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'PUBLISHED':
        return <span className="status-badge published">✅ Đã xuất bản</span>;
      case 'DRAFT':
        return <span className="status-badge draft">📝 Bản nháp</span>;
      case 'ARCHIVED':
        return <span className="status-badge archived">📦 Lưu trữ</span>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy HH:mm');
  };

  const getTimeAgo = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: vi });
  };

  const handleStatusChange = (pageId: string, currentStatus: string) => {
    let newStatus: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED' = 'DRAFT';
    
    if (currentStatus === 'PUBLISHED') newStatus = 'DRAFT';
    else if (currentStatus === 'DRAFT') newStatus = 'PUBLISHED';
    else newStatus = 'PUBLISHED';
    
    onStatusChange(pageId, newStatus);
  };

  return (
    <div className="content-table-container">
      <table className="content-table">
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Slug</th>
            <th>Danh mục</th>
            <th>Trạng thái</th>
            <th>Tác giả</th>
            <th>Cập nhật</th>
            <th>Lượt xem</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {pages.map(page => (
            <tr key={page.id}>
              <td>
                <div className="title-cell">
                  {page.featuredImage && (
                    <img src={page.featuredImage} alt="" className="thumbnail" />
                  )}
                  <div className="title-info">
                    <div className="title">{page.title}</div>
                    <div className="excerpt">{page.excerpt}</div>
                  </div>
                </div>
              </td>
              <td>
                <code className="slug">/{page.slug}</code>
              </td>
              <td>
                <div className="categories">
                  {page.categories.slice(0, 2).map(cat => (
                    <span key={cat} className="category-tag">{cat}</span>
                  ))}
                  {page.categories.length > 2 && (
                    <span className="category-more">+{page.categories.length - 2}</span>
                  )}
                </div>
              </td>
              <td>
                <div className="status-cell">
                  {getStatusBadge(page.status)}
                  <button
                    className="status-toggle"
                    onClick={() => handleStatusChange(page.id, page.status)}
                    title="Chuyển trạng thái"
                  >
                    🔄
                  </button>
                </div>
              </td>
              <td>
                <div className="author-info">
                  <div className="author-avatar">
                    {page.author.charAt(0)}
                  </div>
                  <span>{page.author}</span>
                </div>
              </td>
              <td>
                <div className="date-info">
                  <div className="date-full">{formatDate(page.updatedAt)}</div>
                  <div className="date-ago">{getTimeAgo(page.updatedAt)}</div>
                </div>
              </td>
              <td>
                <div className="views">
                  <span className="views-count">{page.views.toLocaleString()}</span>
                </div>
              </td>
              <td>
                <div className="actions">
                  <button className="action-btn view" onClick={() => onView(page)} title="Xem">👁️</button>
                  <button className="action-btn edit" onClick={() => onEdit(page)} title="Sửa">✏️</button>
                  <button className="action-btn copy" onClick={() => onDuplicate(page)} title="Nhân bản">📋</button>
                  <button className="action-btn delete" onClick={() => onDelete(page.id)} title="Xóa">🗑️</button>
                </div>
              </td>
            </tr>
          ))}
          {pages.length === 0 && (
            <tr>
              <td colSpan={8} className="no-results">
                <div className="no-results-content">
                  <span className="no-results-icon">📄</span>
                  <p>Không tìm thấy trang nào</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContentTable;