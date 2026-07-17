import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiPackage, FiDollarSign, FiBox, FiTrendingUp } from 'react-icons/fi';
import API from '../../services/api';
import { getImageUrl } from '../../services/utils';
import { toast } from 'react-toastify';
import './SellerDashboard.css';

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ price: '', stock: '' });
  const [newProduct, setNewProduct] = useState({
    name: '', description: '', price: '', discount: '', category: '', stock: '',
  });
  const [newImage, setNewImage] = useState(null);
  const [activeTab, setActiveTab] = useState('products');

  const fetchData = async () => {
    try {
      const [prodRes, orderRes] = await Promise.all([
        API.get('/products'),
        API.get('/orders/all'),
      ]);
      if (prodRes.data.success) setProducts(prodRes.data.data);
      if (orderRes.data.success) setOrders(orderRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Stats
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalSales = orders.filter(o => o.orderStatus === 'Delivered').reduce((sum, o) => sum + o.totalPrice, 0);
  const totalOrders = orders.length;
  const lowStockProducts = products.filter(p => p.stock <= 10);

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const { data } = await API.delete(`/products/${id}`);
      if (data.success) { toast.success('Product deleted'); fetchData(); }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    }
  };

  // Edit product (inline)
  const startEdit = (product) => {
    setEditingId(product._id);
    setEditForm({ price: product.price, stock: product.stock });
  };

  const saveEdit = async (id) => {
    try {
      const { data } = await API.put(`/products/${id}`, {
        price: Number(editForm.price),
        stock: Number(editForm.stock),
      });
      if (data.success) { toast.success('Product updated'); setEditingId(null); fetchData(); }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update');
    }
  };

  // Add new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(newProduct).forEach(([key, val]) => formData.append(key, val));
      if (newImage) formData.append('image', newImage);

      const { data } = await API.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (data.success) {
        toast.success('Product added!');
        setShowAddForm(false);
        setNewProduct({ name: '', description: '', price: '', discount: '', category: '', stock: '' });
        setNewImage(null);
        fetchData();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add product');
    }
  };

  if (loading) return <div className="seller-page"><p>Loading...</p></div>;

  return (
    <div className="seller-page">
      {/* Header */}
      <div className="seller-header">
        <div>
          <h1>Seller Dashboard</h1>
          <p className="seller-subtitle">Manage your products and sales</p>
        </div>
        <button className="add-product-btn" onClick={() => setShowAddForm(!showAddForm)}>
          <FiPlus size={18} /> {showAddForm ? 'Cancel' : 'Add New Product'}
        </button>
      </div>

      {/* Quick Add Form */}
      {showAddForm && (
        <div className="quick-add-form">
          <h2><FiPlus /> Add New Product</h2>
          <form onSubmit={handleAddProduct}>
            <div className="form-grid">
              <div className="form-group">
                <label>Product Name *</label>
                <input value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Enter product name" required />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} required>
                  <option value="">Select category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Home">Home</option>
                  <option value="Sports">Sports</option>
                  <option value="Books">Books</option>
                  <option value="Beauty">Beauty</option>
                </select>
              </div>
              <div className="form-group">
                <label>Price (₹) *</label>
                <input type="number" min="0" step="0.01" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="0.00" required />
              </div>
              <div className="form-group">
                <label>Discount (%)</label>
                <input type="number" min="0" max="100" value={newProduct.discount} onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })} placeholder="0" />
              </div>
              <div className="form-group">
                <label>Stock *</label>
                <input type="number" min="0" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} placeholder="0" required />
              </div>
              <div className="form-group">
                <label>Product Image</label>
                <input type="file" accept="image/*" onChange={(e) => setNewImage(e.target.files[0])} className="file-input" />
              </div>
            </div>
            <div className="form-group full-width">
              <label>Description *</label>
              <textarea value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="Describe your product..." rows={3} required />
            </div>
            <button type="submit" className="submit-product-btn">
              <FiPackage size={16} /> Publish Product
            </button>
          </form>
        </div>
      )}

      {/* Stats Cards */}
      <div className="seller-stats">
        <div className="stat-card">
          <div className="stat-icon products-icon"><FiBox size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Total Products</span>
            <span className="stat-number">{totalProducts}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stock-icon"><FiPackage size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Total Stock</span>
            <span className="stat-number">{totalStock}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orders-icon"><FiTrendingUp size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Total Orders</span>
            <span className="stat-number">{totalOrders}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon revenue-icon"><FiDollarSign size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Total Revenue</span>
            <span className="stat-number">₹{totalSales.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="low-stock-alert">
          <h3>Low Stock Alert</h3>
          <div className="low-stock-list">
            {lowStockProducts.map(p => (
              <span key={p._id} className="low-stock-tag">
                {p.name} ({p.stock} left)
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="seller-tabs">
        <button className={activeTab === 'products' ? 'tab active' : 'tab'} onClick={() => setActiveTab('products')}>
          My Products ({totalProducts})
        </button>
        <button className={activeTab === 'orders' ? 'tab active' : 'tab'} onClick={() => setActiveTab('orders')}>
          Recent Orders ({totalOrders})
        </button>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="seller-products-grid">
          {products.map((product) => (
            <div key={product._id} className="seller-product-card">
              <div className="spc-image">
                {product.image ? (
                  <img src={getImageUrl(product.image)} alt={product.name} />
                ) : (
                  <div className="spc-placeholder">No Image</div>
                )}
                {product.stock <= 10 && <span className="spc-low-stock">Low Stock</span>}
                {product.stock === 0 && <span className="spc-out-stock">Out of Stock</span>}
              </div>
              <div className="spc-info">
                <h3>{product.name}</h3>
                <p className="spc-category">{product.category}</p>
                <div className="spc-price-row">
                  <span className="spc-price">₹{product.price}</span>
                  {product.discount > 0 && <span className="spc-discount">{product.discount}% off</span>}
                </div>
                <p className="spc-stock">Stock: <strong>{product.stock}</strong> units</p>
                <p className="spc-sold">
                  Sold: <strong>
                    {orders.reduce((sum, o) => {
                      const item = o.items?.find(i => i.product === product._id || i.product?._id === product._id);
                      return sum + (item ? item.quantity : 0);
                    }, 0)}
                  </strong> units
                </p>
              </div>
              <div className="spc-actions">
                {editingId === product._id ? (
                  <div className="spc-edit-form">
                    <div className="spc-edit-row">
                      <label>₹ Price</label>
                      <input type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} />
                    </div>
                    <div className="spc-edit-row">
                      <label>Stock</label>
                      <input type="number" value={editForm.stock} onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })} />
                    </div>
                    <div className="spc-edit-btns">
                      <button className="save-btn" onClick={() => saveEdit(product._id)}>Save</button>
                      <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button className="edit-btn" onClick={() => startEdit(product)}><FiEdit2 size={14} /> Edit</button>
                    <button className="delete-btn" onClick={() => deleteProduct(product._id)}><FiTrash2 size={14} /> Delete</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="seller-orders">
          {orders.length === 0 ? (
            <p className="no-data">No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="seller-order-card">
                <div className="soc-header">
                  <span className="soc-id">Order #{order._id.slice(-6).toUpperCase()}</span>
                  <span className={`soc-status status-${order.orderStatus?.toLowerCase()}`}>{order.orderStatus}</span>
                </div>
                <div className="soc-customer">
                  Customer: <strong>{order.user?.name || 'Unknown'}</strong>
                </div>
                <div className="soc-items">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="soc-item">
                      <span>{item.name || 'Product'} x{item.quantity}</span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="soc-footer">
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  <span className="soc-total">₹{order.totalPrice?.toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
