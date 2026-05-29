import Footer from "../components/Footer";
import collectionImg from "../assets/collection.png";

function Contact() {
  return (
    <div className="contact-page">
      <section
        className="contact-page-hero"
        style={{ backgroundImage: `url(${collectionImg})` }}
      >
        <div className="contact-page-overlay"></div>

        <div className="container contact-page-hero-content">
          <h1>Contact Us</h1>
          <p>We are here for your questions, support, and styling needs.</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="contact-card h-100">
                <h3>Get in Touch</h3>

                <div className="contact-info-item">
                  <h5>Email</h5>
                  <p>
                    <a href="mailto:store@mail.com">store@mail.com</a>
                  </p>
                </div>

                <div className="contact-info-item">
                  <h5>Phone</h5>
                  <p>
                    <a href="tel:+96170123456">+961 70 123 456</a>
                  </p>
                </div>

                <div className="contact-info-item">
                  <h5>Our Boutique</h5>
                  <div className="location-highlight">
                    <p>Fashion Avenue</p>
                    <p>Downtown, Beirut</p>
                    <p>Lebanon</p>
                    <p className="contact-location-note">
                      Elegant fashion, timeless style, and personal care await
                      you.
                    </p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <h5>Opening Hours</h5>
                  <p>Monday - Saturday: 10:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="contact-form-box h-100">
                <h3>Send Us a Message</h3>

                <form onSubmit={(event) => event.preventDefault()}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className="field-control form-control"
                        placeholder="Your Name"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <input
                        type="email"
                        className="field-control form-control"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="field-control form-control"
                      placeholder="Subject"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <textarea
                      className="field-control form-control"
                      rows="6"
                      placeholder="Write your message here..."
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="contact-btn btn btn-primary">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="visit-section">
        <div className="container">
          <div className="visit-box">
            <h3>Visit Our Store</h3>
            <p>Step into a space where fashion meets elegance and confidence.</p>
            <p>Fashion Avenue, Downtown, Beirut, Lebanon</p>

            <div className="store-map-box">
              <h4>Find Us on the Map</h4>
              <div className="ratio ratio-16x9 contact-map-frame">
                <iframe
                  title="Fashion Store map"
                  src="https://www.google.com/maps?q=Downtown%20Beirut%20Lebanon&output=embed"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;
