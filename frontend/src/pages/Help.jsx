import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Help() {
  return (
    <div className="help-page care-page">
      <section className="page-section">
        <div className="container">
          <div className="page-box care-box help-page-box">
            <p className="care-kicker">Customer Care</p>
            <h1 className="help-title">Help Center</h1>
            <p className="care-intro">
              Quick answers for shopping, sizing, orders, and store support.
            </p>

            <div className="row g-3 care-card-row">
              <div className="col-md-4">
                <div className="care-mini-card h-100">
                  <span>🛍️</span>
                  <h3>Shopping</h3>
                  <p>Ask about products, colors, and collection details.</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="care-mini-card h-100">
                  <span>📏</span>
                  <h3>Sizes</h3>
                  <p>Use the guide before choosing your final size.</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="care-mini-card h-100">
                  <span>💬</span>
                  <h3>Support</h3>
                  <p>Send your question and our team will help you.</p>
                </div>
              </div>
            </div>

            <h3 className="help-subtitle">How can we help you?</h3>
            <p className="help-text">
              We are here to make your shopping experience easy and enjoyable.
              You can contact us for product questions, order details, payment
              help, or delivery information.
            </p>

            <h3 className="help-subtitle">Shopping Assistance</h3>
            <p className="help-text">
              If you need help choosing sizes, styles, or colors, our team is
              ready to guide you and recommend the best pieces for you.
            </p>

            <h3 className="help-subtitle">Need more support?</h3>
            <p className="help-text">
              You can also visit our <Link to="/support">Support</Link> page or
              go back to <Link to="/about">About Us</Link>.
            </p>

            <div className="care-actions">
              <Link to="/support" className="care-btn btn btn-primary">
                Contact Support
              </Link>
              <Link
                to="/size-guide"
                className="care-btn care-btn-light btn btn-outline-primary"
              >
                Size Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Help;
