import Footer from "../components/Footer";
import { formatCurrency, parseProductPrice } from "../utils/storePracticalHelpers";

function Cart({ cartItems, removeFromCart }) {
  let itemCount = 0;
  let subtotal = 0;

  for (const item of cartItems) {
    const quantity = item.quantity ? Number(item.quantity) : 1;
    itemCount += quantity;
    subtotal += item.cartLineTotal ? Number(item.cartLineTotal) : parseProductPrice(item.price) * quantity;
  }

  const deliveryFee = subtotal === 0 || subtotal >= 100 ? 0 : 5;
  const grandTotal = subtotal + deliveryFee;

  return (
    <>
      <section className="page-section cart-page">
        <div className="container">
          <h1>Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="cart-box">
              <p>No items added yet.</p>
              <p>Open the collection page to choose your favorite pieces.</p>
            </div>
          ) : (
            <>
              <div className="row row-cols-1 row-cols-md-3 g-3 text-center mb-4">
                <div className="col">
                  <div className="cart-box h-100">
                    <h3>{itemCount}</h3>
                    <p>Total pieces</p>
                  </div>
                </div>
                <div className="col">
                  <div className="cart-box h-100">
                    <h3>{formatCurrency(subtotal)}</h3>
                    <p>Subtotal</p>
                  </div>
                </div>
                <div className="col">
                  <div className="cart-box h-100">
                    <h3>{formatCurrency(grandTotal)}</h3>
                    <p>Total with delivery</p>
                  </div>
                </div>
              </div>

              <div className="cart-box mb-4">
                {deliveryFee === 0 ? (
                  <p>Delivery is free for this cart.</p>
                ) : (
                  <p>Add {formatCurrency(100 - subtotal)} more to get free delivery.</p>
                )}
              </div>

              <div className="row row-cols-1 row-cols-md-2 g-4">
                {cartItems.map((item, index) => {
                  const quantity = item.quantity ? Number(item.quantity) : 1;
                  const lineTotal = item.cartLineTotal
                    ? Number(item.cartLineTotal)
                    : parseProductPrice(item.price) * quantity;

                  return (
                    <div className="col" key={item.title + index}>
                      <div className="cart-item-card card h-100 p-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="cart-item-image"
                        />
                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.price}</p>
                          <p>
                            Size: <strong>{item.selectedSize || "Not selected"}</strong>
                            <br />
                            Quantity: <strong>{quantity}</strong>
                            <br />
                            Line total: <strong>{formatCurrency(lineTotal)}</strong>
                          </p>
                          <button
                            type="button"
                            className="link-btn secondary btn btn-secondary"
                            onClick={() => removeFromCart(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Cart;
