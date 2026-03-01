// src/pages/Login/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Login.css'; // Import CSS thuần

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validAccounts = [
    { username: 'admin', password: 'admin123', role: 'SUPER ADMIN' },
    { username: 'user', password: 'user@123', role: 'ADMIN' },
    { username: 'manager', password: 'manager456', role: 'ADMIN' },
    { username: 'staff', password: 'staff789', role: 'USER' }
  ];

  const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  console.log('Đang đăng nhập với:', { username, password }); // Debug

  setTimeout(() => {
    const account = validAccounts.find(
      acc => acc.username === username && acc.password === password
    );

    console.log('Tài khoản tìm thấy:', account); // Debug

    if (account) {
      // Lưu vào localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', account.username);
      localStorage.setItem('userRole', account.role);
      
      console.log('Đã lưu localStorage:', {
        isAuthenticated: localStorage.getItem('isAuthenticated'),
        username: localStorage.getItem('username'),
        userRole: localStorage.getItem('userRole')
      }); // Debug
      
      toast.success('Đăng nhập thành công!');
      
      // Chuyển hướng
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 100);
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng!');
      setLoading(false);
    }
  }, 500);
};

  const fillTestAccount = (type: 'admin' | 'user' | 'manager' | 'staff') => {
    const account = validAccounts.find(acc => acc.username === type);
    if (account) {
      setUsername(account.username);
      setPassword(account.password);
      setError('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1 className="login-title">Nexus Admin</h1>
          <p className="login-subtitle">Welcome back! Please login to your account.</p>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <div className="input-group">
              <span className="input-icon">👤</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            className={`login-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Logging in...
              </>
            ) : (
              'LOGIN'
            )}
          </button>
        </form>

        <div className="test-accounts">
          <p className="test-title">Test Accounts</p>
          <div className="account-buttons">
            <button 
              className="account-btn admin"
              onClick={() => fillTestAccount('admin')}
            >
              Admin
            </button>
            <button 
              className="account-btn user"
              onClick={() => fillTestAccount('user')}
            >
              User
            </button>
            <button 
              className="account-btn manager"
              onClick={() => fillTestAccount('manager')}
            >
              Manager
            </button>
            <button 
              className="account-btn staff"
              onClick={() => fillTestAccount('staff')}
            >
              Staff
            </button>
          </div>
          <div className="account-info">
            <p><strong>Admin:</strong> admin / admin123</p>
            <p><strong>User:</strong> user / user@123</p>
            <p><strong>Manager:</strong> manager / manager456</p>
            <p><strong>Staff:</strong> staff / staff789</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;