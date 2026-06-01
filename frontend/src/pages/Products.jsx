import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import StoreAssistant from "../components/StoreAssistant";
import StoreDomTools from "../components/StoreDomTools";
import {
  filterProducts,
  formatCurrency,
  getDiscountPercent,
  getProductsTotal,
  readStorageList,
  saveStorageList,
  sortProducts,
  validateEmail,
} from "../utils/storePracticalHelpers";

import collectionImg from "../assets/collection.png";

import pinkDress from "../assets/pink.webp";
import blueDress from "../assets/baby-blue-hijab-evening-dress-22.jpg";
import blueTshirt from "../assets/bluekid.png";
import brownTshirt from "../assets/brown.webp";
import pinkBag from "../assets/pink1.webp";
import blackBag from "../assets/blackbag.webp";

const products = [
  {
    image: pinkDress,
    badge: "-20%",
    title: "Pink Dress",
    subtitle: "Season Pick",
    text: "Soft pink tones for fresh daily looks.",
    price: "$39.99",
    oldPrice: "$49.99",
    colorClass: "swatch-pink",
    sizes: ["S", "M", "L", "XL"],
    category: "Women",
  },
  {
    image: blueDress,
    badge: "New",
    title: "Blue Dress",
    subtitle: "Easy Match",
    text: "Fresh style for simple daily outfits.",
    price: "$41.99",
    oldPrice: "",
    colorClass: "swatch-blue",
    sizes: ["S", "M", "L", "XL"],
    category: "Women",
  },
  {
    image: blueTshirt,
    badge: "",
    title: "Blue T-Shirt",
    subtitle: "Classic Fit",
    text: "Comfortable style for regular wear.",
    price: "$29.99",
    oldPrice: "",
    colorClass: "swatch-deep-blue",
    sizes: ["S", "M", "L", "XL"],
    category: "Kids",
  },
  {
    image: brownTshirt,
    badge: "",
    title: "Brown T-Shirt",
    subtitle: "Classic Fit",
    text: "Warm tone for casual everyday style.",
    price: "$29.99",
    oldPrice: "",
    colorClass: "swatch-brown",
    sizes: ["S", "M", "L", "XL"],
    category: "Men",
  },
  {
    image: pinkBag,
    badge: "Bag",
    title: "Pink Handbag",
    subtitle: "Soft Style",
    text: "Elegant bag for simple daily outfits.",
    price: "$29.99",
    oldPrice: "",
    colorClass: "swatch-bag-pink",
    sizes: ["Mini", "Small", "Medium"],
    category: "Handbags",
  },
  {
    image: blackBag,
    badge: "Bag",
    title: "Black Handbag",
    subtitle: "Classic Style",
    text: "Simple black bag for everyday use.",
    price: "$29.99",
    oldPrice: "",
    colorClass: "swatch-black",
    sizes: ["Mini", "Small", "Medium"],
    category: "Handbags",
  },
];

const features = [
  {
    title: "Paris-inspired style",
    text: "Soft fashion pieces for everyday elegance.",
  },
  {
    title: "Seasonal color choices",
    text: "Easy tones to match simple daily looks.",
  },
  {
    title: "Fast delivery service",
    text: "Quick shopping with smooth ordering steps.",
  },
  {
    title: "Carefully selected quality",
    text: "Comfortable items designed for regular wear.",
  },
];

