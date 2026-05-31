import { useEffect, useState } from "react";
import {
  formatCurrency,
  getCategoryCounts,
  getDiscountPercent,
  getProductsTotal,
  parseProductPrice,
  readStorageList,
  saveStorageList,
} from "../utils/storePracticalHelpers";

function StoreAssistant({ products, visibleProducts, onChooseCategory }) {
  const [budget, setBudget] = useState("");
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState(() =>
    readStorageList("fashion_store_notes", [])
  );
  const [status, setStatus] = useState("Choose a budget to get a suggestion.");
  const [showSummary, setShowSummary] = useState(true);

  const totalValue = getProductsTotal(visibleProducts);
  const categoryCounts = getCategoryCounts(products);
  const bestOffer = [...products].sort(
    (first, second) => getDiscountPercent(second) - getDiscountPercent(first)
  )[0];

  useEffect(() => {
    if (budget === "") {
      setStatus("Choose a budget to get a suggestion.");
      return;
    }

    const budgetNumber = Number(budget);

    if (Number.isNaN(budgetNumber) || budgetNumber <= 0) {
      setStatus("Budget must be a positive number.");
      return;
    }

    const affordableProducts = products.filter(
      (product) => parseProductPrice(product.price) <= budgetNumber
    );

    if (affordableProducts.length === 0) {
      setStatus("No product fits this budget yet.");
      return;
    }

    const cheapest = affordableProducts.sort(
      (first, second) => parseProductPrice(first.price) - parseProductPrice(second.price)
    )[0];

    setStatus(`Suggested for your budget: ${cheapest.title} (${cheapest.price}).`);
  }, [budget, products]);

  const saveNote = (event) => {
    event.preventDefault();

    if (note.trim() === "") {
      setStatus("Write a note before saving.");
      return;
    }

    const nextNotes = [note.trim(), ...savedNotes].slice(0, 4);
    setSavedNotes(nextNotes);
    saveStorageList("fashion_store_notes", nextNotes);
    setNote("");
    setStatus("Your shopping note was saved in this browser.");
  };

  const clearNotes = () => {
    setSavedNotes([]);
    saveStorageList("fashion_store_notes", []);
    setStatus("Saved notes were cleared.");
  };

  return (
    <section className="bootstrap-extra-box mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
        <div>
          <h3>Shopping Assistant</h3>
          <p className="mb-2">
            This part works with the real products: budget suggestion, category counts,
            saved notes, and show/hide summary.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-outline-primary align-self-start"
          onClick={() => setShowSummary(!showSummary)}
        >
          {showSummary ? "Hide Summary" : "Show Summary"}
        </button>
      </div>

      {showSummary && (
        <div className="row row-cols-1 row-cols-md-4 g-3 text-center mt-2">
          <div className="col">
            <div className="feature-tile h-100 p-3">
              <b>{visibleProducts.length}</b>
              <br />
              <small>visible products</small>
            </div>
          </div>

          <div className="col">
            <div className="feature-tile h-100 p-3">
              <b>{formatCurrency(totalValue)}</b>
              <br />
              <small>visible total value</small>
            </div>
          </div>

          <div className="col">
            <div className="feature-tile h-100 p-3">
              <b>{bestOffer ? bestOffer.title : "No offer"}</b>
              <br />
              <small>best offer</small>
            </div>
          </div>

          <div className="col">
            <div className="feature-tile h-100 p-3">
              <b>{Object.keys(categoryCounts).length}</b>
              <br />
              <small>active categories</small>
            </div>
          </div>
        </div>
      )}

      <div className="row g-3 mt-3">
        <div className="col-lg-5">
          <label className="form-label-text" htmlFor="assistantBudget">
            My budget
          </label>
          <input
            id="assistantBudget"
            type="number"
            min="1"
            className="form-control field-control"
            placeholder="Example: 35"
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
          />
          <p className="form-validation-message success mt-2">{status}</p>
        </div>

        <div className="col-lg-7">
          <p className="mb-2"><b>Quick category buttons</b></p>
          <div className="d-flex flex-wrap gap-2">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <button
                key={category}
                type="button"
                className="btn btn-outline-primary"
                data-category={category}
                onClick={(event) => onChooseCategory(event.currentTarget.dataset.category)}
              >
                {category} ({count})
              </button>
            ))}
          </div>
        </div>
      </div>

      <form className="mt-3" onSubmit={saveNote}>
        <label className="form-label-text" htmlFor="shoppingNote">
          Save a shopping note
        </label>
        <div className="row g-2">
          <div className="col-md-8">
            <input
              id="shoppingNote"
              className="form-control field-control"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Example: Buy blue dress in M"
            />
          </div>
          <div className="col-md-4 d-flex gap-2">
            <button type="submit" className="btn btn-primary flex-fill">
              Save Note
            </button>
            <button type="button" className="btn btn-secondary" onClick={clearNotes}>
              Clear
            </button>
          </div>
        </div>
      </form>

      {savedNotes.length > 0 && (
        <ul className="notes-list mt-3">
          {savedNotes.map((item, index) => (
            <li key={item + index}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default StoreAssistant;
