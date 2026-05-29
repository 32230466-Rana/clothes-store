import Footer from "../components/Footer";

function Support() {
  return (
    <div className="support-page care-page">
      <section className="page-section">
        <div className="container">
          <div className="page-box care-box support-page-box">
            <p className="care-kicker">We are here</p>
            <h1 className="support-title">Support</h1>
            <p className="care-intro">
              Tell us what happened and we will guide you with your order,
              return, size, or product question.
            </p>

            <div className="row g-3 care-card-row">
              <div className="col-md-4">
                <div className="care-mini-card h-100">
                  <span>📦</span>
                  <h3>Orders</h3>
                  <p>Ask about delivery, order details, and updates.</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="care-mini-card h-100">
                  <span>↩️</span>
                  <h3>Returns</h3>
                  <p>Check what can be returned before sending items.</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="care-mini-card h-100">
                  <span>✨</span>
                  <h3>Style Help</h3>
                  <p>Get simple help choosing pieces that match.</p>
                </div>
              </div>
            </div>

            <form
              className="support-form"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="mb-3">
                <label className="support-label">Your Name</label>
                <input
                  type="text"
                  className="field-control form-control"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-3">
                <label className="support-label">Your Email</label>
                <input
                  type="email"
                  className="field-control form-control"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-3">
                <label className="support-label">Your Message</label>
                <textarea
                  className="field-control form-control"
                  rows="6"
                  placeholder="Write your message"
                ></textarea>
              </div>

              <button type="submit" className="support-btn btn btn-primary">
                Send Support Request
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Support;
