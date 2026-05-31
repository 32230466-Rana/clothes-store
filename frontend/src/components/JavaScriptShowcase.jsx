import { useState } from "react";

const jsProducts = [
  {
    id: 1,
    title: "Pink Dress",
    category: "Women",
    price: 39.99,
    discount: 20,
    inStock: true,
  },
  {
    id: 2,
    title: "Blue Dress",
    category: "Women",
    price: 41.99,
    discount: 10,
    inStock: true,
  },
  {
    id: 3,
    title: "Brown T-Shirt",
    category: "Men",
    price: 29.99,
    discount: 5,
    inStock: true,
  },
  {
    id: 4,
    title: "Blue T-Shirt",
    category: "Kids",
    price: 29.99,
    discount: 0,
    inStock: false,
  },
  {
    id: 5,
    title: "Pink Handbag",
    category: "Handbags",
    price: 29.99,
    discount: 15,
    inStock: true,
  },
];

const dataTypeExamples = [
  { name: "price", value: 39.99 },
  { name: "storeName", value: "Fashion Store" },
  { name: "isOpen", value: true },
  { name: "selectedSize", value: undefined },
  { name: "emptyNote", value: null },
];

function formatCurrency(value) {
  return "$" + value.toFixed(2);
}

function calculateFinalPrice(price, discount) {
  return price - (price * discount) / 100;
}

function getCategoryMessage(category) {
  switch (category) {
    case "Women":
      return "Women styles focus on dresses, soft colors, and elegant daily looks.";
    case "Men":
      return "Men styles focus on simple shirts and comfortable everyday basics.";
    case "Kids":
      return "Kids styles focus on easy movement, comfort, and fresh colors.";
    case "Handbags":
      return "Handbags are selected to match dresses, casual outfits, and gifts.";
    default:
      return "All categories are shown together for a full collection preview.";
  }
}

const getAveragePrice = (items) => {
  if (items.length === 0) {
    return 0;
  }

  let total = 0;

  for (const item of items) {
    total += item.price;
  }

  return total / items.length;
};

function JavaScriptShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [budget, setBudget] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("No product selected yet.");
  const [showDetails, setShowDetails] = useState(true);
  const [cityInput, setCityInput] = useState("");
  const [addToTop, setAddToTop] = useState(false);
  const [cities, setCities] = useState(["Beirut", "Tripoli", "Jounieh"]);
  const [selectedCityIndex, setSelectedCityIndex] = useState("0");
  const [cityMessage, setCityMessage] = useState("");
  const [timerMessage, setTimerMessage] = useState("Click the timer button to start.");
  const [clockMessage, setClockMessage] = useState("Clock not checked yet.");

  const filteredItems = jsProducts.filter((item) => {
    return selectedCategory === "All" || item.category === selectedCategory;
  });

  let stockCount = 0;

  for (const item of filteredItems) {
    if (item.inStock) {
      stockCount++;
    }
  }

  let previewNames = "";
  let index = 0;

  while (index < filteredItems.length && index < 3) {
    previewNames +=
      index === 0 ? filteredItems[index].title : ", " + filteredItems[index].title;
    index++;
  }

  const averagePrice = getAveragePrice(filteredItems);
  const budgetNumber = Number(budget);

  let budgetMessage = "Enter a budget to compare it with the average price.";

  if (budget !== "" && isNaN(budgetNumber)) {
    budgetMessage = "Budget must be a valid number.";
  } else if (budget !== "" && budgetNumber >= averagePrice) {
    budgetMessage = `Your budget ${formatCurrency(
      budgetNumber
    )} can cover the average item price ${formatCurrency(averagePrice)}.`;
  } else if (budget !== "") {
    budgetMessage = `Your budget ${formatCurrency(
      budgetNumber
    )} is lower than the average item price ${formatCurrency(averagePrice)}.`;
  }

  const handleProductClick = (event) => {
    const title = event.currentTarget.dataset.title;
    const category = event.currentTarget.dataset.category;
    const itemIndex = event.currentTarget.dataset.index;

    setSelectedProduct(
      `Selected item ${Number(itemIndex) + 1}: ${title} from ${category}`
    );

    event.currentTarget.classList.toggle("active");
    event.currentTarget.blur();
  };

  const handleCitySubmit = (event) => {
    event.preventDefault();

    const trimmedCity = cityInput.trim();

    if (trimmedCity === "") {
      setCityMessage("Please enter a city name first.");
      return;
    }

    const newCity = trimmedCity.charAt(0).toUpperCase() + trimmedCity.slice(1);

    if (addToTop) {
      setCities([newCity, ...cities]);
      setSelectedCityIndex("0");
    } else {
      setCities([...cities, newCity]);
      setSelectedCityIndex(String(cities.length));
    }

    setCityInput("");
    setCityMessage(`${newCity} was added successfully.`);
  };

  const handleRemoveCity = () => {
    if (cities.length === 0) {
      setCityMessage("There are no cities to remove.");
      return;
    }

    const removeIndex = Number(selectedCityIndex);
    const removedCity = cities[removeIndex];
    const updatedCities = cities.filter((city, cityIndex) => {
      return cityIndex !== removeIndex;
    });

    setCities(updatedCities);
    setSelectedCityIndex("0");
    setCityMessage(`${removedCity} was removed from the list.`);
  };

  const handleMouseOver = (event) => {
    event.currentTarget.style.backgroundColor = "#fff6e6";

    const text = event.currentTarget.querySelector(".js-hover-text");

    if (text) {
      text.innerHTML = "Mouse over changed this card style.";
    }
  };

  const handleMouseOut = (event) => {
    event.currentTarget.style.backgroundColor = "";

    const text = event.currentTarget.querySelector(".js-hover-text");

    if (text) {
      text.innerHTML = "Move the mouse over this box.";
    }
  };

  const handleDomMessage = () => {
    const message = document.querySelector("#jsDomMessage");

    if (message) {
      message.innerHTML = "DOM message changed using querySelector and innerHTML.";
      message.classList.toggle("text-success");
    }
  };

  const handleTimer = () => {
    setTimerMessage("Timer started. Wait one second...");

    setTimeout(() => {
      setTimerMessage("Timer finished: the special offer reminder is ready.");
    }, 1000);
  };

  const handleClock = () => {
    const now = new Date();
    setClockMessage("Current time: " + now.toLocaleTimeString());
  };

  const handleAlert = () => {
    alert("Welcome to Fashion Store JavaScript practice!");
  };

  return (
    <section className="section-space bg-light-section js-showcase-section">
      <div className="container">
        <div className="section-heading">
          <h2>JavaScript Practice in the Store</h2>
          <p>
            This section applies variables, data types, operators, conditions,
            switch, loops, functions, arrays, events, DOM manipulation, and data
            attributes in one interactive store example.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-lg-7">
            <div className="card h-100 p-3">
              <h3>Product Logic</h3>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label">Choose Category</label>
                  <select
                    className="form-select field-control"
                    value={selectedCategory}
                    onChange={(event) => setSelectedCategory(event.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                    <option value="Kids">Kids</option>
                    <option value="Handbags">Handbags</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Budget Calculator</label>
                  <input
                    type="text"
                    className="form-control field-control"
                    placeholder="Example: 35"
                    value={budget}
                    onChange={(event) => setBudget(event.target.value)}
                  />
                </div>
              </div>

              <p>
                <strong>Switch result:</strong> {getCategoryMessage(selectedCategory)}
              </p>
              <p>
                <strong>Filtered items:</strong> {filteredItems.length} |{" "}
                <strong>In stock:</strong> {stockCount} |{" "}
                <strong>Average price:</strong> {formatCurrency(averagePrice)}
              </p>
              <p>
                <strong>While-loop preview:</strong>{" "}
                {previewNames || "No items available for this category."}
              </p>
              <p className="alert alert-info mb-3">{budgetMessage}</p>

              <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Final</th>
                      <th>Status</th>
                      <th>Event</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredItems.map((item, itemIndex) => (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
                        <td>{formatCurrency(item.price)}</td>
                        <td>
                          {formatCurrency(
                            calculateFinalPrice(item.price, item.discount)
                          )}
                        </td>
                        <td>{item.inStock ? "Available" : "Out of stock"}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            data-title={item.title}
                            data-category={item.category}
                            data-index={itemIndex}
                            onClick={handleProductClick}
                          >
                            Select
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mb-0">
                <strong>Dataset result:</strong> {selectedProduct}
              </p>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card h-100 p-3">
              <h3>Add / Remove Delivery Cities</h3>

              <form onSubmit={handleCitySubmit}>
                <label className="form-label">City Name</label>
                <input
                  type="text"
                  className="form-control field-control mb-2"
                  value={cityInput}
                  onChange={(event) => setCityInput(event.target.value)}
                  placeholder="Enter city"
                />

                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="addToTop"
                    checked={addToTop}
                    onChange={(event) => setAddToTop(event.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="addToTop">
                    Add to top
                  </label>
                </div>

                <div className="d-flex gap-2 flex-wrap mb-3">
                  <button type="submit" className="btn btn-primary">
                    Add City
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={handleRemoveCity}
                  >
                    Remove Selected
                  </button>
                </div>
              </form>

              <select
                className="form-select field-control mb-3"
                value={selectedCityIndex}
                onChange={(event) => setSelectedCityIndex(event.target.value)}
              >
                {cities.map((city, cityIndex) => (
                  <option key={city + cityIndex} value={cityIndex}>
                    {city}
                  </option>
                ))}
              </select>

              {cityMessage && <p className="alert alert-secondary">{cityMessage}</p>}

              <button
                type="button"
                className="btn btn-outline-primary mb-3"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? "Hide JS Details" : "Show JS Details"}
              </button>

              {showDetails && (
                <div className="border rounded p-3">
                  <p>
                    <strong>Array length:</strong> {cities.length}
                  </p>
                  <p>
                    <strong>Template literal:</strong>{" "}
                    {`We deliver to ${cities.length} cities.`}
                  </p>
                  <p>
                    <strong>Strict comparison:</strong>{" "}
                    {selectedCategory === "All" ? "All categories selected" : "One category selected"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="row g-4 mt-1">
          <div className="col-lg-6">
            <div className="card h-100 p-3">
              <h3>DOM and Events</h3>

              <div
                className="border rounded p-3 mb-3"
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <p className="js-hover-text mb-0">Move the mouse over this box.</p>
              </div>

              <p id="jsDomMessage" className="border rounded p-3">
                This text will change using DOM selection.
              </p>

              <div className="d-flex gap-2 flex-wrap">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={handleDomMessage}
                >
                  Change DOM Text
                </button>

                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={handleTimer}
                >
                  Start Timer
                </button>

                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={handleClock}
                >
                  Show Clock
                </button>

                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={handleAlert}
                >
                  Show Alert
                </button>
              </div>

              <p className="mt-3 mb-1">{timerMessage}</p>
              <p className="mb-0">{clockMessage}</p>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100 p-3">
              <h3>Data Types</h3>

              <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle">
                  <thead>
                    <tr>
                      <th>Variable</th>
                      <th>Value</th>
                      <th>typeof</th>
                    </tr>
                  </thead>

                  <tbody>
                    {dataTypeExamples.map((item) => (
                      <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>{String(item.value)}</td>
                        <td>{typeof item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mb-0">
                String method example: {"Fashion Store".toUpperCase()} has{" "}
                {"Fashion Store".length} characters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JavaScriptShowcase;
