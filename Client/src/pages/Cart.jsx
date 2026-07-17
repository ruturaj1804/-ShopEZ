import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { getImageUrl } from '../services/utils';
import { toast } from 'react-toastify';
import './Cart.css';

export default function Cart() {
  const { cart, cartCount, updateQuantity, removeItem, fetchCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [address, setAddress] = useState({ address: '', city: '', state: '', zipCode: '', country: '' });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [placing, setPlacing] = useState(false);

  if (!user) {
    return (
      <div className="cart-page">
        <h1>Your Cart</h1>
        <p>Please <Link to="/login">login</Link> to view your cart.</p>
      </div>
    );
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);
    try {
      const { data } = await API.post('/orders', {
        shippingAddress: address,
        paymentMethod,
      });
      if (data.success) {
        toast.success('Order placed successfully!');
        fetchCart();
        navigate(`/profile`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {!cart.items || cart.items.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/products" className="shop-link">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-image">
                  {item.product?.image ? (
                    <img src={getImageUrl(item.product.image)} alt={item.name} />
                  ) : (
                    <div className="cart-placeholder">No Image</div>
                  )}
                </div>
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">₹{item.price}</p>
                  <div className="cart-quantity">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>
                      <FiMinus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                      <FiPlus size={14} />
                    </button>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <p className="item-total">₹{(item.price * item.quantity).toFixed(2)}</p>
                  <button className="remove-btn" onClick={() => removeItem(item._id)}>
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Items ({cartCount})</span>
              <span>₹{cart.totalPrice?.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{cart.totalPrice?.toFixed(2)}</span>
            </div>

            {!showCheckout ? (
              <button className="checkout-btn" onClick={() => setShowCheckout(true)}>
                Proceed to Checkout
              </button>
            ) : (
              <form className="checkout-form" onSubmit={handlePlaceOrder}>
                <h3>Shipping Address</h3>
                <input type="text" placeholder="Address" value={address.address} onChange={(e) => setAddress({ ...address, address: e.target.value })} required />
                <input type="text" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} required />
                <input type="text" placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} required />
                <input type="text" placeholder="Zip Code" value={address.zipCode} onChange={(e) => setAddress({ ...address, zipCode: e.target.value })} required />
                <input type="text" placeholder="Country" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} required />
                <h3>Payment Method</h3>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="COD">Cash on Delivery</option>
                  <option value="Card">Credit/Debit Card</option>
                </select>
                <button type="submit" className="checkout-btn" disabled={placing}>
                  {placing ? 'Placing Order...' : 'Place Order'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
