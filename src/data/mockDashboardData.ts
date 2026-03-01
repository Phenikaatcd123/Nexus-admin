// src/data/mockDashboardData.ts
import { 
  DashboardStats, 
  RevenueData, 
  CategoryDistribution, 
  TopProduct,
  RecentActivity,
  StockAlert 
} from '../types/dashboard';

// Thống kê tổng quan
export const mockStats: DashboardStats = {
  totalUsers: 1248,
  totalProducts: 543,
  totalOrders: 2890,
  totalRevenue: 1245678,
  revenueGrowth: 23.5,
  userGrowth: 12.3,
  productGrowth: 5.7,
  orderGrowth: 18.9
};

// Dữ liệu doanh thu 30 ngày gần nhất
export const mockRevenueData: RevenueData[] = [
  { date: '2024-02-01', revenue: 42500, orders: 42 },
  { date: '2024-02-02', revenue: 38900, orders: 38 },
  { date: '2024-02-03', revenue: 41200, orders: 41 },
  { date: '2024-02-04', revenue: 45600, orders: 45 },
  { date: '2024-02-05', revenue: 47800, orders: 47 },
  { date: '2024-02-06', revenue: 52300, orders: 52 },
  { date: '2024-02-07', revenue: 48900, orders: 48 },
  { date: '2024-02-08', revenue: 51200, orders: 51 },
  { date: '2024-02-09', revenue: 53400, orders: 53 },
  { date: '2024-02-10', revenue: 49800, orders: 49 },
  { date: '2024-02-11', revenue: 46700, orders: 46 },
  { date: '2024-02-12', revenue: 44500, orders: 44 },
  { date: '2024-02-13', revenue: 47800, orders: 47 },
  { date: '2024-02-14', revenue: 52300, orders: 52 },
  { date: '2024-02-15', revenue: 56700, orders: 56 },
  { date: '2024-02-16', revenue: 58900, orders: 58 },
  { date: '2024-02-17', revenue: 61200, orders: 61 },
  { date: '2024-02-18', revenue: 59800, orders: 59 },
  { date: '2024-02-19', revenue: 62300, orders: 62 },
  { date: '2024-02-20', revenue: 64500, orders: 64 },
  { date: '2024-02-21', revenue: 66700, orders: 66 },
  { date: '2024-02-22', revenue: 68900, orders: 68 },
  { date: '2024-02-23', revenue: 71200, orders: 71 },
  { date: '2024-02-24', revenue: 69800, orders: 69 },
  { date: '2024-02-25', revenue: 72300, orders: 72 },
  { date: '2024-02-26', revenue: 74500, orders: 74 },
  { date: '2024-02-27', revenue: 76700, orders: 76 },
  { date: '2024-02-28', revenue: 78900, orders: 78 },
  { date: '2024-02-29', revenue: 81200, orders: 81 },
  { date: '2024-03-01', revenue: 83400, orders: 83 }
];

// Phân bố danh mục
export const mockCategoryDistribution: CategoryDistribution[] = [
  { name: 'Electronics', value: 124, color: '#8884d8' },
  { name: 'Accessories', value: 89, color: '#82ca9d' },
  { name: 'Audio', value: 56, color: '#ffc658' },
  { name: 'Wearables', value: 41, color: '#ff8042' },
  { name: 'Home Appliances', value: 32, color: '#0088fe' }
];

// Top sản phẩm bán chạy
export const mockTopProducts: TopProduct[] = [
  { 
    id: '1', 
    name: 'iPhone 15 Pro', 
    sales: 234, 
    revenue: 233766,
    image: 'https://picsum.photos/50/50?random=1',
    trend: 'up'
  },
  { 
    id: '2', 
    name: 'MacBook Pro M3', 
    sales: 156, 
    revenue: 389844,
    image: 'https://picsum.photos/50/50?random=2',
    trend: 'up'
  },
  { 
    id: '3', 
    name: 'Sony WH-1000XM5', 
    sales: 98, 
    revenue: 39102,
    image: 'https://picsum.photos/50/50?random=3',
    trend: 'stable'
  },
  { 
    id: '4', 
    name: 'Logitech MX Master 3S', 
    sales: 67, 
    revenue: 6633,
    image: 'https://picsum.photos/50/50?random=4',
    trend: 'down'
  },
  { 
    id: '5', 
    name: 'Samsung Galaxy Watch 6', 
    sales: 45, 
    revenue: 14805,
    image: 'https://picsum.photos/50/50?random=5',
    trend: 'up'
  }
];

// Hoạt động gần đây
export const mockRecentActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'user',
    action: 'created',
    user: 'Alex Thompson',
    timestamp: '2024-03-01T09:23:00',
    details: 'New user registered'
  },
  {
    id: '2',
    type: 'order',
    action: 'completed',
    user: 'Sarah Miller',
    timestamp: '2024-03-01T10:45:00',
    details: 'Order #ORD-2024-0012 completed'
  },
  {
    id: '3',
    type: 'product',
    action: 'updated',
    user: 'John Doe',
    timestamp: '2024-03-01T11:30:00',
    details: 'Updated price for MacBook Pro M3'
  },
  {
    id: '4',
    type: 'review',
    action: 'added',
    user: 'Emma Wilson',
    timestamp: '2024-03-01T13:15:00',
    details: 'New 5-star review for iPhone 15 Pro'
  },
  {
    id: '5',
    type: 'order',
    action: 'cancelled',
    user: 'Michael Brown',
    timestamp: '2024-03-01T14:20:00',
    details: 'Order #ORD-2024-0015 cancelled'
  },
  {
    id: '6',
    type: 'user',
    action: 'updated',
    user: 'Lisa Anderson',
    timestamp: '2024-03-01T15:40:00',
    details: 'Updated profile information'
  }
];

// Cảnh báo tồn kho
export const mockStockAlerts: StockAlert[] = [
  {
    id: '1',
    name: 'Logitech MX Master 3S',
    sku: 'LOG-789-MX',
    stock: 3,
    threshold: 5,
    category: 'Accessories'
  },
  {
    id: '2',
    name: 'Sony WH-1000XM5',
    sku: 'SON-321-WH',
    stock: 4,
    threshold: 5,
    category: 'Audio'
  },
  {
    id: '3',
    name: 'Samsung Galaxy Watch 6',
    sku: 'SAM-654-GW',
    stock: 2,
    threshold: 5,
    category: 'Wearables'
  },
  {
    id: '4',
    name: 'AirPods Pro',
    sku: 'APL-987-AP',
    stock: 1,
    threshold: 5,
    category: 'Audio'
  }
];