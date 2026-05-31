import { useState } from "react";
import Footer from "../components/Footer";
import contactImg from "../assets/contactus.png";
import { readStorageList, saveStorageList, validateEmail } from "../utils/storePracticalHelpers";

function Contact() {
  const [formMessage, setFormMessage] = useState("");
  const [formStatus, setFormStatus] = useState("success");
  const [messages, setMessages] = useState(() =>
    readStorageList("fashion_store_contact_messages", [])
  );

  const handleContactSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const name = form.elements.contactName.value.trim();
    const email = form.elements.contactEmail.value.trim();
    const subject = form.elements.contactSubject.value.trim();
    const message = form.elements.contactMessage.value.trim();

    if (name.length < 2) {
      setFormMessage("Please enter a valid name.");
      setFormStatus("error");
      return;
    }

    if (!validateEmail(email)) {
      setFormMessage("Please enter a valid email.");
      setFormStatus("error");
      return;
    }

    if (subject.length < 3) {
      setFormMessage("Subject must contain at least 3 characters.");
      setFormStatus("error");
      return;
    }

    if (message.length < 10) {
      setFormMessage("Message must contain at least 10 characters.");
      setFormStatus("error");
      return;
    }

    const savedMessage = {
      name,
      email,
      subject,
      message,
      date: new Date().toLocaleString(),
    };

    const nextMessages = [savedMessage, ...messages].slice(0, 3);
    setMessages(nextMessages);
    saveStorageList("fashion_store_contact_messages", nextMessages);

    setFormMessage("Your message was saved successfully.");
    setFormStatus("success");
    form.reset();
  };

  return (
    <div className="contact-page">
      <section
        className="contact-page-hero"
        style={{ backgroundImage: `url(${contactImg})` }}
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

                <form onSubmit={handleContactSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        name="contactName"
                        className="field-control form-control"
                        placeholder="Your Name"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <input
                        type="email"
                        name="contactEmail"
                        className="field-control form-control"
                        placeholder="Your Email"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      name="contactSubject"
                      className="field-control form-control"
                      placeholder="Subject"
                    />
                  </div>

                  <div className="mb-3">
                    <textarea
                      name="contactMessage"
                      className="field-control form-control"
                      rows="6"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>

                  <button type="submit" className="contact-btn btn btn-primary">
                    Send Message
                  </button>

                  {formMessage && (
                    <p className={`form-validation-message ${formStatus} mt-3`}>
                      {formMessage}
                    </p>
                  )}
                </form>

                {messages.length > 0 && (
                  <div className="mt-4">
                    <h4>Latest saved messages</h4>
                    <ul className="notes-list">
                      {messages.map((item, index) => (
                        <li key={item.email + index}>
                          <strong>{item.subject}</strong> from {item.name}
                          <br />
                          <small>{item.date}</small>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
