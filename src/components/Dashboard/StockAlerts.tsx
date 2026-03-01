import React from 'react';
import { StockAlert } from '../../types/dashboard';
import './StockAlerts.css';

interface StockAlertsProps {
  alerts: StockAlert[];
}

const StockAlerts: React.FC<StockAlertsProps> = ({ alerts }) => {
  const getAlertLevel = (stock: number, threshold: number) => {
    if (stock === 0) return 'critical';
    if (stock <= threshold / 2) return 'high';
    return 'warning';
  };

  const getAlertColor = (level: string) => {
    switch(level) {
      case 'critical': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'warning': return '#eab308';
      default: return '#6c757d';
    }
  };

  return (
    <div className="stock-alerts">
      <div className="widget-header">
        <h3>⚠️ Cảnh báo tồn kho</h3>
        <button className="view-all">Xem tất cả →</button>
      </div>

      {alerts.length === 0 ? (
        <div className="no-alerts">
          <span>✅</span>
          <p>Không có cảnh báo nào</p>
        </div>
      ) : (
        <div className="alerts-list">
          {alerts.map(alert => {
            const level = getAlertLevel(alert.stock, alert.threshold);
            const color = getAlertColor(level);
            
            return (
              <div key={alert.id} className="alert-item">
                <div className="alert-icon" style={{ background: `${color}20`, color }}>
                  {level === 'critical' ? '🔴' : level === 'high' ? '🟠' : '🟡'}
                </div>
                <div className="alert-content">
                  <div className="alert-header">
                    <span className="alert-name">{alert.name}</span>
                    <span className="alert-sku">{alert.sku}</span>
                  </div>
                  <div className="alert-details">
                    <span className="alert-category">{alert.category}</span>
                    <div className="stock-indicator">
                      <div 
                        className="stock-bar"
                        style={{
                          width: `${(alert.stock / alert.threshold) * 100}%`,
                          background: color
                        }}
                      />
                      <span className="stock-text">
                        {alert.stock} / {alert.threshold}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StockAlerts;