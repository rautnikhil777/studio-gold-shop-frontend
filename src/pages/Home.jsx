import React, { useState } from "react";
// ...
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { carouselImages } from "../data/carouselImages";
import { useFetchProducts } from "../hooks/useFetchProducts";
import { urlFor } from "../utils/imageUrl"; // or sanityClient
import "./Home.css";

const SORT_OPTIONS = [
  { label: "Price (Low)", value: "price_asc" },
  { label: "Price (High)", value: "price_desc" },
];

function sortProducts(list, type) {
  const arr = [...list];
  switch (type) {
    case "price_asc":
      return arr.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    case "price_desc":
      return arr.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    default:
      return arr;
  }
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const products = useFetchProducts();

  // No categories: just filter and sort
  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.karat?.toLowerCase().includes(search.toLowerCase())
  );
  const sorted = sortProducts(filtered, sortBy);

  // Keyboard ESC to close sort drawer
  React.useEffect(() => {
    if (!drawerOpen) return;
    const escHandler = (e) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", escHandler);
    return () => window.removeEventListener("keydown", escHandler);
  }, [drawerOpen]);

  return (
    <div className="container mb-5 px-2" style={{ maxWidth: 1100, minHeight: "75vh" }}>
      <button className="sort-hamburger" onClick={() => setDrawerOpen(true)} aria-label="Open sort menu">
        <span />
        <span />
        <span />
      </button>

      {/* Sort drawer */}
      <div className={`sort-drawer${drawerOpen ? " open" : ""}`}>
        <div className="sort-drawer-header">
          <span>Sort By</span>
          <button className="close-btn" onClick={() => setDrawerOpen(false)} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="sort-drawer-body">
          <select
            className="form-select"
            value={sortBy}
            onChange={e => {
              setSortBy(e.target.value);
              setDrawerOpen(false);
            }}
          >
            <option value="">-- No Sorting --</option>
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {drawerOpen && <div className="sort-drawer-overlay" onClick={() => setDrawerOpen(false)} />}

      {/* Carousel */}
      <div className="mb-4 d-flex justify-content-center">
        <div className="w-100 home-carousel-wrapper">
          <Carousel fade interval={2800} indicators className="mobile-carousel">
            {carouselImages.map((item, idx) => (
              <Carousel.Item key={idx}>
                <Link to={`/product/${item.id}`}>
                  <img
                    className="d-block w-100"
                    src={item.image}
                    alt={`Slide ${idx + 1}`}
                    height="320"
                    style={{ objectFit: "cover", cursor: "pointer" }}
                  />
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Search and sort */}
      <div className="d-flex flex-row align-items-center gap-2 mb-3 px-2" style={{ justifyContent: "flex-end" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search by name or karat"
          className="form-control"
          style={{ maxWidth: 320 }}
        />
      </div>

      {/* Welcome banner */}
      <div className="home-welcome-banner text-center rounded shadow-sm mb-3 px-2">
        <h2 className="fw-bold mb-1 home-title-gradient">Welcome to Our Gold Shop!</h2>
        <p className="mb-0 lead text-secondary small home-lead-desc">
          Explore our fine gold collection — quality and trust you can see.
        </p>
      </div>

      {/* Product grid */}
      <div className="mt-4">
        {!sorted.length ? (
          <p className="text-center text-muted mt-5">No products found.</p>
        ) : (
          <div className="row gy-4">
            {sorted.map((product) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={product._id}>
                <div className="card h-100 shadow-sm">
                  {product.image && (
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={urlFor(product.image).width(350).url()}
                        alt={product.name}
                        className="card-img-top"
                        style={{ objectFit: "cover", height: 180 }}
                      />
                    </Link>
                  )}
                  <div className="card-body">
                    <h5 className="card-title mb-1">{product.name}</h5>
                    <div>
                      <small>
                        Karat: <b>{product.karat}</b><br />
                        Weight: <b>{product.weight} gm</b>
                      </small>
                    </div>
                    <div className="my-2"><strong>₹{product.price}</strong></div>
                    <Link
                      to={`/product/${product._id}`}
                      className="btn btn-primary btn-sm w-100"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="my-5 text-center">
        <div className="py-3 px-2 px-md-3 bg-white rounded-4 shadow-sm d-inline-block cta-action">
          <h5 className="mb-2" style={{ color: "#6f47b7", fontWeight: 600 }}>Looking for something special?</h5>
          <Link
            to="/contact"
            className="btn btn-warning btn-lg fw-semibold"
            style={{ fontSize: "1.1rem", borderRadius: "20px" }}
          >
            Order Now &rarr;
          </Link>
          <div className="mt-2 text-muted small">Custom orders & quick assistance!</div>
        </div>
      </div>
    </div>
  );
}
