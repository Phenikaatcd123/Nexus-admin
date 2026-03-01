// src/pages/Categories/CategoryManagement.tsx
import React, { useState } from 'react';
import { mockCategories } from '../../data/mockData';
import { Category } from '../../types';
import AddCategoryModal from '../../components/Modals/AddCategoryModal';
import toast from 'react-hot-toast';
import './CategoryManagement.css';

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleAddCategory = (newCategory: Omit<Category, 'id'>) => {
    const categoryWithId = {
      ...newCategory,
      id: (categories.length + 1).toString()
    };
    setCategories([...categories, categoryWithId]);
    toast.success('Category added successfully!');
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleUpdateCategory = (updatedCategory: Omit<Category, 'id'>) => {
    if (editingCategory) {
      const updatedCategories = categories.map(c => 
        c.id === editingCategory.id ? { ...updatedCategory, id: editingCategory.id } : c
      );
      setCategories(updatedCategories);
      setEditingCategory(null);
      toast.success('Category updated successfully!');
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c.id !== categoryId));
      toast.success('Category deleted successfully!');
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="category-management">
      <div className="page-header">
        <div>
          <h1>Category Management</h1>
          <p className="subtitle">System management and detailed overview.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          + Add Category
        </button>
      </div>

      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>CATEGORY NAME</th>
              <th>DESCRIPTION</th>
              <th>PRODUCTS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map(category => (
              <tr key={category.id}>
                <td>
                  <div className="category-name">{category.name}</div>
                </td>
                <td>{category.description}</td>
                <td>
                  <span className="product-count">{category.products} Items</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="icon-btn" onClick={() => handleEditCategory(category)}>✏️</button>
                    <button className="icon-btn" onClick={() => handleDeleteCategory(category.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        onAdd={handleAddCategory}
        onUpdate={handleUpdateCategory}
        editingCategory={editingCategory}
      />
    </div>
  );
};

export default CategoryManagement;