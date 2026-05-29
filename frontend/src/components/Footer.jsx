import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="container">
        <div className="row text-center text-md-start gy-4">
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <p>
              <Link to="/" className="footer-link">
                Home
              </Link>
            </p>
            <p>
              <Link to="/products" className="footer-link">
                Collection
              </Link>
            </p>
            <p>
              <Link to="/about" className="footer-link">
                About Us
              </Link>
            </p>
            <p>
              <Link to="/contact" className="footer-link">
                Contact
              </Link>
            </p>
          </div>

          <div className="col-md-4">
            <h5>Customer Care</h5>
            <p>
              <Link to="/help" className="footer-link">
                Help
              </Link>
            </p>
            <p>
              <Link to="/returns" className="footer-link">
                Returns
              </Link>
            </p>
            <p>
              <Link to="/support" className="footer-link">
                Support
              </Link>
            </p>
            <p>
              <Link to="/size-guide" className="footer-link">
                Size Guide
              </Link>
            </p>
          </div>

          <div className="col-md-4">
            <h5>Contact</h5>
            <p>
              <a href="mailto:store@mail.com" className="footer-link">
                Email: store@mail.com
              </a>
            </p>
            <p>
              <a href="tel:+96170123456" className="footer-link">
                Phone: +961 70 123 456
              </a>
            </p>

            <div className="footer-social">
              <Link to="/contact" className="social-circle">
                CT
              </Link>
              <Link to="/support" className="social-circle">
                SP
              </Link>
              <Link to="/products" className="social-circle">
                BG
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-line">
          <div className="footer-copy">(c) 2026 Fashion Store</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
