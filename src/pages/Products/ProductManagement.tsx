// src/pages/Products/ProductManagement.tsx
import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import ProductGrid from '../../components/Products/ProductGrid';
import ProductFilters from '../../components/Products/ProductFilters';
import ProductSort from '../../components/Products/ProductSort';
import AddProductModal from '../../components/Modals/AddProductModal';
import toast from 'react-hot-toast';
import './ProductManagement.css';

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [promotionType, setPromotionType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState<string>('newest');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Mock data - Giả lập dữ liệu từ API
  useEffect(() => {
    // Giả lập loading
    setTimeout(() => {
      const mockProducts: Product[] = generateMockProducts(50);
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  // Generate mock products
  const generateMockProducts = (count: number): Product[] => {
    const categories = ['Electronics', 'Accessories', 'Audio', 'Wearables', 'Home Appliances'];
    const brands = ['APPLE', 'SAMSUNG', 'SONY', 'LOGITECH', 'BOSE', 'DELL', 'HP'];
    const manufacturers = ['Apple Inc.', 'Samsung Electronics', 'Sony Corporation', 'Logitech Intl', 'Bose Corp'];
    
    const products: Product[] = [];
    
    for (let i = 1; i <= count; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const brand = brands[Math.floor(Math.random() * brands.length)];
      const basePrice = Math.floor(Math.random() * 2000) + 50;
      const costPrice = Math.floor(basePrice * 0.6);
      const discountPrice = Math.random() > 0.7 ? Math.floor(basePrice * 0.9) : undefined;
      const stock = Math.floor(Math.random() * 200);
      
      let status: 'IN STOCK' | 'LOW STOCK' | 'OUT OF STOCK' = 'IN STOCK';
      if (stock === 0) status = 'OUT OF STOCK';
      else if (stock < 10) status = 'LOW STOCK';
      
      products.push({
        id: i.toString(),
        name: `${brand} Product ${i}`,
        sku: `${brand.substring(0,3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
        barcode: Math.random() > 0.3 ? `890${Math.floor(1000000000 + Math.random() * 9000000000)}` : undefined,
        category,
        brand,
        manufacturer: manufacturers[Math.floor(Math.random() * manufacturers.length)],
        weight: `${(Math.random() * 5).toFixed(2)} kg`,
        dimensions: `${Math.floor(10 + Math.random() * 30)} x ${Math.floor(5 + Math.random() * 20)} x ${Math.floor(1 + Math.random() * 10)} cm`,
        description: `High-quality ${category.toLowerCase()} product from ${brand}. Perfect for everyday use.`,
        tags: generateRandomTags(),
        featured: Math.random() > 0.8,
        basePrice,
        costPrice,
        discountPrice,
        stock,
        lowStockAlert: 5,
        images: generateMockImages(i),
        status,
        createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        margin: ((basePrice - costPrice) / basePrice) * 100
      });
    }
    
    return products;
  };

  const generateRandomTags = (): string[] => {
    const allTags = ['new', 'sale', 'bestseller', 'limited', 'premium', 'budget', 'wireless', 'portable', 'gaming', 'professional'];
    const numTags = Math.floor(Math.random() * 4) + 1; // 1-4 tags
    const tags: string[] = [];
    for (let i = 0; i < numTags; i++) {
      const tag = allTags[Math.floor(Math.random() * allTags.length)];
      if (!tags.includes(tag)) tags.push(tag);
    }
    return tags;
  };

  const generateMockImages = (productId: number): { id: string; url: string; isPrimary: boolean; alt?: string }[] => {
    const images = [];
    const imageCount = Math.floor(Math.random() * 3) + 1; // 1-3 images
    
    for (let i = 0; i < imageCount; i++) {
      images.push({
        id: `img-${productId}-${i}`,
        url: `https://picsum.photos/200/200?random=${productId}${i}`,
        isPrimary: i === 0,
        alt: `Product image ${i + 1}`
      });
    }
    
    return images;
  };

  // Filter products
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Status filter
    if (selectedStatus.length > 0) {
      filtered = filtered.filter(p => selectedStatus.includes(p.status));
    }

    // Promotion filter
    if (promotionType === 'featured') {
      filtered = filtered.filter(p => p.featured);
    } else if (promotionType === 'discounted') {
      filtered = filtered.filter(p => p.discountPrice !== undefined);
    }

    // Price range filter
    filtered = filtered.filter(p => 
      p.basePrice >= priceRange.min && p.basePrice <= priceRange.max
    );

    // Sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price-low':
        filtered.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'stock-low':
        filtered.sort((a, b) => a.stock - b.stock);
        break;
      case 'stock-high':
        filtered.sort((a, b) => b.stock - a.stock);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, selectedStatus, promotionType, priceRange, sortBy, products]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Get unique categories for filter
  const categories = Array.from(new Set(products.map(p => p.category)));

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const productWithId: Product = {
      ...newProduct,
      id: (products.length + 1).toString(),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      margin: ((newProduct.basePrice - newProduct.costPrice) / newProduct.basePrice) * 100
    };
    setProducts([...products, productWithId]);
    toast.success('Product added successfully!');
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdateProduct = (updatedProduct: Omit<Product, 'id'>) => {
    if (editingProduct) {
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id ? { 
          ...updatedProduct, 
          id: editingProduct.id,
          createdAt: editingProduct.createdAt,
          updatedAt: new Date().toISOString().split('T')[0],
          margin: ((updatedProduct.basePrice - updatedProduct.costPrice) / updatedProduct.basePrice) * 100
        } : p
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
      toast.success('Product updated successfully!');
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
      toast.success('Product deleted successfully!');
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedStatus([]);
    setPromotionType('all');
    setPriceRange({ min: 0, max: 10000 });
    setSortBy('newest');
  };

  return (
    <div className="product-management">
      <div className="page-header">
        <div>
          <h1>Product Management</h1>
          <p className="subtitle">Comprehensive module for managing hardware inventory, pricing strategies, and SEO metadata.</p>
        </div>
        <button className="btn-primary" onClick={() => {
          setEditingProduct(null);
          setIsModalOpen(true);
        }}>
          + Add Product
        </button>
      </div>

      <div className="product-layout">
        {/* Filters Sidebar */}
        <div className="filters-sidebar">
          <ProductFilters
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            promotionType={promotionType}
            onPromotionChange={setPromotionType}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Main Content */}
        <div className="product-main">
          {/* Search and Sort Bar */}
          <div className="action-bar">
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search by Product Name, SKU, Brand, or Category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="clear-search" onClick={() => setSearchTerm('')}>✕</button>
              )}
            </div>
            
            <ProductSort
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          {/* Results Info */}
          <div className="results-info">
            <span>Showing {currentProducts.length} of {filteredProducts.length} products</span>
            {filteredProducts.length !== products.length && (
              <button className="reset-filters" onClick={handleClearFilters}>
                Reset Filters
              </button>
            )}
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : (
            <>
              <ProductGrid
                products={currentProducts}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    className="page-btn"
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    disabled={currentPage === 1}
                  >
                    ← Previous
                  </button>
                  <div className="page-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                      <button
                        key={number}
                        className={`page-number ${currentPage === number ? 'active' : ''}`}
                        onClick={() => setCurrentPage(number)}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                  <button 
                    className="page-btn"
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onAdd={handleAddProduct}
        onUpdate={handleUpdateProduct}
        editingProduct={editingProduct}
        categories={categories}
      />
    </div>
  );
};

export default ProductManagement;