import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getImageUrl } from '../services/utils';
import { toast } from 'react-toastify';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    try {
      await addToCart(product._id, 1);
      toast.success('Added to cart!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  const discountedPrice = product.discount
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : product.price;

  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`} className="product-card-link">
        <div className="product-image">
          {product.image ? (
            <img src={getImageUrl(product.image)} alt={product.name} />
          ) : (
            <div className="product-placeholder">No Image</div>
          )}
          {product.discount > 0 && (
            <span className="discount-badge">{product.discount}% OFF</span>
          )}
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">{product.category}</p>
          <div className="product-price">
            <span className="current-price">₹{discountedPrice}</span>
            {product.discount > 0 && (
              <span className="original-price">₹{product.price}</span>
            )}
          </div>
          {product.rating > 0 && (
            <div className="product-rating">
              {'★'.repeat(Math.round(product.rating))}
              <span>({product.numReviews})</span>
            </div>
          )}
        </div>
      </Link>
      <button className="shop-now-btn" onClick={handleAddToCart}>
        <FiShoppingCart size={16} /> Shop Now
      </button>
    </div>
  );
}
