// src/pages/Users/UserManagement.tsx
import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import AddUserModal from '../../components/Modals/AddUserModal';
import DeleteConfirmModal from '../../components/Modals/DeleteConfirmModal';
import toast from 'react-hot-toast';
import './UserManagement.css';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Lấy thông tin user hiện tại (đang đăng nhập)
  const currentUsername = localStorage.getItem('username') || '';
  const currentUserRole = localStorage.getItem('userRole') || '';

  // Mock data - Giả lập dữ liệu từ API
  useEffect(() => {
    // Giả lập dữ liệu users
    const mockUsers: User[] = [
      { 
        id: '1', 
        name: 'Alex Thompson', 
        email: 'alex@nexus.com', 
        role: 'SUPER ADMIN', 
        status: 'Active',
        avatar: 'AT',
        createdAt: '2024-01-15',
        lastLogin: '2024-03-20'
      },
      { 
        id: '2', 
        name: 'Sarah Miller', 
        email: 'sarah@nexus.com', 
        role: 'ADMIN', 
        status: 'Inactive',
        avatar: 'SM',
        createdAt: '2024-02-01',
        lastLogin: '2024-03-18'
      },
      { 
        id: '3', 
        name: 'John Doe', 
        email: 'john@nexus.com', 
        role: 'ADMIN', 
        status: 'Active',
        avatar: 'JD',
        createdAt: '2024-01-20',
        lastLogin: '2024-03-19'
      },
      { 
        id: '4', 
        name: 'Emma Wilson', 
        email: 'emma@nexus.com', 
        role: 'SUPER ADMIN', 
        status: 'Active',
        avatar: 'EW',
        createdAt: '2024-01-10',
        lastLogin: '2024-03-20'
      },
      { 
        id: '5', 
        name: 'Michael Brown', 
        email: 'michael@nexus.com', 
        role: 'ADMIN', 
        status: 'Active',
        avatar: 'MB',
        createdAt: '2024-02-15',
        lastLogin: '2024-03-17'
      },
      { 
        id: '6', 
        name: 'Lisa Anderson', 
        email: 'lisa@nexus.com', 
        role: 'ADMIN', 
        status: 'Active',
        avatar: 'LA',
        createdAt: '2024-02-20',
        lastLogin: '2024-03-16'
      },
      { 
        id: '7', 
        name: 'David Chen', 
        email: 'david@nexus.com', 
        role: 'SUPER ADMIN', 
        status: 'Active',
        avatar: 'DC',
        createdAt: '2024-01-05',
        lastLogin: '2024-03-15'
      },
      { 
        id: '8', 
        name: 'Jennifer Lee', 
        email: 'jennifer@nexus.com', 
        role: 'ADMIN', 
        status: 'Inactive',
        avatar: 'JL',
        createdAt: '2024-03-01',
        lastLogin: '2024-03-10'
      },
      { 
        id: '9', 
        name: 'Robert Taylor', 
        email: 'robert@nexus.com', 
        role: 'ADMIN', 
        status: 'Active',
        avatar: 'RT',
        createdAt: '2024-02-10',
        lastLogin: '2024-03-14'
      },
      { 
        id: '10', 
        name: 'Maria Garcia', 
        email: 'maria@nexus.com', 
        role: 'ADMIN', 
        status: 'Active',
        avatar: 'MG',
        createdAt: '2024-02-25',
        lastLogin: '2024-03-13'
      },
      { 
        id: '11', 
        name: 'James Wilson', 
        email: 'james@nexus.com', 
        role: 'SUPER ADMIN', 
        status: 'Active',
        avatar: 'JW',
        createdAt: '2024-01-18',
        lastLogin: '2024-03-12'
      },
      { 
        id: '12', 
        name: 'Patricia Moore', 
        email: 'patricia@nexus.com', 
        role: 'ADMIN', 
        status: 'Active',
        avatar: 'PM',
        createdAt: '2024-03-05',
        lastLogin: '2024-03-11'
      },
    ];
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  // Xử lý tìm kiếm
  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
  }, [searchTerm, users]);

  // Lấy users cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Kiểm tra có thể xóa user không
  const canDeleteUser = (user: User) => {
    // Super Admin không thể tự xóa chính mình
    if (user.name === currentUsername && user.role === 'SUPER ADMIN') {
      return { allowed: false, reason: 'You cannot delete yourself' };
    }
    // Super Admin không thể bị xóa bởi người khác
    if (user.role === 'SUPER ADMIN' && currentUserRole !== 'SUPER ADMIN') {
      return { allowed: false, reason: 'Super Admin users cannot be deleted' };
    }
    return { allowed: true, reason: '' };
  };

  const handleAddUser = (newUser: Omit<User, 'id'>) => {
    const userWithId: User = {
      ...newUser,
      id: (users.length + 1).toString(),
      avatar: newUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: '-',
      status: newUser.status as 'Active' | 'Inactive',
      role: newUser.role as 'SUPER ADMIN' | 'ADMIN' | 'USER'
    };
    setUsers([...users, userWithId]);
    toast.success('User created successfully!');
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsAddModalOpen(true);
  };

  const handleUpdateUser = (updatedUser: Omit<User, 'id'>) => {
    if (editingUser) {
      const updatedUsers = users.map(u => 
        u.id === editingUser.id ? { 
          ...updatedUser, 
          id: editingUser.id,
          avatar: updatedUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
          createdAt: editingUser.createdAt,
          lastLogin: editingUser.lastLogin,
          status: updatedUser.status as 'Active' | 'Inactive',
          role: updatedUser.role as 'SUPER ADMIN' | 'ADMIN' | 'USER'
        } : u
      );
      setUsers(updatedUsers);
      setEditingUser(null);
      toast.success('User updated successfully!');
    }
  };

  const handleDeleteClick = (user: User) => {
    const check = canDeleteUser(user);
    if (!check.allowed) {
      toast.error(check.reason || 'Cannot delete this user');
      return;
    }
    setDeletingUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingUser) {
      setUsers(users.filter(u => u.id !== deletingUser.id));
      toast.success('User deleted successfully!');
      setIsDeleteModalOpen(false);
      setDeletingUser(null);
    }
  };

  const handleToggleStatus = (user: User) => {
    if (user.name === currentUsername) {
      toast.error('You cannot change your own status');
      return;
    }
    
    const updatedUsers = users.map(u => 
      u.id === user.id ? { 
        ...u, 
        status: u.status === 'Active' ? 'Inactive' as const : 'Active' as const 
      } : u
    );
    setUsers(updatedUsers);
    toast.success(`User ${user.status === 'Active' ? 'deactivated' : 'activated'} successfully!`);
  };

  const getRoleBadgeClass = (role: string) => {
    return role.toLowerCase().replace(' ', '-');
  };

  const getStatusBadgeClass = (status: string) => {
    return status.toLowerCase();
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="user-management">
      <div className="page-header">
        <div>
          <h1>User Management</h1>
          <p className="subtitle">Module for managing system administrators and staff access.</p>
        </div>
        <button className="btn-primary" onClick={() => {
          setEditingUser(null);
          setIsAddModalOpen(true);
        }}>
          + Add User
        </button>
      </div>

      <div className="filters-section">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Filter by user name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>✕</button>
          )}
        </div>
        <div className="results-count">
          Showing {currentUsers.length} of {filteredUsers.length} users
        </div>
      </div>

      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => {
              const deleteCheck = canDeleteUser(user);
              return (
                <tr key={user.id}>
                  <td>
                    <div className="user-cell">
                      <div className={`user-avatar role-${getRoleBadgeClass(user.role)}`}>
                        {user.avatar}
                      </div>
                      <div className="user-info">
                        <span className="user-name">{user.name}</span>
                        {user.createdAt && (
                          <span className="user-created">Joined {user.createdAt}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge role-${getRoleBadgeClass(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button 
                      className={`status-badge status-${getStatusBadgeClass(user.status)}`}
                      onClick={() => handleToggleStatus(user)}
                      disabled={user.name === currentUsername}
                      title={user.name === currentUsername ? 'Cannot change your own status' : 'Click to toggle'}
                    >
                      {user.status}
                    </button>
                  </td>
                  <td>{user.lastLogin || '-'}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="icon-btn edit" 
                        onClick={() => handleEditUser(user)}
                        title="Edit user"
                      >
                        ✏️
                      </button>
                      <button 
                        className={`icon-btn delete ${!deleteCheck.allowed ? 'disabled' : ''}`}
                        onClick={() => handleDeleteClick(user)}
                        disabled={!deleteCheck.allowed}
                        title={deleteCheck.reason || 'Delete user'}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="no-results">
                  No users found matching your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="page-btn"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                className={`page-number ${currentPage === number ? 'active' : ''}`}
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            ))}
          </div>
          <button 
            className="page-btn"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}

      {/* Modals */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingUser(null);
        }}
        onAdd={handleAddUser}
        onUpdate={handleUpdateUser}
        editingUser={editingUser}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingUser(null);
        }}
        onConfirm={handleDeleteConfirm}
        itemName={deletingUser?.name || ''}
        itemType="người dùng"
      />
    </div>
  );
};

export default UserManagement;