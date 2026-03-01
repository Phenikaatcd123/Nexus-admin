// src/components/Layout/Header.tsx
import React from 'react';
import ThemeToggle from '../ThemeToggle';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h2 className="page-title">Dashboard</h2>
      </div>
      
      <div className="header-right">
        {/* Search bar */}
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Tìm kiếm..." 
            className="search-input"
          />
          <span className="search-shortcut">⌘K</span>
        </div>
        
        <div className="action-buttons">
          {/* Notification button */}
          <button className="action-btn notification-btn">
            <span className="btn-icon">🔔</span>
            <span className="notification-dot"></span>
          </button>
          
          {/* Theme Toggle Button */}
          <ThemeToggle />
          
          {/* Profile dropdown */}
          <div className="profile-dropdown">
            <button className="profile-trigger">
              <div className="profile-avatar">A</div>
              <span className="profile-name">Admin</span>
              <span className="dropdown-arrow">▼</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;