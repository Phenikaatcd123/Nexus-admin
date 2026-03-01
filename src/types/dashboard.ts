export interface DashboardStats {
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    revenueGrowth: number;
    userGrowth: number;
    productGrowth: number;
    orderGrowth: number;
}

export interface RevenueData {
    date: string;
    revenue: number;
    orders: number
}

export interface CategoryDistribution {
    name: string;
    value: number;
    color: string;
}

export interface TopProduct {
    id: string;
    name: string;
    sales: number;
    revenue: number;
    image?: string;
    trend: 'up' | 'down' | 'stable';
}

export interface RecentActivity {
    id: string;
    type: 'user' | 'order' | 'product' | 'review';
    action: string;
    user: string;
    timestamp: string;
    details: string; 
}

export interface StockAlert {
    id: string;
    name: string;
    sku: string;
    stock: number;
    threshold: number;
    category: string;
}