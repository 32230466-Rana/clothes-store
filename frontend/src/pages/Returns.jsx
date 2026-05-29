import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Returns() {
  return (
    <div className="returns-page care-page">
      <section className="page-section">
        <div className="container">
          <div className="page-box care-box returns-page-box">
            <p className="care-kicker">Easy Steps</p>
            <h1 className="returns-title">Returns</h1>
            <p className="care-intro">
              Read the return rules first, then contact support before sending
              anything back.
            </p>

            <div className="row g-3 care-card-row">
              <div className="col-md-4">
                <div className="care-mini-card h-100">
                  <span>1</span>
                  <h3>Check</h3>
                  <p>Make sure the item is clean and unused.</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="care-mini-card h-100">
                  <span>2</span>
                  <h3>Message</h3>
                  <p>Contact support with your order details.</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="care-mini-card h-100">
                  <span>3</span>
                  <h3>Return</h3>
                  <p>Send the item after receiving confirmation.</p>
                </div>
              </div>
            </div>

            <ul className="returns-list">
              <li>Items can be returned within 7 days after delivery.</li>
              <li>Products must be clean, unused, and in original condition.</li>
              <li>Accessories and sale items may not be returnable.</li>
              <li>Please contact our support team before sending any item back.</li>
              <li>
                For more help, visit our <Link to="/support">Support</Link>{" "}
                page.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Returns;
