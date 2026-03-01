import React from 'react';
import { Product } from '../../types';
import ProductCard from '../../components/Cards/ProductCard';
import './ProductGrid.css';

interface ProductGridProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onEdit, onDelete }) => {
  if (products.length === 0) {
    return (
      <div className="no-products">
        <div className="no-products-icon">📦</div>
        <h3>No products found</h3>
        <p>Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={() => onEdit(product)}
          onDelete={() => onDelete(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;