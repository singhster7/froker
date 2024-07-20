const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section logo-section">
            <img src="/path/to/logo.png" alt="Froker Logo" className="footer-logo" />
          </div>
          <div className="footer-section quick-links">
            <h3>Quicklink</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Privacy policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
          <div className="footer-section contacts">
            <h3>Contacts</h3>
            <p>Whitefield, Bengaluru, 560066</p>
            <p><a href="mailto:support@froker.in">support@froker.in</a></p>
            <div className="social-icons">
              <a href="#"><img src="/path/to/twitter.png" alt="Twitter" /></a>
              <a href="#"><img src="/path/to/linkedin.png" alt="LinkedIn" /></a>
              <a href="#"><img src="/path/to/instagram.png" alt="Instagram" /></a>
              <a href="#"><img src="/path/to/youtube.png" alt="YouTube" /></a>
            </div>
          </div>
          <div className="footer-section qr-code">
            <h3>Scan To Download</h3>
            <img src="/path/to/qr-code.png" alt="QR Code" className="qr-image" />
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Arroz Technology. All rights reserved</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;