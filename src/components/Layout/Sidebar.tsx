import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

interface MenuItem {
  path: string;
  label: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { path: '/dashboard', label: 'Overview', icon: '📊' },
  { path: '/dashboard/users', label: 'User Management', icon: '👥' },
  { path: '/dashboard/categories', label: 'Category Management', icon: '📂' },
  { path: '/dashboard/products', label: 'Product Management', icon: '📦' },
  { path: '/dashboard/documents', label: 'Document Management', icon: '📄' },
  { path: '/dashboard/content', label: 'Content Pages', icon: '📝' },
  { path: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Admin User';
  const userRole = localStorage.getItem('userRole') || 'ADMIN';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="app-title">Nexus Admin</h1>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <span className="user-name">{username}</span>
            <span className="user-role">{userRole}</span>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;