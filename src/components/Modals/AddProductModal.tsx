// src/components/Modals/AddProductModal.tsx
import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import './AddProductModal.css';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Omit<Product, 'id'>) => void;
  onUpdate?: (product: Omit<Product, 'id'>) => void;
  editingProduct?: Product | null;
  categories: string[];
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  editingProduct,
  categories
}) => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    barcode: '',
    category: '',
    brand: '',
    manufacturer: '',
    weight: '',
    dimensions: '',
    description: '',
    tags: [] as string[],
    featured: false,
    basePrice: 0,
    costPrice: 0,
    discountPrice: undefined as number | undefined,
    stock: 0,
    lowStockAlert: 5,
    images: [] as { id: string; url: string; isPrimary: boolean; alt?: string }[],
    status: 'IN STOCK' as 'IN STOCK' | 'LOW STOCK' | 'OUT OF STOCK'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        sku: editingProduct.sku,
        barcode: editingProduct.barcode || '',
        category: editingProduct.category,
        brand: editingProduct.brand,
        manufacturer: editingProduct.manufacturer,
        weight: editingProduct.weight || '',
        dimensions: editingProduct.dimensions || '',
        description: editingProduct.description || '',
        tags: editingProduct.tags,
        featured: editingProduct.featured,
        basePrice: editingProduct.basePrice,
        costPrice: editingProduct.costPrice,
        discountPrice: editingProduct.discountPrice,
        stock: editingProduct.stock,
        lowStockAlert: editingProduct.lowStockAlert,
        images: editingProduct.images,
        status: editingProduct.status
      });
    } else {
      setFormData({
        name: '',
        sku: '',
        barcode: '',
        category: categories[0] || '',
        brand: '',
        manufacturer: '',
        weight: '',
        dimensions: '',
        description: '',
        tags: [],
        featured: false,
        basePrice: 0,
        costPrice: 0,
        discountPrice: undefined,
        stock: 0,
        lowStockAlert: 5,
        images: [],
        status: 'IN STOCK'
      });
    }
    setErrors({});
    setActiveTab('general');
  }, [editingProduct, categories, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required';
    } else if (!/^[A-Z]{3}-\d{3}-[A-Z]{2}$/.test(formData.sku)) {
      newErrors.sku = 'SKU must be in format: XXX-000-XX (e.g., APL-123-MB)';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand is required';
    }
    if (!formData.manufacturer.trim()) {
      newErrors.manufacturer = 'Manufacturer is required';
    }
    if (formData.basePrice <= 0) {
      newErrors.basePrice = 'Base price must be greater than 0';
    }
    if (formData.costPrice <= 0) {
      newErrors.costPrice = 'Cost price must be greater than 0';
    }
    if (formData.costPrice >= formData.basePrice) {
      newErrors.costPrice = 'Cost price must be less than base price';
    }
    if (formData.discountPrice) {
      if (formData.discountPrice >= formData.basePrice) {
        newErrors.discountPrice = 'Discount price must be less than base price';
      }
      if (formData.discountPrice <= formData.costPrice) {
        newErrors.discountPrice = 'Discount price must be greater than cost price';
      }
    }
    if (formData.stock < 0) {
      newErrors.stock = 'Stock cannot be negative';
    }
    if (formData.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    } else if (formData.tags.length > 8) {
      newErrors.tags = 'Maximum 8 tags allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Auto-set status based on stock
    let status = formData.status;
    if (formData.stock === 0) {
      status = 'OUT OF STOCK';
    } else if (formData.stock < formData.lowStockAlert) {
      status = 'LOW STOCK';
    } else {
      status = 'IN STOCK';
    }

    const productData = {
      ...formData,
      status,
      basePrice: Number(formData.basePrice),
      costPrice: Number(formData.costPrice),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
      stock: Number(formData.stock),
      lowStockAlert: Number(formData.lowStockAlert),
      tags: formData.tags
    };

    if (editingProduct && onUpdate) {
  // Thêm createdAt và updatedAt khi update
  const productWithDates = {
    ...productData,
    createdAt: editingProduct.createdAt,
    updatedAt: new Date().toISOString().split('T')[0]
  };
  onUpdate(productWithDates);
} else {
  // Thêm createdAt và updatedAt khi tạo mới
  const productWithDates = {
    ...productData,
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  };
  onAdd(productWithDates);
}
    onClose();
  };

  const handleStockChange = (value: number) => {
    const stock = value;
    let status = formData.status;
    
    if (stock === 0) {
      status = 'OUT OF STOCK';
    } else if (stock < formData.lowStockAlert) {
      status = 'LOW STOCK';
    } else {
      status = 'IN STOCK';
    }

    setFormData({ ...formData, stock, status });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && formData.tags.length < 8) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim().toLowerCase()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const calculateMargin = () => {
    if (formData.basePrice && formData.costPrice) {
      return ((formData.basePrice - formData.costPrice) / formData.basePrice * 100).toFixed(1);
    }
    return '0.0';
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-xl">
        <div className="modal-header">
          <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-tabs">
          <button 
            className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            General Info
          </button>
          <button 
            className={`tab-btn ${activeTab === 'pricing' ? 'active' : ''}`}
            onClick={() => setActiveTab('pricing')}
          >
            Pricing & Inventory
          </button>
          <button 
            className={`tab-btn ${activeTab === 'media' ? 'active' : ''}`}
            onClick={() => setActiveTab('media')}
          >
            Media
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* General Info Tab */}
            {activeTab === 'general' && (
              <div className="tab-content">
                <div className="form-row">
                  <div className="form-group">
                    <label>Product Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter product name"
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label>SKU * (XXX-000-XX)</label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => setFormData({...formData, sku: e.target.value.toUpperCase()})}
                      placeholder="APL-123-MB"
                      className={errors.sku ? 'error' : ''}
                    />
                    {errors.sku && <span className="error-message">{errors.sku}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Barcode / EAN</label>
                    <input
                      type="text"
                      value={formData.barcode}
                      onChange={(e) => setFormData({...formData, barcode: e.target.value})}
                      placeholder="Enter barcode"
                    />
                  </div>

                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className={errors.category ? 'error' : ''}
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errors.category && <span className="error-message">{errors.category}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Brand *</label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      placeholder="Enter brand"
                      className={errors.brand ? 'error' : ''}
                    />
                    {errors.brand && <span className="error-message">{errors.brand}</span>}
                  </div>

                  <div className="form-group">
                    <label>Manufacturer *</label>
                    <input
                      type="text"
                      value={formData.manufacturer}
                      onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                      placeholder="Enter manufacturer"
                      className={errors.manufacturer ? 'error' : ''}
                    />
                    {errors.manufacturer && <span className="error-message">{errors.manufacturer}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Weight</label>
                    <input
                      type="text"
                      value={formData.weight}
                      onChange={(e) => setFormData({...formData, weight: e.target.value})}
                      placeholder="e.g., 1.5 kg"
                    />
                  </div>

                  <div className="form-group">
                    <label>Dimensions</label>
                    <input
                      type="text"
                      value={formData.dimensions}
                      onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
                      placeholder="e.g., 20 x 15 x 5 cm"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Enter product description"
                    rows={4}
                  />
                </div>

                <div className="form-group">
                  <label>Tags * (Min 1, Max 8)</label>
                  <div className="tags-input">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add tag and press Enter"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    />
                    <button type="button" onClick={handleAddTag}>Add</button>
                  </div>
                  {errors.tags && <span className="error-message">{errors.tags}</span>}
                  <div className="tags-list">
                    {formData.tags.map(tag => (
                      <span key={tag} className="tag">
                        #{tag}
                        <button type="button" onClick={() => handleRemoveTag(tag)}>×</button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    />
                    <span>Featured Product (Highlights product in store)</span>
                  </label>
                </div>
              </div>
            )}

            {/* Pricing & Inventory Tab */}
            {activeTab === 'pricing' && (
              <div className="tab-content">
                <div className="form-row">
                  <div className="form-group">
                    <label>Base Price ($) *</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.basePrice}
                      onChange={(e) => setFormData({...formData, basePrice: parseFloat(e.target.value)})}
                      placeholder="0.00"
                      className={errors.basePrice ? 'error' : ''}
                    />
                    {errors.basePrice && <span className="error-message">{errors.basePrice}</span>}
                  </div>

                  <div className="form-group">
                    <label>Cost Price ($) *</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.costPrice}
                      onChange={(e) => setFormData({...formData, costPrice: parseFloat(e.target.value)})}
                      placeholder="0.00"
                      className={errors.costPrice ? 'error' : ''}
                    />
                    {errors.costPrice && <span className="error-message">{errors.costPrice}</span>}
                  </div>
                </div>

                <div className="margin-display">
                  <span className="margin-label">Profit Margin:</span>
                  <span className={`margin-value ${parseFloat(calculateMargin()) > 30 ? 'high' : parseFloat(calculateMargin()) > 15 ? 'medium' : 'low'}`}>
                    {calculateMargin()}%
                  </span>
                </div>

                <div className="form-group">
                  <label>Discount Price ($) (Optional)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.discountPrice || ''}
                    onChange={(e) => setFormData({...formData, discountPrice: e.target.value ? parseFloat(e.target.value) : undefined})}
                    placeholder="0.00"
                    className={errors.discountPrice ? 'error' : ''}
                  />
                  {errors.discountPrice && <span className="error-message">{errors.discountPrice}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Stock Units *</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) => handleStockChange(parseInt(e.target.value))}
                      placeholder="0"
                      className={errors.stock ? 'error' : ''}
                    />
                    {errors.stock && <span className="error-message">{errors.stock}</span>}
                  </div>

                  <div className="form-group">
                    <label>Low Stock Alert Level</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.lowStockAlert}
                      onChange={(e) => setFormData({...formData, lowStockAlert: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <div className="status-indicator">
                    <span className={`status-badge ${formData.status.toLowerCase().replace(' ', '-')}`}>
                      {formData.status}
                    </span>
                    <small>(Auto-calculated based on stock)</small>
                  </div>
                </div>
              </div>
            )}

            {/* Media Tab */}
            {activeTab === 'media' && (
              <div className="tab-content">
                <div className="media-upload">
                  <p>Media upload functionality will be implemented here</p>
                  <p className="note">(For demo purposes, images are auto-generated)</p>
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingProduct ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;