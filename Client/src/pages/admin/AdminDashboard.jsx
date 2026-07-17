import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import './Admin.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get('/admin/dashboard');
        if (data.success) setStats(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="admin-page"><p>Loading...</p></div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-nav">
          <Link to="/admin" className="admin-nav-link active">Dashboard</Link>
          <Link to="/admin/orders" className="admin-nav-link">All Orders</Link>
          <Link to="/admin/products" className="admin-nav-link">All Products</Link>
          <Link to="/admin/products/new" className="admin-nav-link">New Product</Link>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">{stats?.totalUsers || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-value">{stats?.totalProducts || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">{stats?.totalOrders || 0}</p>
        </div>
        <div className="stat-card revenue">
          <h3>Total Revenue</h3>
          <p className="stat-value">₹{stats?.totalRevenue?.toFixed(2) || '0.00'}</p>
        </div>
      </div>

      <h2 className="recent-title">Recent Orders</h2>
      {stats?.recentOrders?.length === 0 ? (
        <p className="no-data">No orders yet.</p>
      ) : (
        <div className="recent-orders">
          {stats?.recentOrders?.map((order) => (
            <div key={order._id} className="recent-order-card">
              <div className="recent-order-info">
                <span className="order-user">{order.user?.name || 'Unknown'}</span>
                <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="recent-order-details">
                <span>{order.items?.length} items</span>
                <span className="recent-order-total">₹{order.totalPrice?.toFixed(2)}</span>
                <span className={`order-status status-${order.orderStatus?.toLowerCase()}`}>
                  {order.orderStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
