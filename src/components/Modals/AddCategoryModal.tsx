// src/components/Modals/AddCategoryModal.tsx
import React, { useState, useEffect } from 'react';
import { Category } from '../../types';
import './AddCategoryModal.css';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (category: Omit<Category, 'id'>) => void;
  onUpdate?: (category: Omit<Category, 'id'>) => void;
  editingCategory?: Category | null;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  editingCategory
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    products: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name,
        description: editingCategory.description,
        products: editingCategory.products
      });
    } else {
      setFormData({ name: '', description: '', products: 0 });
    }
    setErrors({});
  }, [editingCategory]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    }
    if (formData.products < 0) {
      newErrors.products = 'Product count cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (editingCategory && onUpdate) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Category Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter category name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter category description"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Number of Products</label>
              <input
                type="number"
                min="0"
                value={formData.products}
                onChange={(e) => setFormData({...formData, products: parseInt(e.target.value) || 0})}
                placeholder="0"
                className={errors.products ? 'error' : ''}
              />
              {errors.products && <span className="error-message">{errors.products}</span>}
              <small className="help-text">This will be updated automatically based on products in this category</small>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingCategory ? 'Update Category' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;