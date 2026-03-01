import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { RevenueData } from '../../types/dashboard';
import './RevenueChart.css';

interface RevenueChartProps {
  data: RevenueData[];
}

type ChartType = 'area' | 'bar';

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const [chartType, setChartType] = useState<ChartType>('area');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const filterDataByRange = () => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    return data.slice(-days);
  };

  const filteredData = filterDataByRange();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-date">{formatDate(label)}</p>
          <p className="tooltip-revenue">
            Doanh thu: {formatCurrency(payload[0].value)}
          </p>
          <p className="tooltip-orders">
            Đơn hàng: {payload[1]?.value || 0}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="revenue-chart">
      <div className="chart-header">
        <h3>Doanh thu & Đơn hàng</h3>
        <div className="chart-controls">
          <div className="chart-type-toggle">
            <button
              className={chartType === 'area' ? 'active' : ''}
              onClick={() => setChartType('area')}
            >
              📈 Diện tích
            </button>
            <button
              className={chartType === 'bar' ? 'active' : ''}
              onClick={() => setChartType('bar')}
            >
              📊 Cột
            </button>
          </div>
          <div className="time-range-toggle">
            <button
              className={timeRange === '7d' ? 'active' : ''}
              onClick={() => setTimeRange('7d')}
            >
              7 ngày
            </button>
            <button
              className={timeRange === '30d' ? 'active' : ''}
              onClick={() => setTimeRange('30d')}
            >
              30 ngày
            </button>
            <button
              className={timeRange === '90d' ? 'active' : ''}
              onClick={() => setTimeRange('90d')}
            >
              90 ngày
            </button>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          {chartType === 'area' ? (
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#667eea" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="#6c757d"
              />
              <YAxis 
                yAxisId="left"
                stroke="#6c757d"
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#6c757d"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                name="Doanh thu"
                stroke="#667eea"
                fill="url(#colorRevenue)"
                strokeWidth={2}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                name="Đơn hàng"
                stroke="#10b981"
                fill="url(#colorOrders)"
                strokeWidth={2}
              />
            </AreaChart>
          ) : (
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="#6c757d"
              />
              <YAxis 
                yAxisId="left"
                stroke="#6c757d"
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#6c757d"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="revenue"
                name="Doanh thu"
                fill="#667eea"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                yAxisId="right"
                dataKey="orders"
                name="Đơn hàng"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="chart-summary">
        <div className="summary-item">
          <span className="summary-label">Tổng doanh thu:</span>
          <span className="summary-value">
            {formatCurrency(filteredData.reduce((sum, item) => sum + item.revenue, 0))}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Tổng đơn hàng:</span>
          <span className="summary-value">
            {filteredData.reduce((sum, item) => sum + item.orders, 0)}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Trung bình/ngày:</span>
          <span className="summary-value">
            {formatCurrency(
              filteredData.reduce((sum, item) => sum + item.revenue, 0) / filteredData.length
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;