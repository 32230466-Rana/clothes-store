import { useEffect, useState } from "react";
import {
  buildOrderCode,
  calculateDeliveryFee,
  createReverseCategoryList,
  createStockSequence,
  getValueType,
  normalizeCustomerInput,
  summarizeCategoriesWithVar,
} from "../utils/storePracticalHelpers";

function StoreDomTools({ products = [] }) {
  const [message, setMessage] = useState("Use the tools below to manage store data.");
  const [policy, setPolicy] = useState("Policy not loaded yet.");
  const [sequence, setSequence] = useState([]);

  const firstImage = products[0]?.image || "";
  const secondImage = products[1]?.image || firstImage;
  const categorySummary = summarizeCategoriesWithVar(products.slice(0, 4));
  const reverseCategories = createReverseCategoryList(products.slice(0, 4)).join(" > ");

  useEffect(() => {
    const firstInput = document.querySelector("#stockCodeInput");

    if (firstInput) {
      firstInput.dataset.ready = "true";
    }
  }, []);

  const setStatus = (text, type = "success") => {
    const statusBox = document.getElementById("domToolsStatus");

    if (statusBox) {
      statusBox.innerHTML = text;
      statusBox.classList.remove("success", "error");
      statusBox.classList.add(type);
    }

    setMessage(text);
  };

  const addStockRow = () => {
    const tables = document.getElementsByTagName("table");
    const stockTable = document.getElementById("stockTable") || tables[tables.length - 1];
    const codeInput = document.getElementById("stockCodeInput");
    const noteInput = document.getElementById("stockNoteInput");

    const code = normalizeCustomerInput(codeInput?.value);
    const note = normalizeCustomerInput(noteInput?.value);

    if (code === "" || note === "") {
      setStatus("Add a product code and a stock note first.", "error");
      return;
    }

    const row = document.createElement("tr");
    row.className = "stock-row";
    row.dataset.code = code;

    const codeCell = document.createElement("td");
    const noteCell = document.createElement("td");
    const typeCell = document.createElement("td");
    const actionCell = document.createElement("td");
    const removeButton = document.createElement("button");

    codeCell.innerHTML = code;
    noteCell.innerHTML = note;
    typeCell.innerHTML = getValueType(note);

    removeButton.type = "button";
    removeButton.className = "btn btn-sm btn-secondary";
    removeButton.innerText = "Remove";
    removeButton.onclick = function () {
      row.remove();
      setStatus("Stock row removed.");
    };

    actionCell.appendChild(removeButton);
    row.appendChild(codeCell);
    row.appendChild(noteCell);
    row.appendChild(typeCell);
    row.appendChild(actionCell);
    stockTable.querySelector("tbody").appendChild(row);

    codeInput.value = "";
    noteInput.value = "";

    const rows = document.getElementsByClassName("stock-row");
    setStatus(`Stock row added. Active rows: ${rows.length}.`);
  };

  const addCity = () => {
    const select = document.getElementById("deliveryCitySelect");
    const cityInput = document.getElementById("deliveryCityInput");
    const addToTopCheckBox = document.getElementById("addCityToTop");
    const city = normalizeCustomerInput(cityInput?.value);

    if (city === "") {
      setStatus("Write a delivery city first.", "error");
      return;
    }

    const newCity = document.createElement("option");
    newCity.innerText = city;
    newCity.value = city.toLowerCase();

    if (addToTopCheckBox.checked) {
      select.insertBefore(newCity, select.firstChild);
    } else {
      select.appendChild(newCity);
    }

    cityInput.value = "";
    setStatus(`City added. Total cities: ${select.children.length}.`);
  };

  const removeCity = () => {
    const select = document.getElementById("deliveryCitySelect");

    if (!select || select.selectedIndex < 0) {
      setStatus("Choose a city to remove.", "error");
      return;
    }

    const removed = select.options[select.selectedIndex].text;
    select.remove(select.selectedIndex);
    setStatus(`${removed} removed from delivery cities.`);
  };

  const calculateShipping = () => {
    const radios = document.getElementsByName("shippingSpeed");
    let selectedSpeed = "standard";

    for (const radio of radios) {
      if (radio.checked) {
        selectedSpeed = radio.value;
      }
    }

    const fee = calculateDeliveryFee(selectedSpeed);
    const orderCode = buildOrderCode("FS");
    setStatus(`Delivery fee: $${fee}. Order code: ${orderCode}.`);
  };

  const toggleDetails = () => {
    const details = document.querySelector(".dom-tools-details");

    if (!details) {
      return;
    }

    details.style.display = details.style.display === "none" ? "" : "none";
    setStatus(details.style.display === "none" ? "Details hidden." : "Details shown.");
  };

  const highlightRows = () => {
    const rows = document.querySelectorAll("#stockTable tbody tr");

    rows.forEach((row) => {
      row.classList.toggle("table-warning");
    });

    setStatus(`Highlighted ${rows.length} stock rows.`);
  };

  const chooseQuickCity = (event) => {
    const button = event.currentTarget;
    const select = document.getElementById("deliveryCitySelect");
    const status = document.querySelector("#selectedCityStatus");

    if (select) {
      select.value = button.dataset.city;
    }

    if (status) {
      status.innerHTML = `${button.innerText} selected with fee $${button.dataset.fee}.`;
    }
  };

  const inspectDom = () => {
    const table = document.getElementById("stockTable");
    const parentName = table?.parentNode?.className || "no parent";
    const childCount = table?.children?.length || 0;
    setStatus(`DOM traversal: parent class is ${parentName}, table children count is ${childCount}.`);
  };

  const loadPolicy = async () => {
    try {
      const jsonText = encodeURIComponent(
        JSON.stringify({ message: "Delivery takes 2 to 5 business days. Returns are accepted within 7 days." })
      );
      const response = await fetch(`data:application/json,${jsonText}`);
      const data = await response.json();
      setPolicy(data.message);
      setStatus("Policy loaded with fetch without reloading the page.");
    } catch (error) {
      setStatus("Could not load policy.", "error");
    }
  };

  const buildSequence = () => {
    const countInput = document.getElementById("stockSequenceCount");
    const result = createStockSequence(countInput?.value);
    setSequence(result);

    if (result.length === 0) {
      setStatus("Enter a valid number for stock checks.", "error");
    } else {
      setStatus(`Created ${result.length} stock checks.`);
    }
  };

  const changePreview = (state) => {
    const preview = document.querySelector("#domPreviewImage");
    const label = document.querySelector("#domPreviewLabel");

    if (preview) {
      preview.src = state === "second" ? secondImage : firstImage;
    }

    if (label) {
      label.innerHTML = state === "second" ? "Preview changed on mouse over." : "Original preview restored.";
    }
  };

  return (
    <section className="bootstrap-extra-box mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
        <div>
          <h3>Store Control Tools</h3>
          <p className="mb-2">
            These tools update real store data: stock rows, delivery cities, shipping fee,
            image preview, and policy loading.
          </p>
          <p className="phase-note">Category summary: {categorySummary}</p>
          <p className="phase-note">Reverse category check: {reverseCategories}</p>
        </div>

        <button type="button" className="btn btn-outline-primary align-self-start" onClick={toggleDetails}>
          Hide / Show Details
        </button>
      </div>

      <p id="domToolsStatus" className="form-validation-message success mt-2">
        {message}
      </p>

      <div className="dom-tools-details">
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="table-wrap">
              <table id="stockTable" className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Product Code</th>
                    <th>Stock Note</th>
                    <th>Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="stock-row" data-code="DRESS01">
                    <td>DRESS01</td>
                    <td>Check size M before delivery</td>
                    <td>string</td>
                    <td>Original</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="row g-2">
              <div className="col-md-4">
                <input id="stockCodeInput" className="form-control field-control" placeholder="Product code" />
              </div>
              <div className="col-md-5">
                <input id="stockNoteInput" className="form-control field-control" placeholder="Stock note" />
              </div>
              <div className="col-md-3 d-grid">
                <button type="button" className="btn btn-primary" onClick={addStockRow}>
                  Add Row
                </button>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-2">
              <button type="button" className="btn btn-outline-primary" onClick={highlightRows}>
                Highlight Rows
              </button>
              <button type="button" className="btn btn-outline-primary" onClick={inspectDom}>
                Inspect DOM
              </button>
            </div>
          </div>

          <div className="col-lg-5">
            <label className="form-label-text" htmlFor="deliveryCitySelect">
              Delivery city
            </label>
            <select id="deliveryCitySelect" className="form-select field-control" defaultValue="beirut">
              <option value="beirut">Beirut</option>
              <option value="tripoli">Tripoli</option>
              <option value="jounieh">Jounieh</option>
            </select>

            <div className="row g-2 mt-2">
              <div className="col-8">
                <input id="deliveryCityInput" className="form-control field-control" placeholder="New city" />
              </div>
              <div className="col-4 d-flex align-items-center">
                <input id="addCityToTop" type="checkbox" className="me-2" />
                <label htmlFor="addCityToTop">Top</label>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-2">
              <button type="button" className="btn btn-primary" onClick={addCity}>
                Add City
              </button>
              <button type="button" className="btn btn-secondary" onClick={removeCity}>
                Remove City
              </button>
            </div>

            <p id="selectedCityStatus" className="phase-note mt-2">No quick city selected.</p>
            <div className="d-flex flex-wrap gap-2">
              <button type="button" className="btn btn-outline-primary quick-city-btn" data-city="beirut" data-fee="3" onClick={chooseQuickCity}>
                Beirut
              </button>
              <button type="button" className="btn btn-outline-primary quick-city-btn" data-city="tripoli" data-fee="5" onClick={chooseQuickCity}>
                Tripoli
              </button>
              <button type="button" className="btn btn-outline-primary quick-city-btn" data-city="jounieh" data-fee="4" onClick={chooseQuickCity}>
                Jounieh
              </button>
            </div>

            <div className="mt-3">
              <p className="mb-1"><b>Shipping speed</b></p>
              <label className="me-3">
                <input type="radio" name="shippingSpeed" value="standard" defaultChecked /> Standard
              </label>
              <label className="me-3">
                <input type="radio" name="shippingSpeed" value="express" /> Express
              </label>
              <label>
                <input type="radio" name="shippingSpeed" value="pickup" /> Pickup
              </label>
              <div className="mt-2">
                <button type="button" className="btn btn-outline-primary" onClick={calculateShipping}>
                  Calculate Shipping
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-2">
          <div className="col-lg-5">
            <div className="card h-100 p-3">
              <img
                id="domPreviewImage"
                src={firstImage}
                alt="Product preview"
                className="card-img-top"
                onMouseOver={() => changePreview("second")}
                onMouseOut={() => changePreview("first")}
              />
              <p id="domPreviewLabel" className="phase-note mt-2">Move mouse over the image to change preview.</p>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="card h-100 p-3">
              <h4>Policy and Stock Checks</h4>
              <p>{policy}</p>
              <button type="button" className="btn btn-outline-primary align-self-start" onClick={loadPolicy}>
                Load Policy
              </button>

              <div className="row g-2 mt-3">
                <div className="col-md-8">
                  <input id="stockSequenceCount" type="number" className="form-control field-control" placeholder="Number of stock checks" />
                </div>
                <div className="col-md-4 d-grid">
                  <button type="button" className="btn btn-primary" onClick={buildSequence}>
                    Build Checks
                  </button>
                </div>
              </div>

              {sequence.length > 0 && (
                <ul className="notes-list mt-3">
                  {sequence.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StoreDomTools;
