import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import './Landing.css';

export default function Landing() {
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, settingsRes] = await Promise.all([
          API.get('/products'),
          API.get('/admin/settings'),
        ]);
        if (prodRes.data.success) setProducts(prodRes.data.data.slice(0, 8));
        if (settingsRes.data.success) setSettings(settingsRes.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="landing">
      {/* Hero Banner */}
      <section className="hero">
        <div className="hero-content">
          <h1>{settings?.bannerTitle || 'Welcome to ShopEZ'}</h1>
          <p>{settings?.bannerSubtitle || 'Discover amazing products at great prices'}</p>
          <Link to="/products" className="hero-btn">Shop Now</Link>
        </div>
      </section>

      {/* Categories */}
      {settings?.categories?.length > 0 && (
        <section className="categories-section">
          <h2>Shop by Category</h2>
          <div className="categories-grid">
            {settings.categories.map((cat, idx) => (
              <Link key={idx} to={`/products?category=${cat.name}`} className="category-card">
                {cat.image && <img src={cat.image} alt={cat.name} />}
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/products" className="view-all">View All</Link>
        </div>
        {loading ? (
          <p className="loading-text">Loading products...</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
