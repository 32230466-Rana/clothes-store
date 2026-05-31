import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { readStorageList, saveStorageList, validateEmail } from "../utils/storePracticalHelpers";

import pic1 from "../assets/pic1.png";
import pic2 from "../assets/pic2.png";
import pic3 from "../assets/pic3.png";
import blueDress from "../assets/baby-blue-hijab-evening-dress-22.jpg";
import brownTshirt from "../assets/brown.webp";
import blueTshirt from "../assets/bluekid.png";
import blackBag from "../assets/blackbag.webp";
import pinkBag from "../assets/pink1.webp";
import pinkDress from "../assets/pink.webp";

const carouselItems = [
  {
    image: pic1,
    alt: "Fashion carousel style one",
    label: "New Collection",
    title: "Modern looks for every day",
    text: "Clean designs and comfortable style.",
  },
  {
    image: pic2,
    alt: "Fashion carousel style two",
    label: "Spring Discount",
    title: "Fresh styles made for you",
    text: "Soft colors and elegant fashion.",
  },
  {
    image: pic3,
    alt: "Fashion carousel style three",
    label: "Special Offer",
    title: "Simple style with beauty",
    text: "Perfect everyday outfits.",
  },
];

const categories = [
  { name: "Women", image: blueDress },
  { name: "Men", image: brownTshirt },
  { name: "Kids", image: blueTshirt },
  { name: "Handbags", image: blackBag },
];

const prices = [
  { price: "$10", text: "and under" },
  { price: "$25", text: "and under" },
  { price: "$50", text: "and under" },
  { price: "$100", text: "and under" },
];

const priceTags = [
  "Shop by Category",
  "Shop By Price",
  "Limited Time Specials",
  "Black Friday Deals",
];

const styleTips = [
  "Choose a clear main piece that stands out.",
  "Add one matching accessory for a polished look.",
  "Check the size guide before placing your order.",
];

const deals = [
  {
    image: pinkBag,
    alt: "Pink handbag",
    title: "25-50% OFF",
    text: "Spring styles for the new season.",
  },
  {
    image: brownTshirt,
    alt: "Brown shirt",
    title: "30-40% OFF",
    text: "Beautiful fashion for every day.",
  },
  {
    image: pinkDress,
    alt: "Pink outfit deal",
    title: "New Arrivals",
    text: "Soft pieces with simple styling.",
  },
];
const initialFeedbacks = [
  {
    name: "Sara",
    rating: "5",
    message: "Beautiful collection and very clear shopping page.",
  },
  {
    name: "Maya",
    rating: "4",
    message: "The products are easy to browse and the design feels soft.",
  },
];

