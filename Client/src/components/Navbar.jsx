import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
          ShopEZ
        </Link>

        <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/products" className="navbar-link" onClick={() => setMenuOpen(false)}>Products</Link>

          {user ? (
            <>
              <Link to="/cart" className="navbar-link cart-link" onClick={() => setMenuOpen(false)}>
                <FiShoppingCart size={20} />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
              <Link to="/profile" className="navbar-link" onClick={() => setMenuOpen(false)}>
                <FiUser size={18} /> Profile
              </Link>
              {isAdmin && (
                <>
                  <Link to="/admin/sell" className="navbar-link admin-link" onClick={() => setMenuOpen(false)}>
                    Sell
                  </Link>
                  <Link to="/admin" className="navbar-link admin-link" onClick={() => setMenuOpen(false)}>
                    Admin
                  </Link>
                </>
              )}
              <button className="navbar-btn logout-btn" onClick={handleLogout}>
                <FiLogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="navbar-link navbar-btn register-btn" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
