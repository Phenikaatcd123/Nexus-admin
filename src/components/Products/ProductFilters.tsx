import React, { useState } from 'react';
import './ProductFilters.css';

interface ProductFiltersProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  selectedStatus: string[];
  onStatusChange: (status: string[]) => void;
  promotionType: string;
  onPromotionChange: (type: string) => void;
  priceRange: { min: number; max: number };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  onClearFilters: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  promotionType,
  onPromotionChange,
  priceRange,
  onPriceRangeChange,
  onClearFilters
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [minPrice, setMinPrice] = useState(priceRange.min.toString());
  const [maxPrice, setMaxPrice] = useState(priceRange.max.toString());

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const handleStatusToggle = (status: string) => {
    if (selectedStatus.includes(status)) {
      onStatusChange(selectedStatus.filter(s => s !== status));
    } else {
      onStatusChange([...selectedStatus, status]);
    }
  };

  const handlePriceApply = () => {
    const min = parseInt(minPrice) || 0;
    const max = parseInt(maxPrice) || 10000;
    onPriceRangeChange({ min, max });
  };

  const activeFiltersCount = 
    selectedCategories.length + 
    selectedStatus.length + 
    (promotionType !== 'all' ? 1 : 0) +
    (priceRange.min > 0 || priceRange.max < 10000 ? 1 : 0);

  return (
    <div className="product-filters">
      <div className="filters-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>Filters</h3>
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
          <span>Active filters:</span>
          <button className="clear-all" onClick={onClearFilters}>
            Clear all
          </button>
        </div>
      )}

      {isExpanded && (
        <div className="filters-content">
          {/* Category Filter */}
          <div className="filter-section">
            <h4>Category</h4>
            <div className="filter-options multi-select">
              {categories.map(category => (
                <label key={category} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                  />
                  <span className="checkbox-text">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="filter-section">
            <h4>Status</h4>
            <div className="filter-options">
              {['IN STOCK', 'LOW STOCK', 'OUT OF STOCK'].map(status => (
                <label key={status} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedStatus.includes(status)}
                    onChange={() => handleStatusToggle(status)}
                  />
                  <span className={`checkbox-text status-${status.toLowerCase().replace(' ', '-')}`}>
                    {status}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Promotion Filter */}
          <div className="filter-section">
            <h4>Promotion</h4>
            <div className="filter-options">
              {[
                { value: 'all', label: 'All Products' },
                { value: 'featured', label: 'Featured Only' },
                { value: 'discounted', label: 'Discounted Only' }
              ].map(option => (
                <label key={option.value} className="radio-label">
                  <input
                    type="radio"
                    name="promotion"
                    value={option.value}
                    checked={promotionType === option.value}
                    onChange={(e) => onPromotionChange(e.target.value)}
                  />
                  <span className="radio-text">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-section">
            <h4>Price Range ($)</h4>
            <div className="price-range">
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  min="0"
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  min="0"
                />
              </div>
              <button className="apply-price" onClick={handlePriceApply}>
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;