function Home() {
  const [feedbacks, setFeedbacks] = useState(() =>
    readStorageList("fashion_store_feedbacks", initialFeedbacks)
  );
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleFeedbackSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const name = form.elements.feedbackName.value.trim();
    const email = form.elements.feedbackEmail.value.trim();
    const message = form.elements.feedbackText.value.trim();
    const rating = form.elements.rating.value;

    if (name === "" || email === "" || message === "" || rating === "") {
      setFeedbackMessage("Please fill your name, email, rating, and message.");
      return;
    }

    if (!validateEmail(email)) {
      setFeedbackMessage("Please enter a valid email address.");
      return;
    }

    if (message.length < 8) {
      setFeedbackMessage("Feedback must contain at least 8 characters.");
      return;
    }

    const newFeedback = {
      name: name,
      rating: rating,
      message: message,
    };

    const nextFeedbacks = [newFeedback, ...feedbacks].slice(0, 6);
    setFeedbacks(nextFeedbacks);
    saveStorageList("fashion_store_feedbacks", nextFeedbacks);
    setFeedbackMessage("Thank you! Your feedback was saved in this browser.");
    form.reset();
  };

  return (
    <>
      <main className="home-page">
        <div
          id="fashionCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="2500"
          data-bs-pause="hover"
          data-bs-keyboard="true"
          data-bs-wrap="true"
        >
          <div className="carousel-indicators">
            {carouselItems.map((item, index) => (
              <button
                key={item.label}
                type="button"
                data-bs-target="#fashionCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-label={"Slide " + (index + 1)}
              ></button>
            ))}
          </div>

          <div className="carousel-inner">
            {carouselItems.map((item, index) => (
              <div
                className={
                  index === 0 ? "carousel-item active" : "carousel-item"
                }
                key={item.label}
              >
                <img
                  src={item.image}
                  className="d-block w-100 carousel-hero-img"
                  alt={item.alt}
                />

                <div className="carousel-caption custom-caption text-start">
                  <span className="label-box">{item.label}</span>
                  <h1>{item.title}</h1>
                  <p>{item.text}</p>

                  <Link to="/products" className="shop-btn btn btn-primary">
                    Shop Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#fashionCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#fashionCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>

        <section className="section-space">
          <div className="container">
            <h2 className="section-title">Featured Categories</h2>

            <div className="row row-cols-2 row-cols-lg-4 g-4 text-center home-category-grid">
              {categories.map((category) => (
                <div className="col" key={category.name}>
                  <Link to="/products" className="category-link">
                    <div className="card category-card h-100">
                      <img
                        src={category.image}
                        className="card-img-top"
                        alt={category.name}
                      />

                      <div className="card-body">
                        <h5 className="card-title">{category.name}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space home-browse-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-4">
                <div className="home-section-card h-100">
                  <h2 className="section-title browse-category-title">
                    Browse by Category
                  </h2>

                  <p className="home-browse-subtitle">
                    Explore the main collection sections from one place.
                  </p>

                  <ul className="nav nav-pills flex-column home-vertical-nav">
                    {categories.map((category) => (
                      <li className="nav-item" key={category.name}>
                        <Link to="/products" className="nav-link">
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-lg-6 mb-4">
                <div className="home-section-card h-100">
                  <h2 className="section-title style-tips-title">Style Tips</h2>

                  <p className="home-browse-subtitle">
                    Simple ideas to help visitors build a balanced outfit.
                  </p>

                  <ol className="home-style-list">
                    {styleTips.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space bg-light-section">
          <div className="container">
            <h2 className="section-title">Shop By Price</h2>

            <div className="row text-center price-grid">
              {prices.map((item) => (
                <div className="col-md-3 col-sm-6 mb-4" key={item.price}>
                  <Link to="/products" className="price-box-link">
                    <div className="price-box">
                      <h3>{item.price}</h3>
                      <p>{item.text}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="price-tags">
              {priceTags.map((tag) => (
                <Link to="/products" className="price-tag" key={tag}>
                  {tag}
                </Link>
              ))}
            </div>

            <div className="price-filter-row">
              <div className="filter-box">
                <select
                  className="form-select field-control"
                  defaultValue=""
                >
                  <option value="">Item Type</option>
                  <option value="t-shirt">T-Shirt</option>
                  <option value="dress">Dress</option>
                  <option value="pants">Pants</option>
                  <option value="jacket">Jacket</option>
                  <option value="handbags">Handbags</option>
                </select>

                <p className="phase-note">
                  Item type options match the collection sections in the shop.
                </p>

                <Link
                  to="/products"
                  className="link-btn btn btn-outline-primary"
                >
                  View Item Type
                </Link>
              </div>

              <div className="filter-box">
                <select
                  className="form-select field-control"
                  defaultValue=""
                >
                  <option value="">Gender</option>
                  <option value="women">Women</option>
                  <option value="men">Men</option>
                  <option value="kids">Kids</option>
                </select>

                <p className="phase-note">
                  Gender options help customers compare Women, Men, and Kids.
                </p>

                <Link
                  to="/products"
                  className="link-btn btn btn-outline-primary"
                >
                  View Category
                </Link>
              </div>
            </div>

            <p className="phase-note text-center mt-4">
              Price, category, and special offers are shown clearly across the
              collection.
            </p>
          </div>
        </section>

        <section className="section-space top-deals-section">
          <div className="container">
            <h2 className="section-title">Our Top Deals</h2>

            <div className="row row-cols-1 row-cols-md-3 g-4 top-deals-grid">
              {deals.map((deal) => (
                <div className="col" key={deal.title}>
                  <Link to="/products" className="deal-link">
                    <div className="card deal-card h-100">
                      <img
                        src={deal.image}
                        className="card-img-top"
                        alt={deal.alt}
                      />

                      <div className="card-body">
                        <h4>{deal.title}</h4>
                        <p>{deal.text}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section-space feedback-section">
          <div className="container">
            <h2 className="section-title">Feedback</h2>

            <div className="feedback-list mb-4">
              {feedbacks.map((item, index) => (
                <div className="feedback-card" key={index}>
                  <div className="feedback-card-top">
                    <h5>{item.name}</h5>
                    <span>{"★".repeat(Number(item.rating))}</span>
                  </div>

                  <p>{item.message}</p>
                </div>
              ))}
            </div>

            <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
              <input
                type="text"
                name="feedbackName"
                className="form-control field-control mb-3"
                placeholder="Your Name"
              />

              <input
                type="email"
                name="feedbackEmail"
                className="form-control field-control mb-3"
                placeholder="Your Email"
              />

              <div className="rating-box mb-3">
                <p className="rating-title">Rate Us</p>

                <div className="rating-stars">
                  <input type="radio" id="star5" name="rating" value="5" />
                  <label htmlFor="star5">★</label>

                  <input type="radio" id="star4" name="rating" value="4" />
                  <label htmlFor="star4">★</label>

                  <input type="radio" id="star3" name="rating" value="3" />
                  <label htmlFor="star3">★</label>

                  <input type="radio" id="star2" name="rating" value="2" />
                  <label htmlFor="star2">★</label>

                  <input type="radio" id="star1" name="rating" value="1" />
                  <label htmlFor="star1">★</label>
                </div>
              </div>

              <textarea
                name="feedbackText"
                className="form-control field-control mb-3"
                rows="4"
                placeholder="Your Message"
              ></textarea>

              <button type="submit" className="feedback-btn btn btn-primary">
                Send Feedback
              </button>

              {feedbackMessage && (
                <p className="feedback-message">{feedbackMessage}</p>
              )}
            </form>
          </div>
        </section>
      
      </main>

      <Footer />
    </>
  );
}

export default Home;


