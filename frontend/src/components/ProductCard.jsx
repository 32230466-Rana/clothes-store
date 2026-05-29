function ProductCard({ product, onAdd }) {
  const chooseSize = (event) => {
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

  return (
    <article className="product-card old-product-card card h-100">
      <div className="product-image old-product-image">
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
            <span
              className={"color-swatch active " + product.colorClass}
            ></span>
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
                onClick={chooseSize}
                type="button"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          className="cart-btn product-cart-btn btn btn-primary"
          type="button"
          onClick={() => (onAdd ? onAdd(product) : null)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
