import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Cart from "./pages/Cart.jsx";
import Help from "./pages/Help.jsx";
import Returns from "./pages/Returns.jsx";
import Support from "./pages/Support.jsx";
import SizeGuide from "./pages/SizeGuide.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: [],
    };
  }

  addToCart = (product) => {
    this.setState((previousState) => {
      const nextItems = previousState.cartItems.map((item) => item);
      nextItems.push(product);

      return {
        cartItems: nextItems,
      };
    });
  };

  removeFromCart = (indexToRemove) => {
    this.setState((previousState) => {
      const nextItems = [];

      for (const index in previousState.cartItems) {
        if (index !== String(indexToRemove)) {
          nextItems.push(previousState.cartItems[index]);
        }
      }

      return {
        cartItems: nextItems,
      };
    });
  };

  render() {
    const { cartItems } = this.state;

    return (
      <>
        <Navbar cartCount={cartItems.length} />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={<Products addToCart={this.addToCart} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  removeFromCart={this.removeFromCart}
                />
              }
            />

            <Route path="/help" element={<Help />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/support" element={<Support />} />
            <Route path="/size-guide" element={<SizeGuide />} />
          </Routes>
        </main>
      </>
    );
  }
}

export default App;
