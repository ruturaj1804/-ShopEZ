import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { getImageUrl } from '../../services/utils';
import { toast } from 'react-toastify';
import './Admin.css';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      if (data.success) setProducts(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const { data } = await API.delete(`/products/${id}`);
      if (data.success) {
        toast.success('Product deleted');
        fetchProducts();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    }
  };

  if (loading) return <div className="admin-page"><p>Loading...</p></div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>All Products</h1>
        <div className="admin-nav">
          <Link to="/admin" className="admin-nav-link">Dashboard</Link>
          <Link to="/admin/orders" className="admin-nav-link">All Orders</Link>
          <Link to="/admin/products" className="admin-nav-link active">All Products</Link>
          <Link to="/admin/products/new" className="admin-nav-link">New Product</Link>
        </div>
      </div>

      {products.length === 0 ? (
        <p className="no-data">No products found.</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    {product.image ? (
                      <img src={getImageUrl(product.image)} alt={product.name} className="table-img" />
                    ) : (
                      <div className="table-img-placeholder">N/A</div>
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₹{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.rating > 0 ? `${product.rating} ★` : '-'}</td>
                  <td>
                    <button className="delete-btn" onClick={() => deleteProduct(product._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