function Products({ addToCart }) {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortMode, setSortMode] = useState("featured");
  const [maxBudget, setMaxBudget] = useState("");
  const [onlyOffers, setOnlyOffers] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [formMessageType, setFormMessageType] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [styleRequests, setStyleRequests] = useState(() =>
    readStorageList("fashion_store_style_requests", [])
  );

  const filteredProducts = sortProducts(
    filterProducts(products, searchText, selectedCategory, maxBudget, onlyOffers),
    sortMode
  );

  const visibleProductsTotal = getProductsTotal(filteredProducts);
  const visibleAveragePrice =
    filteredProducts.length === 0
      ? 0
      : visibleProductsTotal / filteredProducts.length;
  const offerCount = filteredProducts.filter(
    (product) => getDiscountPercent(product) > 0 || product.badge !== ""
  ).length;

  const handleStyleRequestSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const userId = form.elements.userId.value.trim();
    const userName = form.elements.userName.value.trim();
    const userEmail = form.elements.userEmail.value.trim();
    const backupEmail = form.elements.backupEmail.value.trim();
    const userPhone = form.elements.userPhone.value.trim();
    const mainCategory = form.elements.mainCategory.value;
    const interestedItems = [];

    if (form.elements.itemDress.checked) interestedItems.push(form.elements.itemDress.value);
    if (form.elements.itemBag.checked) interestedItems.push(form.elements.itemBag.value);
    if (form.elements.itemJeans.checked) interestedItems.push(form.elements.itemJeans.value);
    if (form.elements.itemBlouse.checked) interestedItems.push(form.elements.itemBlouse.value);

    if (userId.length < 4) {
      setFormMessage("ID must contain at least 4 characters.");
      setFormMessageType("error");
      return;
    }

    if (userName === "") {
      setFormMessage("Please enter your name.");
      setFormMessageType("error");
      return;
    }

    if (!validateEmail(userEmail)) {
      setFormMessage("Please enter a valid email address.");
      setFormMessageType("error");
      return;
    }

    if (backupEmail !== "" && !validateEmail(backupEmail)) {
      setFormMessage("Backup email is not valid.");
      setFormMessageType("error");
      return;
    }

    if (userPhone !== "" && userPhone.length < 6) {
      setFormMessage("Phone number is too short.");
      setFormMessageType("error");
      return;
    }

    if (interestedItems.length === 0) {
      setFormMessage("Choose at least one interested item.");
      setFormMessageType("error");
      return;
    }

    const request = {
      id: userId,
      name: userName,
      email: userEmail,
      category: mainCategory,
      items: interestedItems.join(", "),
      createdAt: new Date().toLocaleString(),
    };

    const nextRequests = [request, ...styleRequests].slice(0, 3);
    setStyleRequests(nextRequests);
    saveStorageList("fashion_store_style_requests", nextRequests);

    setFormMessage("Your style request was saved successfully in this browser.");
    setFormMessageType("success");
    form.reset();
  };

  const resetProductFilters = () => {
    setSearchText("");
    setSelectedCategory("All");
    setSortMode("featured");
    setMaxBudget("");
    setOnlyOffers(false);
  };

  const showCategoryProducts = (category) => {
    setSearchText("");
    setSelectedCategory(category);
    setMaxBudget("");
    setOnlyOffers(false);

    setTimeout(() => {
      document.getElementById("productCardsArea")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  };

  return (
    <div className="collection-page old-collection-page">
      <div className="top-bar">Spring Sale is Here! Enjoy up to 60% off</div>

      <header
        className="collection-page-hero"
        style={{ backgroundImage: `url(${collectionImg})` }}
      >
        <div className="collection-page-overlay"></div>

        <div className="container container-sm container-md container-lg container-xl container-xxl collection-page-hero-content">
          <h1 id="main-collection-title">Our Collection</h1>
          <p>
            <strong>Soft pieces</strong> for <em>daily style</em>,{" "}
            <u>easy matching</u>, and fresh seasonal looks.
          </p>
          <div className="hero-line"></div>
        </div>
      </header>

      <section className="section-space">
        <div className="container">
          <div className="section-heading">
            <h2>Featured Styles</h2>
            <p>
              Women, Men, Kids, and Handbags are grouped into a clean responsive
              layout.
            </p>
          </div>

          <div className="row row-cols-1 row-cols-md-4 g-3 text-center">
            {features.map((item) => (
              <div className="col" key={item.title}>
                <div className="feature-tile h-100 p-3">
                  <b>{item.title}</b>
                  <br />
                  <small>{item.text}</small>
                </div>
              </div>
            ))}
          </div>

          <div className="collection-grid-demo mt-4">
            <div className="row">
              <div className="col-sm-4 p-3 bg-primary text-white">
                Dress Picks
              </div>
              <div className="col-sm-8 p-3 bg-dark text-white">
                Soft dresses, matching bags, and easy daily outfits
              </div>
            </div>

            <div className="row row-cols-2 row-cols-md-4 g-3 mt-3">
              <div className="col">
                <button
                  type="button"
                  className="grid-demo-link btn btn-outline-primary w-100"
                  onClick={() => showCategoryProducts("Women")}
                >
                  Dresses
                </button>
              </div>

              <div className="col">
                <button
                  type="button"
                  className="grid-demo-link btn btn-outline-primary w-100"
                  onClick={() => showCategoryProducts("Men")}
                >
                  Tops
                </button>
              </div>

              <div className="col">
                <button
                  type="button"
                  className="grid-demo-link btn btn-outline-primary w-100"
                  onClick={() => showCategoryProducts("Kids")}
                >
                  Kids Wear
                </button>
              </div>

              <div className="col">
                <button
                  type="button"
                  className="grid-demo-link btn btn-outline-primary w-100"
                  onClick={() => showCategoryProducts("Handbags")}
                >
                  Handbags
                </button>
              </div>
            </div>
          </div>

          <div className="category-bar">
            <ul className="nav nav-pills nav-justified category-row">
              {["Women", "Men", "Kids", "Handbags"].map((category) => (
                <li className="nav-item" key={category}>
                  <button
                    type="button"
                    className={`nav-link category-pill ${
                      selectedCategory === category ? "active" : ""
                    }`}
                    onClick={() => showCategoryProducts(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <p className="collection-phase-note">
            Choose Women, Men, Kids, or Handbags to view matching collection
            styles.
          </p>

          <div className="quick-jump-actions mt-3">
            <ul className="nav nav-pills nav-justified">
              <li className="nav-item">
                <a className="nav-link active" href="#productsArea">
                  Products
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#size-guide">
                  Size Guide
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#delivery-info">
                  Delivery
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#returns-info">
                  Returns
                </a>
              </li>
            </ul>
          </div>

          <section className="bootstrap-slide-box mt-4">
            <h3>Season Highlights</h3>

            <ul
              className="nav nav-pills nav-justified season-pills"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="arrival-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#arrival-pane"
                  type="button"
                  role="tab"
                >
                  New Arrivals
                </button>
              </li>

              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="dress-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#dress-pane"
                  type="button"
                  role="tab"
                >
                  Soft Dresses
                </button>
              </li>

              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="gift-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#gift-pane"
                  type="button"
                  role="tab"
                >
                  Gift Picks
                </button>
              </li>

              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="bag-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#bag-pane"
                  type="button"
                  role="tab"
                >
                  Handbags
                </button>
              </li>
            </ul>

            <div className="tab-content season-tab-content">
              <div
                className="tab-pane fade show active"
                id="arrival-pane"
                role="tabpanel"
                aria-labelledby="arrival-tab"
                tabIndex="0"
              >
                Fresh outfits grouped by style, size, and color.
              </div>

              <div
                className="tab-pane fade"
                id="dress-pane"
                role="tabpanel"
                aria-labelledby="dress-tab"
                tabIndex="0"
              >
                Soft dresses with simple colors for daily elegance.
              </div>

              <div
                className="tab-pane fade"
                id="gift-pane"
                role="tabpanel"
                aria-labelledby="gift-tab"
                tabIndex="0"
              >
                Easy gift picks for birthdays, visits, and special days.
              </div>

              <div
                className="tab-pane fade"
                id="bag-pane"
                role="tabpanel"
                aria-labelledby="bag-tab"
                tabIndex="0"
              >
                Handbags selected to match dresses, tops, and casual looks.
              </div>
            </div>

            <div className="row row-cols-2 row-cols-md-4 g-3 text-center mt-3">
              <div className="col">
                <div className="p-3 bg-light border bootstrap-slide-item">
                  Dresses
                </div>
              </div>

              <div className="col">
                <div className="p-3 bg-light border bootstrap-slide-item">
                  Tops
                </div>
              </div>

              <div className="col">
                <div className="p-3 bg-light border bootstrap-slide-item">
                  Kids
                </div>
              </div>

              <div className="col">
                <div className="p-3 bg-light border bootstrap-slide-item">
                  Bags
                </div>
              </div>
            </div>
          </section>

          <section className="bootstrap-extra-box mt-4 pt-5">
            <h3>Collection Fit Guide</h3>

            <div className="container-fluid bootstrap-fluid-demo px-0">
              <div className="row g-3 text-center">
                <div className="col-3 col-sm-3 col-md-2 col-xl-3 col-xxl-2">
                  <div className="bootstrap-grid-card h-100 pt-3">Women</div>
                </div>

                <div className="col-9 col-sm-9 col-md-10 col-xl-9 col-xxl-10">
                  <div className="bootstrap-grid-card h-100">
                    Dresses, soft colors, handbags, and daily outfits
                  </div>
                </div>
              </div>

              <div className="row g-3 text-center mt-1">
                <div className="col-sm-3">
                  <div className="bootstrap-grid-card h-100">Sale</div>
                </div>

                <div className="col-sm-9">
                  <div className="bootstrap-grid-card h-100">
                    Seasonal offers grouped for easy shopping
                  </div>
                </div>
              </div>

              <div className="row g-3 text-center mt-1">
                <div className="col-xl-4 col-xxl-3">
                  <div className="bootstrap-grid-card h-100">Color Picks</div>
                </div>

                <div className="col-xl-8 col-xxl-9">
                  <div className="bootstrap-grid-card h-100">
                    Pink, blue, brown, black, and soft neutral styles
                  </div>
                </div>
              </div>

              <div className="row g-3 mt-1">
                <div className="col-sm-6">
                  <div className="bootstrap-grid-card h-100">
                    <div className="row g-2">
                      <div className="col-6">
                        <span className="nested-grid-chip">Kids</span>
                      </div>

                      <div className="col-6">
                        <span className="nested-grid-chip">Bags</span>
                      </div>

                      <div className="col-12">
                        <span className="nested-grid-chip">
                          Matching pieces
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="bootstrap-grid-card h-100">
                    <div className="row g-2">
                      <div className="col-4">
                        <span className="nested-grid-chip">S</span>
                      </div>

                      <div className="col-4">
                        <span className="nested-grid-chip">M</span>
                      </div>

                      <div className="col-4">
                        <span className="nested-grid-chip">L</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="css-slide-checklist mt-4">
            <style>{`
              .internal-slide-style {
                color: #244d4a;
                font-weight: 700;
              }
            `}</style>

            <h3 id="cssSlideTitle">Store Style Notes</h3>

            <p
              className="internal-slide-style inline-slide-style"
              style={{ borderStyle: "dashed" }}
            >
              Soft details, clean borders, and fresh colors support the
              collection mood.
            </p>

            <p className="css-font-demo">Fashion Store Style Preview</p>

            <p className="css-spacing-demo">
              Soft colors with letter spacing and word spacing.
            </p>

            <div className="position-slide-demo">
              <div className="position-static-demo">New Season</div>
              <div className="position-relative-demo">Soft Fit</div>
              <div className="position-absolute-demo">Quick Pick</div>
              <div className="position-sticky-demo">Daily Wear</div>
            </div>

            <table className="table table-bordered table-striped css-slide-table">
              <caption>Collection availability</caption>

              <tbody>
                <tr>
                  <td>Women</td>
                  <td>Dress</td>
                  <td>Available</td>
                </tr>

                <tr>
                  <td>Men</td>
                  <td>T-Shirt</td>
                  <td>Available</td>
                </tr>

                <tr>
                  <td>Bags</td>
                  <td>Handbag</td>
                  <td>New</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </section>

      <section
        id="productsArea"
        className="section-space products-section products-tight-section"
      >
        <div className="container">
          <h2 className="section-title">Products</h2>

          <div className="product-filter-box">
            <input
              type="text"
              className="form-control product-search-input"
              placeholder="Search products..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />

            <select
              className="form-select product-category-select"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Women">Women</option>
              <option value="Men">Men</option>
              <option value="Kids">Kids</option>
              <option value="Handbags">Handbags</option>
            </select>

            <select
              className="form-select product-category-select"
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
              <option value="discount">Best Discount</option>
            </select>

            <input
              type="number"
              min="1"
              className="form-control product-search-input"
              placeholder="Max budget"
              value={maxBudget}
              onChange={(event) => setMaxBudget(event.target.value)}
            />

            <label className="btn btn-outline-primary mb-0">
              <input
                type="checkbox"
                className="me-2"
                checked={onlyOffers}
                onChange={(event) => setOnlyOffers(event.target.checked)}
              />
              Offers only
            </label>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetProductFilters}
            >
              Reset
            </button>
          </div>

          <div className="row row-cols-1 row-cols-md-3 g-3 text-center mb-4">
            <div className="col">
              <div className="feature-tile h-100 p-3">
                <b>{filteredProducts.length}</b>
                <br />
                <small>matching products</small>
              </div>
            </div>
            <div className="col">
              <div className="feature-tile h-100 p-3">
                <b>{formatCurrency(visibleAveragePrice)}</b>
                <br />
                <small>average visible price</small>
              </div>
            </div>
            <div className="col">
              <div className="feature-tile h-100 p-3">
                <b>{offerCount}</b>
                <br />
                <small>offers in results</small>
              </div>
            </div>
          </div>

          <StoreAssistant
            products={products}
            visibleProducts={filteredProducts}
            onChooseCategory={setSelectedCategory}
          />

          <StoreDomTools products={products} />

          <div
            id="productCardsArea"
            className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mt-4"
          >
            {filteredProducts.map((product) => (
              <div className="col" key={product.title}>
                <ProductCard product={product} onAdd={addToCart} />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="no-products-message">
              No products found. Try another search or category.
            </p>
          )}
        </div>
      </section>

      <section className="section-space bg-light-section">
        <div className="container">
          <div className="row g-4">
            <aside className="col-lg-6">
              <div className="notes-box h-100">
                <h3>Collection Information</h3>

                <p>
                  <b>Carefully selected</b> pieces for <i>daily style</i>,{" "}
                  <u>easy matching</u>, and soft seasonal looks.
                </p>

                <h4 className="internal-style-heading">
                  collection style notes
                </h4>

                <h5 className="internal-style-note">
                  soft colors, easy matching, and daily comfort
                </h5>

                <div className="quote-box">
                  <blockquote>
                    <strong>Customer note:</strong> These styles are elegant,
                    practical, and easy to wear every day.
                  </blockquote>
                </div>

                <p>
                  <mark>Featured tip:</mark> choose one basic item and one soft
                  accessory for a balanced outfit.
                </p>

                <ul className="notes-list">
                  <li>Soft seasonal colors that match different looks.</li>
                  <li>Multiple size options available for each item.</li>
                  <li>Clear prices and highlighted offer tags.</li>
                  <li>Stock updates every week.</li>
                  <li>
                    <em>Simple shopping flow</em> with size guide and request
                    form.
                  </li>
                </ul>

                <p>
                  <q>Good basics make styling easier.</q>
                </p>

                <p className="static-demo">
                  <b>Store notice:</b> all measurements are general and may vary
                  slightly by product design.
                </p>

                <div className="float-box-left">
                  Women
                  <br />
                  soft tones
                  <br />
                  fresh looks
                </div>

                <div className="float-box-right">
                  Men
                  <br />
                  daily basics
                  <br />
                  simple style
                </div>

                <div className="clear-box"></div>

                <pre className="pre-box">{`Care Tips
Wash cold
Dry flat
Do not bleach`}</pre>
              </div>
            </aside>

            <article className="col-lg-6">
              <div className="table-box h-100">
                <h3 id="size-guide">Quick Size Guide</h3>

                <div className="table-wrap">
                  <table className="table table-bordered table-striped size-table">
                    <caption>
                      General size chart with bottom alignment example
                    </caption>

                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Small</th>
                        <th>Medium</th>
                        <th>Large</th>
                        <th>Extra Large</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Women</td>
                        <td>Chest 84</td>
                        <td>Chest 88</td>
                        <td>Chest 94</td>
                        <td>Chest 100</td>
                      </tr>

                      <tr>
                        <td>Men</td>
                        <td>Chest 92</td>
                        <td>Chest 98</td>
                        <td>Chest 104</td>
                        <td>Chest 110</td>
                      </tr>

                      <tr>
                        <td>Kids</td>
                        <td>2-3Y</td>
                        <td>4-5Y</td>
                        <td>6-7Y</td>
                        <td>8-9Y</td>
                      </tr>

                      <tr className="bottom-align-row">
                        <td>Bags</td>
                        <td>Mini</td>
                        <td>Small</td>
                        <td>Medium</td>
                        <td>&nbsp;</td>
                      </tr>
                    </tbody>

                    <tfoot>
                      <tr>
                        <td colSpan="5">
                          Measurements are general and may vary slightly by
                          item.
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <ul
                  className="nav nav-tabs nav-justified product-info-tabs mt-4"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="size-info-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#size-info-pane"
                      type="button"
                      role="tab"
                      aria-controls="size-info-pane"
                      aria-selected="true"
                    >
                      Size Guide
                    </button>
                  </li>

                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="delivery-info-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#delivery-info-pane"
                      type="button"
                      role="tab"
                      aria-controls="delivery-info-pane"
                      aria-selected="false"
                    >
                      Delivery
                    </button>
                  </li>

                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="returns-info-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#returns-info-pane"
                      type="button"
                      role="tab"
                      aria-controls="returns-info-pane"
                      aria-selected="false"
                    >
                      Returns
                    </button>
                  </li>

                  <li className="nav-item dropdown" role="presentation">
                    <button
                      className="nav-link dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      More
                    </button>

                    <ul className="dropdown-menu">
                      <li>
                        <button
                          className="dropdown-item"
                          id="care-info-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#care-info-pane"
                          type="button"
                          role="tab"
                          aria-controls="care-info-pane"
                          aria-selected="false"
                        >
                          Customer Care
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item"
                          id="fabric-info-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#fabric-info-pane"
                          type="button"
                          role="tab"
                          aria-controls="fabric-info-pane"
                          aria-selected="false"
                        >
                          Fabric Tips
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>

                <div className="tab-content product-info-tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="size-info-pane"
                    role="tabpanel"
                    aria-labelledby="size-info-tab"
                    tabIndex="0"
                  >
                    Use the chart above and choose the closest comfortable fit.
                  </div>

                  <div
                    className="tab-pane fade"
                    id="delivery-info-pane"
                    role="tabpanel"
                    aria-labelledby="delivery-info-tab"
                    tabIndex="0"
                  >
                    Orders are prepared carefully and delivered in 2 to 5
                    business days.
                  </div>

                  <div
                    className="tab-pane fade"
                    id="returns-info-pane"
                    role="tabpanel"
                    aria-labelledby="returns-info-tab"
                    tabIndex="0"
                  >
                    Clean and unused items can be exchanged according to store
                    policy.
                  </div>

                  <div
                    className="tab-pane fade"
                    id="care-info-pane"
                    role="tabpanel"
                    aria-labelledby="care-info-tab"
                    tabIndex="0"
                  >
                    Our customer care team can help with size, delivery, and
                    exchange questions.
                  </div>

                  <div
                    className="tab-pane fade"
                    id="fabric-info-pane"
                    role="tabpanel"
                    aria-labelledby="fabric-info-tab"
                    tabIndex="0"
                  >
                    Wash gently and check the care instructions before cleaning
                    each item.
                  </div>
                </div>

             <div className="details-actions">
  <Link
    to="/size-guide"
    className="link-btn view-size-help-btn btn btn-outline-primary mt-3"
  >
    View Size Help
  </Link>

  <button
    type="button"
    className="link-btn btn btn-outline-primary mt-3"
    onClick={() => setShowDetails(!showDetails)}
  >
    {showDetails ? "Hide Details" : "Show Details"}
  </button>
</div>

{showDetails && (
  <dl className="service-list show-hide-details-box">
    <dt id="delivery-info">Delivery</dt>
    <dd>2 to 5 business days in most areas.</dd>

    <dt id="returns-info">Returns</dt>
    <dd>
      Available for size replacement when stock is available.
    </dd>

    <dt>Best Use</dt>
    <dd>
      Daily wear, weekend styling, and simple matching looks.
    </dd>

    <dt>Care Tips</dt>
    <dd>
      Wash cold, dry flat, and do not bleach.
    </dd>
  </dl>
)}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-5">
              <img
                src={collectionImg}
                alt="Collection banner"
                className="collection-banner-img"
              />
            </div>

            <div className="col-lg-7">
              <div className="form-box">
                <h3>Style Request Form</h3>
                <p>Send your size and category preference.</p>

                <form onSubmit={handleStyleRequestSubmit}>
                  <div className="row">
                    <div className="col-sm-6 mb-3">
                      <label htmlFor="userId" className="form-label-text">
                        ID
                      </label>

                      <input
                        type="text"
                        id="userId"
                        name="userId"
                        className="form-control field-control"
                        maxLength="9"
                        required
                      />
                    </div>

                    <div className="col-sm-6 mb-3">
                      <label htmlFor="userName" className="form-label-text">
                        Name
                      </label>

                      <input
                        type="text"
                        id="userName"
                        name="userName"
                        className="form-control field-control"
                      />
                    </div>

                    <div className="col-sm-6 mb-3">
                      <label htmlFor="previewName" className="form-label-text">
                        Delivery Name
                      </label>

                      <input
                        type="text"
                        id="previewName"
                        name="previewName"
                        className="form-control field-control"
                        placeholder="Name for delivery"
                      />
                    </div>

                    <div className="col-sm-6 mb-3">
                      <label htmlFor="userEmail" className="form-label-text">
                        Email
                      </label>

                      <input
                        type="email"
                        id="userEmail"
                        name="userEmail"
                        className="form-control field-control"
                      />
                    </div>

                    <div className="col-sm-6 mb-3">
                      <label htmlFor="backupEmail" className="form-label-text">
                        Backup Email
                      </label>

                      <input
                        type="email"
                        id="backupEmail"
                        name="backupEmail"
                        className="form-control field-control"
                      />
                    </div>

                    <div className="col-sm-6 mb-3">
                      <label htmlFor="userPassword" className="form-label-text">
                        Password
                      </label>

                      <input
                        type="password"
                        id="userPassword"
                        name="userPassword"
                        className="form-control field-control"
                      />
                    </div>

                    <div className="col-sm-6 mb-3">
                      <label htmlFor="userPhone" className="form-label-text">
                        Phone
                      </label>

                      <input
                        type="number"
                        id="userPhone"
                        name="userPhone"
                        className="form-control field-control"
                      />
                    </div>
                  </div>

                  <div className="option-demo-line">
                    <b>Preferred Category:</b>

                    <label>
                      <input
                        type="radio"
                        name="mainCategory"
                        value="Women"
                        defaultChecked
                      />{" "}
                      Women
                    </label>

                    <label>
                      <input type="radio" name="mainCategory" value="Men" /> Men
                    </label>

                    <label>
                      <input type="radio" name="mainCategory" value="Kids" />{" "}
                      Kids
                    </label>
                  </div>

                  <div className="option-demo-line">
                    <b>Interested In:</b>

                    <label>
                      <input type="checkbox" name="itemDress" value="Dress" />{" "}
                      Dress
                    </label>

                    <label>
                      <input type="checkbox" name="itemBag" value="Bag" /> Bag
                    </label>

                    <label>
                      <input type="checkbox" name="itemJeans" value="Jeans" />{" "}
                      Jeans
                    </label>

                    <label>
                      <input type="checkbox" name="itemBlouse" value="Blouse" />{" "}
                      Blouse
                    </label>
                  </div>

                  <div className="row">
                    <div className="col-sm-4 mb-3">
                      <label htmlFor="ageChoice" className="form-label-text">
                        Age Group
                      </label>

                      <select
                        name="ageChoice"
                        id="ageChoice"
                        className="form-select field-control"
                        defaultValue="20"
                      >
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                      </select>
                    </div>

                    <div className="col-sm-4 mb-3">
                      <label htmlFor="visitDate" className="form-label-text">
                        Preferred Date
                      </label>

                      <input
                        type="date"
                        id="visitDate"
                        name="visitDate"
                        className="form-control field-control"
                      />
                    </div>

                    <div className="col-sm-4 mb-3">
                      <label htmlFor="visitTime" className="form-label-text">
                        Preferred Time
                      </label>

                      <input
                        type="time"
                        id="visitTime"
                        name="visitTime"
                        className="form-control field-control"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="comments" className="form-label-text">
                      Comments
                    </label>

                    <textarea
                      id="comments"
                      name="comments"
                      rows="5"
                      className="form-control field-control"
                      placeholder="Enter your comments"
                    ></textarea>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="link-btn btn btn-primary">
                      Confirm
                    </button>

                    <button
                      type="reset"
                      className="link-btn secondary btn btn-secondary"
                      onClick={() => {
                        setFormMessage("");
                        setFormMessageType("");
                      }}
                    >
                      Reset
                    </button>

                    <Link
                      to="/contact"
                      className="link-btn btn btn-outline-primary"
                    >
                      Register
                    </Link>
                  </div>

                  {formMessage && (
                    <p className={`form-validation-message ${formMessageType}`}>
                      {formMessage}
                    </p>
                  )}

                  {styleRequests.length > 0 && (
                    <div className="mt-3">
                      <h4>Last saved requests</h4>
                      <ul className="notes-list">
                        {styleRequests.map((request) => (
                          <li key={request.id + request.createdAt}>
                            {request.name} requested {request.items} for {request.category}
                            <br />
                            <small>{request.createdAt}</small>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space media-layout-section">
        <div className="container">
          <div className="row g-4">
            <aside className="col-lg-5">
              <div className="media-box h-100">
                <h3>Collection Media</h3>
                <p>This side box keeps the collection theme.</p>

                <ol type="A" className="order-list">
                  <li>
                    Collection highlights
                    <ul className="nested-list">
                      <li>Soft dresses</li>
                      <li>Casual shirts</li>
                      <li>Classic t-shirts</li>
                      <li>Elegant handbags</li>
                    </ul>
                  </li>

                  <li>Watch a boutique-style collection video.</li>
                  <li>See layout blocks used for product presentation.</li>
                  <li>Move over the image to see a hover effect.</li>
                </ol>

                <p>
                  <b>Style Preview</b>
                </p>

                <p className="text-center">
                  <img
                    src={pinkDress}
                    alt="Hover example"
                    width="150"
                    height="150"
                    className="hover-demo-image"
                    title="Move over the image"
                  />
                </p>

                <details className="details-area" open>
                  <summary>
                    <b>Preview Media</b>
                  </summary>

                  <p>
                    <small>Local collection image preview</small>
                  </p>

                  <video
                    width="320"
                    height="240"
                    controls
                    poster={collectionImg}
                  >
                    Your browser does not support the video tag.
                  </video>

                  <img
                    src={blueDress}
                    alt="Blue dress preview"
                    className="details-preview-img"
                  />
                </details>
              </div>
            </aside>

            <div className="col-lg-7">
              <div className="grid-examples-box h-100">
                <h3>Quick Category Preview</h3>

                <ul type="square" className="html-type-list">
                  <li>Women collection</li>
                  <li>Men collection</li>
                  <li>Kids collection</li>
                </ul>

                <ol type="i" start="3" className="html-type-list">
                  <li>Choose your item</li>
                  <li>Check the size</li>
                  <li>Complete the order</li>
                </ol>

                <div className="inline-grid-title">Category Layout</div>

                <div className="inline-grid-demo">
                  <div>Women</div>
                  <div>Men</div>
                  <div>Kids</div>
                  <div>Bags</div>
                </div>

                <div className="layout-demo">
                  <div className="layout-head">Collection Header</div>
                  <div className="layout-menu">Categories</div>
                  <div className="layout-main">Products</div>
                  <div className="layout-extra">Details</div>
                  <div className="layout-foot">Footer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex-demo-box">
        <h3>Category Row</h3>
        <p>Shop the main collection sections.</p>

        <div className="flex-course-demo">
          <div className="flex-demo-item">Women</div>
          <div className="flex-demo-item">Men</div>
          <div className="flex-demo-item">Kids</div>
          <div className="flex-demo-item">Bags</div>
          <div className="flex-demo-item">Sale</div>
          <div className="flex-demo-item">New</div>
        </div>
      </section>

      <section className="image-text-box">
        <h3>Collection Mood Banner</h3>

        <div className="image-text-container">
          <img src={collectionImg} alt="Collection Banner" />
          <div className="image-text-center">Soft Everyday Elegance</div>
        </div>
      </section>

      <section className="w3-extra-box">
        <div className="container p-5 my-5 border">
          <h3 className="shadow-heading">Collection Shopping Guide</h3>

          <div className="background-short-demo p-5 my-5 bg-primary text-white">
            <b>Season Style Message</b>
            <br />
            Soft colors, simple silhouettes, and practical pieces create a clean
            daily fashion look for women, men, kids, and handbags.
          </div>

          <div className="outline-style-box p-5 my-5 bg-dark text-white">
            Boutique Collection Focus
          </div>

          <p>
            Quick links below help visitors move directly to the most important
            collection categories.
          </p>

          <div className="link-buttons-demo">
            <Link to="/products">Shop Women</Link>
            <Link to="/products">Shop Men</Link>
            <Link to="/products">Shop Bags</Link>
          </div>

          <div className="border-style-row">
            <span className="border-groove">Soft Lace</span>
            <span className="border-ridge">Satin Trim</span>
            <span className="border-inset">Daily Fit</span>
            <span className="border-outset">Gift Wrap</span>
            <span className="border-hidden">Clean Finish</span>
            <span className="border-none">No Border</span>
            <span className="border-mix">Mixed Detail</span>
          </div>

          <p className="border-bottom-demo">
            Red bottom border highlights an important collection note.
          </p>

          <div className="slide-text-demo">
            <p className="justify-style-note">
              Each order is checked by category, size, and fabric note so the
              customer gets a clear and comfortable shopping experience from
              first look to final delivery.
            </p>

            <p className="text-decoration-row">
              <span className="overline-note">New Season</span>
              <span className="line-through-note">Old Stock</span>
              <span className="courier-aqua-note">Aqua Code</span>
            </p>
          </div>

          <p>Style steps for a balanced outfit:</p>

          <ol className="upper-roman-list">
            <li>Pick a main color.</li>
            <li>Choose the right size.</li>
            <li>Add one accessory.</li>
          </ol>

          <ol className="lower-alpha-list">
            <li>Soft fabric.</li>
            <li>Easy delivery.</li>
            <li>Simple returns.</li>
          </ol>

          <ol className="lower-greek-list">
            <li>Choose a clear main piece.</li>
            <li>Add one matching accessory.</li>
            <li>Use the size guide before ordering.</li>
          </ol>

          <ul className="square-style-list">
            <li>Check fabric care before washing.</li>
            <li>Match colors with one accessory.</li>
            <li>Keep delivery details ready.</li>
          </ul>

          <table className="table table-bordered table-striped table-extra-demo">
            <tbody>
              <tr>
                <td>Fold</td>
                <td>Pack</td>
                <td>Send</td>
              </tr>

              <tr>
                <td>Check</td>
                <td>Wrap</td>
                <td>Ready</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <Link
        to="/support"
        className="floating-help-btn fixed-bottom btn btn-outline-primary"
      >
        Need Help?
      </Link>

      <Footer />
    </div>
  );
}

export default Products;
