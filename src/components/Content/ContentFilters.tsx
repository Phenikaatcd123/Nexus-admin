import React, { useState } from 'react';
import { ContentCategory } from '../../types';
import './ContentFilters.css';

interface ContentFiltersProps {
  categories: ContentCategory[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  selectedStatus: string[];
  onStatusChange: (status: string[]) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onClearFilters: () => void;
}

const ContentFilters: React.FC<ContentFiltersProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  searchTerm,
  onSearchChange,
  onClearFilters
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter(c => c !== categoryId));
    } else {
      onCategoryChange([...selectedCategories, categoryId]);
    }
  };

  const handleStatusToggle = (status: string) => {
    if (selectedStatus.includes(status)) {
      onStatusChange(selectedStatus.filter(s => s !== status));
    } else {
      onStatusChange([...selectedStatus, status]);
    }
  };

  const activeFiltersCount = 
    selectedCategories.length + 
    selectedStatus.length + 
    (searchTerm ? 1 : 0);

  return (
    <div className="content-filters">
      <div className="filters-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>🔍 Lọc trang</h3>
        <div className="header-actions">
          {activeFiltersCount > 0 && (
            <span className="active-count">{activeFiltersCount}</span>
          )}
          <button className="expand-btn">
            {isExpanded ? '−' : '+'}
          </button>
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <div className="active-filters">
          <span>Bộ lọc đang áp dụng:</span>
          <button className="clear-all" onClick={onClearFilters}>
            Xóa tất cả
          </button>
        </div>
      )}

      {isExpanded && (
        <div className="filters-content">
          {/* Status Filter */}
          <div className="filter-section">
            <h4>Trạng thái</h4>
            <div className="filter-options">
              {[
                { value: 'PUBLISHED', label: 'Đã xuất bản', color: '#10b981' },
                { value: 'DRAFT', label: 'Bản nháp', color: '#f59e0b' },
                { value: 'ARCHIVED', label: 'Lưu trữ', color: '#6c757d' }
              ].map(status => (
                <label key={status.value} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedStatus.includes(status.value)}
                    onChange={() => handleStatusToggle(status.value)}
                  />
                  <span className="checkbox-text" style={{ color: status.color }}>
                    {status.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Categories Filter */}
          <div className="filter-section">
            <h4>Danh mục</h4>
            <div className="filter-options multi-select">
              {categories.map(category => (
                <label key={category.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                  />
                  <span className="checkbox-text">
                    {category.name}
                    <span className="category-count">({category.count})</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentFilters;