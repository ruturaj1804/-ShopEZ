import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import API from '../services/api';
import { getImageUrl } from '../services/utils';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        if (data.success) setProduct(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    try {
      await addToCart(product._id, quantity);
      toast.success('Added to cart!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  if (loading) return <p className="loading-text">Loading...</p>;
  if (!product) return <p className="loading-text">Product not found.</p>;

  const discountedPrice = product.discount
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : product.price;

  return (
    <div className="product-detail">
      <div className="product-detail-image">
        {product.image ? (
          <img src={getImageUrl(product.image)} alt={product.name} />
        ) : (
          <div className="product-placeholder-large">No Image Available</div>
        )}
      </div>
      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p className="detail-category">{product.category}</p>
        <div className="detail-rating">
          {product.rating > 0 && (
            <>
              <FiStar size={18} fill="#f5a623" color="#f5a623" />
              <span>{product.rating} ({product.numReviews} reviews)</span>
            </>
          )}
        </div>
        <div className="detail-price">
          <span className="detail-current">₹{discountedPrice}</span>
          {product.discount > 0 && (
            <>
              <span className="detail-original">₹{product.price}</span>
              <span className="detail-discount">{product.discount}% OFF</span>
            </>
          )}
        </div>
        <p className="detail-description">{product.description}</p>
        <p className="detail-stock">
          {product.stock > 0 ? (
            <span className="in-stock">In Stock ({product.stock})</span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </p>
        <div className="detail-actions">
          <div className="quantity-selector">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</button>
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={product.stock === 0}>
            <FiShoppingCart size={18} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
