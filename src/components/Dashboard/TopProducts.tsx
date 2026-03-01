import React from 'react';
import { TopProduct } from '../../types/dashboard';
import './TopProducts.css';

interface TopProductsProps {
  products: TopProduct[];
}

const TopProducts: React.FC<TopProductsProps> = ({ products }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(value);
  };

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getTrendClass = (trend: string) => {
    switch(trend) {
      case 'up': return 'trend-up';
      case 'down': return 'trend-down';
      default: return 'trend-stable';
    }
  };

  return (
    <div className="top-products">
      <div className="widget-header">
        <h3>🔥 Top sản phẩm bán chạy</h3>
        <button className="view-all">Xem tất cả →</button>
      </div>
      
      <div className="products-list">
        {products.map((product, index) => (
          <div key={product.id} className="product-item">
            <div className="product-rank">#{index + 1}</div>
            <div className="product-image">
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <div className="no-image">📦</div>
              )}
            </div>
            <div className="product-info">
              <div className="product-name">{product.name}</div>
              <div className="product-stats">
                <span className="product-sales">{product.sales} đơn</span>
                <span className="product-revenue">{formatCurrency(product.revenue)}</span>
              </div>
            </div>
            <div className={`product-trend ${getTrendClass(product.trend)}`}>
              {getTrendIcon(product.trend)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;