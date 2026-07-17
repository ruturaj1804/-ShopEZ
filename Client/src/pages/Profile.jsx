import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { toast } from 'react-toastify';
import './Profile.css';

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const [profileRes, ordersRes] = await Promise.all([
          API.get('/users/profile'),
          API.get('/orders/myorders'),
        ]);
        if (profileRes.data.success) {
          setProfile(profileRes.data.data);
          setForm({
            name: profileRes.data.data.name,
            email: profileRes.data.data.email,
            phone: profileRes.data.data.phone || '',
            address: profileRes.data.data.address || '',
          });
        }
        if (ordersRes.data.success) setOrders(ordersRes.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put('/users/profile', form);
      if (data.success) {
        setProfile(data.data);
        setEditing(false);
        toast.success('Profile updated!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  if (!user) {
    return (
      <div className="profile-page">
        <p>Please <Link to="/login">login</Link> to view your profile.</p>
      </div>
    );
  }

  if (loading) return <div className="profile-page"><p>Loading...</p></div>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
        <button className="edit-btn" onClick={() => setEditing(!editing)}>
          {editing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {editing ? (
        <form className="profile-form" onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <button type="submit" className="save-btn">Save Changes</button>
        </form>
      ) : (
        <div className="profile-info">
          <div className="info-row"><span>Name:</span><span>{profile?.name}</span></div>
          <div className="info-row"><span>Email:</span><span>{profile?.email}</span></div>
          <div className="info-row"><span>Phone:</span><span>{profile?.phone || 'N/A'}</span></div>
          <div className="info-row"><span>Address:</span><span>{profile?.address || 'N/A'}</span></div>
        </div>
      )}

      <h2 className="orders-title">My Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders">No orders yet. <Link to="/products">Start shopping!</Link></p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <span className="order-id">Order #{order._id.slice(-6).toUpperCase()}</span>
                <span className={`order-status status-${order.orderStatus?.toLowerCase()}`}>
                  {order.orderStatus}
                </span>
              </div>
              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <span>{item.name} x{item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                <span className="order-total">₹{order.totalPrice?.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
