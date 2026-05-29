import Footer from "../components/Footer";

function Cart({ cartItems, removeFromCart }) {
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
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {cartItems.map((item, index) => (
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
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Cart;
