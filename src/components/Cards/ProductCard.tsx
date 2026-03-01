import React from 'react';
import { Product } from '../../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const getStatusClass = (status: string) => {
    switch(status) {
      case 'IN STOCK': return 'status-in-stock';
      case 'LOW STOCK': return 'status-low-stock';
      case 'OUT OF STOCK': return 'status-out-of-stock';
      default: return '';
    }
  };

  const getMarginClass = (margin?: number) => {
    if (!margin) return '';
    if (margin > 30) return 'margin-high';
    if (margin > 15) return 'margin-medium';
    return 'margin-low';
  };

  const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];

  return (
    <div className="product-card">
      {/* Image container */}
      <div className="product-image-container">
        {primaryImage ? (
          <img 
            src={primaryImage.url} 
            alt={primaryImage.alt || product.name} 
            className="product-image"
          />
        ) : (
          <div className="no-image">
            📷
          </div>
        )}
        
        {/* Featured badge */}
        {product.featured && (
          <div className="featured-badge">
            ⭐ FEATURED
          </div>
        )}
        
        {/* Status badge */}
        <div className={`product-status ${getStatusClass(product.status)}`}>
          {product.status}
        </div>
        
        {/* Action buttons */}
        <div className="product-actions">
          <button 
            className="action-btn edit" 
            onClick={onEdit}
            title="Edit product"
          >
            ✏️
          </button>
          <button 
            className="action-btn delete" 
            onClick={onDelete}
            title="Delete product"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="product-info">
        <h3 className="product-name" title={product.name}>
          {product.name}
        </h3>
        
        <div className="product-sku">
          SKU: {product.sku}
        </div>

        {/* Brand and category */}
        <div className="product-brand-category">
          <span className="product-brand">{product.brand}</span>
          <span className="product-category">{product.category}</span>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="product-tags">
            {product.tags.slice(0, 3).map(tag => (
              <span key={tag} className="product-tag">
                #{tag}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="product-tag">
                +{product.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Price section */}
        <div className="product-price-section">
          {product.discountPrice ? (
            <>
              <span className="old-price">${product.basePrice}</span>
              <span className="discount-price">${product.discountPrice}</span>
            </>
          ) : (
            <span className="current-price">${product.basePrice}</span>
          )}
        </div>

        {/* Stock and margin */}
        <div className="product-stats">
          <div className="stock-info">
            <span className="stock-label">Stock:</span>
            <span className={`stock-value ${product.stock < product.lowStockAlert ? 'low' : ''}`}>
              {product.stock} units
            </span>
          </div>
          
          {product.margin && (
            <div className={`margin-badge ${getMarginClass(product.margin)}`}>
              {product.margin.toFixed(1)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;