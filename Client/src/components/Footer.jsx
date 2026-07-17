import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>ShopEZ</h3>
          <p>Your one-stop shop for everything you need.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/cart">Cart</a>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@shopez.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 ShopEZ. All rights reserved.</p>
      </div>
    </footer>
  );
}
