import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { toast } from 'react-toastify';
import './Admin.css';

export default function NewProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    category: '',
    stock: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('description', form.description);
      formData.append('price', form.price);
      formData.append('discount', form.discount);
      formData.append('category', form.category);
      formData.append('stock', form.stock);
      if (image) {
        formData.append('image', image);
      }
      
      const { data } = await API.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (data.success) {
        toast.success('Product created!');
        navigate('/admin/products');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Add New Product</h1>
        <div className="admin-nav">
          <Link to="/admin" className="admin-nav-link">Dashboard</Link>
          <Link to="/admin/orders" className="admin-nav-link">All Orders</Link>
          <Link to="/admin/products" className="admin-nav-link">All Products</Link>
          <Link to="/admin/products/new" className="admin-nav-link active">New Product</Link>
        </div>
      </div>

      <form className="new-product-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Product Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Enter product name" required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Electronics" required />
          </div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Product description" rows={4} required />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Price (₹)</label>
            <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="0.00" required />
          </div>
          <div className="form-group">
            <label>Discount (%)</label>
            <input name="discount" type="number" min="0" max="100" value={form.discount} onChange={handleChange} placeholder="0" />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} placeholder="0" required />
          </div>
        </div>
        <div className="form-group">
          <label>Product Image</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="file-input" />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}
