import { useState } from "react";
import { formatCurrency, parseProductPrice } from "../utils/storePracticalHelpers";

function ProductCard({ product, onAdd }) {
  const firstSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : "One Size";
  const [selectedSize, setSelectedSize] = useState(firstSize);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const priceNumber = parseProductPrice(product.price);
  const lineTotal = priceNumber * quantity;

  const chooseSize = (event) => {
    const size = event.currentTarget.dataset.size;
    setSelectedSize(size);

    const row = event.currentTarget.parentElement;

    if (row) {
      row.querySelectorAll("button").forEach((button) => {
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
      });
    }

    event.currentTarget.classList.add("active");
    event.currentTarget.setAttribute("aria-pressed", "true");
    event.currentTarget.blur();
  };

  const changeQuantity = (event) => {
    const nextQuantity = Number(event.currentTarget.value);

    if (Number.isNaN(nextQuantity) || nextQuantity < 1) {
      setQuantity(1);
      return;
    }

    setQuantity(nextQuantity);
  };

  const addSelectedProduct = (event) => {
    const title = event.currentTarget.dataset.productTitle;

    const cartProduct = {
      ...product,
      selectedSize,
      quantity,
      cartLineTotal: lineTotal,
    };

    if (onAdd) {
      onAdd(cartProduct);
    }

    setMessage(`${title} - size ${selectedSize} was added (${quantity}).`);

    window.setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  return (
    <article className="product-card old-product-card card h-100" data-category={product.category}>
      <div className="product-image old-product-image card-image-frame product-image-frame">
        <img
          src={product.image}
          alt={product.title}
          width="300"
          height="320"
          loading="lazy"
        />

        {product.badge ? (
          <span className="product-badge old-badge badge">{product.badge}</span>
        ) : null}
      </div>

      <div className="product-body old-product-body card-body">
        <h3 className="product-title">{product.title}</h3>

        <p className="product-description">
          <strong>{product.subtitle}</strong>
          <br />
          <small>{product.text}</small>
        </p>

        <div className="price-row">
          <span className="new-price">{product.price}</span>

          {product.oldPrice ? (
            <span className="old-price">{product.oldPrice}</span>
          ) : null}
        </div>

        <div className="option-group">
          <div className="label">Color:</div>

          <div className="option-row">
            <span className={"color-swatch active " + product.colorClass}></span>
          </div>
        </div>

        <div className="option-group">
          <div className="label">Sizes:</div>

          <div className="option-row">
            {product.sizes.map((size, index) => (
              <button
                key={size}
                aria-pressed={index === 0 ? "true" : "false"}
                className={
                  index === 0
                    ? "size-btn btn btn-outline-primary active"
                    : "size-btn btn btn-outline-primary"
                }
                data-size={size}
                onClick={chooseSize}
                type="button"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="option-group">
          <label className="label" htmlFor={"qty-" + product.title.replaceAll(" ", "-")}>Quantity:</label>
          <input
            id={"qty-" + product.title.replaceAll(" ", "-")}
            className="form-control field-control"
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={changeQuantity}
          />
        </div>

        <p className="small mb-2">
          Selected: <strong>{selectedSize}</strong> | Total: <strong>{formatCurrency(lineTotal)}</strong>
        </p>

        <button
          className="cart-btn product-cart-btn btn btn-primary"
          type="button"
          data-product-title={product.title}
          data-product-category={product.category}
          onClick={addSelectedProduct}
        >
          Add to Cart
        </button>

        {message && <p className="form-validation-message success mt-2">{message}</p>}
      </div>
    </article>
  );
}

export default ProductCard;
