import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Collection" },
  { to: "/contact", label: "Contact" },
];

const customerLinks = [
  { to: "/help", label: "Help" },
  { to: "/returns", label: "Returns" },
  { to: "/support", label: "Support" },
  { to: "/size-guide", label: "Size Guide" },
];

function Navbar({ cartCount = 0 }) {
  return (
    <>
      <div className="top-discount">Spring Sale is Here! Enjoy up to 60% off</div>

      <header className="main-header navbar-area store-header">
        <nav
          className="navbar navbar-expand-lg navbar-light store-navbar"
          aria-label="Main navigation"
        >
          <div className="container-fluid header-inner">
            <Link to="/" className="navbar-brand brand store-brand">
              <span className="brand-mark" aria-hidden="true">
                FS
              </span>
              <span className="brand-text">The Art of Beauty</span>
            </Link>

            <button
              className="navbar-toggler store-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#storeNavbar"
              aria-controls="storeNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse store-navbar-collapse"
              id="storeNavbar"
            >
              <ul className="navbar-nav store-nav-links">
                {links.map((item) => (
                  <li className="nav-item store-nav-item" key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        isActive
                          ? "nav-link nav-item-link active-link"
                          : "nav-link nav-item-link"
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}

                <li className="nav-item dropdown store-nav-item">
                  <button
                    className="nav-link dropdown-toggle nav-item-link store-care-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Customer Care
                  </button>

                  <ul className="dropdown-menu store-dropdown-menu">
                    {customerLinks.map((item) => (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            isActive ? "dropdown-item active" : "dropdown-item"
                          }
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>

              <div className="header-right">
                <form className="d-flex store-search" role="search">
                  <input
                    className="form-control search-input"
                    type="search"
                    placeholder="Search..."
                    aria-label="Search"
                  />
                </form>

                <Link
                  to="/cart"
                  className="cart-link btn btn-outline-primary"
                  aria-label="Open cart"
                >
                  Cart <span>{cartCount}</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;