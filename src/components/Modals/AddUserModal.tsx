// src/components/Modals/AddUserModal.tsx
import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import './AddUserModal.css';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (user: Omit<User, 'id'>) => void;
  onUpdate?: (user: Omit<User, 'id'>) => void;
  editingUser?: User | null;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  editingUser
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'ADMIN' as 'SUPER ADMIN' | 'ADMIN',
    status: 'Active' as 'Active' | 'Inactive'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isGeneratingPassword, setIsGeneratingPassword] = useState(false);

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        email: editingUser.email,
        password: '', // Không hiển thị password khi edit
        role: editingUser.role as 'SUPER ADMIN' | 'ADMIN',
        status: editingUser.status
      });
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'ADMIN',
        status: 'Active'
      });
    }
    setErrors({});
    setShowPassword(false);
  }, [editingUser, isOpen]);

  // Hàm tạo mật khẩu ngẫu nhiên
  const generatePassword = () => {
    setIsGeneratingPassword(true);
    
    // Giả lập delay để tạo hiệu ứng
    setTimeout(() => {
      const length = 12;
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
      let password = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      
      // Đảm bảo có ít nhất 1 ký tự đặc biệt, 1 số, 1 chữ hoa, 1 chữ thường
      if (!/[!@#$%^&*]/.test(password)) {
        password = password.slice(0, -1) + '@';
      }
      if (!/[0-9]/.test(password)) {
        password = password.slice(0, -1) + '9';
      }
      if (!/[A-Z]/.test(password)) {
        password = password.slice(0, -1) + 'A';
      }
      if (!/[a-z]/.test(password)) {
        password = password.slice(0, -1) + 'a';
      }
      
      setFormData({ ...formData, password });
      setIsGeneratingPassword(false);
    }, 300);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!editingUser && !formData.password) {
      newErrors.password = 'Password is required for new users';
    } else if (!editingUser && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
      ...(formData.password && { password: formData.password }) // Chỉ gửi password nếu có
    };

    if (editingUser && onUpdate) {
      onUpdate(userData);
    } else {
      onAdd(userData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{editingUser ? 'Edit User' : 'Create New User'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Full Name <span className="required">*</span></label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter full name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Email Address <span className="required">*</span></label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter email address"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {!editingUser && (
              <div className="form-group">
                <label>Password <span className="required">*</span></label>
                <div className="password-input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Enter password"
                    className={errors.password ? 'error' : ''}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                  <button
                    type="button"
                    className="generate-password"
                    onClick={generatePassword}
                    disabled={isGeneratingPassword}
                    title="Generate secure password"
                  >
                    {isGeneratingPassword ? '⏳' : '🔑'}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
                <small className="password-hint">
                  Password must be at least 8 characters
                </small>
              </div>
            )}

            <div className="form-group">
              <label>Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value as 'SUPER ADMIN' | 'ADMIN'})}
              >
                <option value="SUPER ADMIN">Super Admin</option>
                <option value="ADMIN">Admin</option>
              </select>
              <small className="role-hint">
                {formData.role === 'SUPER ADMIN' 
                  ? 'Full system access with all permissions' 
                  : 'Limited access for staff management'}
              </small>
            </div>

            {editingUser && (
              <div className="form-group">
                <label>Status</label>
                <div className="status-toggle">
                  <label className="toggle-label">
                    <input
                      type="radio"
                      value="Active"
                      checked={formData.status === 'Active'}
                      onChange={(e) => setFormData({...formData, status: e.target.value as 'Active'})}
                    />
                    <span className="toggle-option active">Active</span>
                  </label>
                  <label className="toggle-label">
                    <input
                      type="radio"
                      value="Inactive"
                      checked={formData.status === 'Inactive'}
                      onChange={(e) => setFormData({...formData, status: e.target.value as 'Inactive'})}
                    />
                    <span className="toggle-option inactive">Inactive</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingUser ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;