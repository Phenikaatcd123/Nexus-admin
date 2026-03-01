// src/pages/Dashboard/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { 
  mockStats, 
  mockRevenueData, 
  mockCategoryDistribution,
  mockTopProducts,
  mockRecentActivities,
  mockStockAlerts
} from '../../data/mockDashboardData';
import StatsCard from '../../components/Dashboard/StatsCard';
import RevenueChart from '../../components/Dashboard/RevenueChart';
import CategoryPieChart from '../../components/Dashboard/CategoryPieChart';
import TopProducts from '../../components/Dashboard/TopProducts';
import RecentActivities from '../../components/Dashboard/RecentActivities';
import StockAlerts from '../../components/Dashboard/StockAlerts';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(mockStats);
  const [revenueData] = useState(mockRevenueData);
  const [categoryData] = useState(mockCategoryDistribution);
  const [topProducts] = useState(mockTopProducts);
  const [activities] = useState(mockRecentActivities);
  const [alerts] = useState(mockStockAlerts);

  useEffect(() => {
    // Giả lập loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="subtitle">
            Xin chào, {localStorage.getItem('username') || 'Admin'}! Đây là tổng quan hệ thống của bạn.
          </p>
        </div>
        <div className="date-display">
          <span>📅</span>
          {new Date().toLocaleDateString('vi-VN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatsCard
          title="Tổng người dùng"
          value={stats.totalUsers}
          icon="👥"
          trend={stats.userGrowth}
          color="#667eea"
        />
        <StatsCard
          title="Tổng sản phẩm"
          value={stats.totalProducts}
          icon="📦"
          trend={stats.productGrowth}
          color="#10b981"
        />
        <StatsCard
          title="Tổng đơn hàng"
          value={stats.totalOrders}
          icon="🛒"
          trend={stats.orderGrowth}
          color="#f59e0b"
        />
        <StatsCard
          title="Doanh thu"
          value={stats.totalRevenue}
          icon="💰"
          trend={stats.revenueGrowth}
          prefix="₫"
          color="#ef4444"
        />
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        <div className="chart-card revenue-card">
          <RevenueChart data={revenueData} />
        </div>
        <div className="chart-card category-card">
          <CategoryPieChart data={categoryData} />
        </div>
      </div>

      {/* Widgets Row */}
      <div className="widgets-row">
        <div className="widget-card">
          <TopProducts products={topProducts} />
        </div>
        <div className="widget-card">
          <RecentActivities activities={activities} />
        </div>
        <div className="widget-card">
          <StockAlerts alerts={alerts} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;