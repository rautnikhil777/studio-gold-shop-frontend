import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link, useNavigate } from "react-router-dom";
import { client, urlFor } from "../sanityClient";
import "./Home.css";

const SORT_OPTIONS = [
  { label: "Price (Low)", value: "price_asc" },
  { label: "Price (High)", value: "price_desc" },
];

const getVariantPrice = (product) => {
  if (product?.prices && typeof product.prices === "object" && !Array.isArray(product.prices)) {
    const values = Object.values(product.prices || {});
    return values.length > 0 ? Math.min(...values) : null;
  }
  return product?.price ?? null;
};

const sortProducts = (list, type) => {
  const arr = [...list];
  switch (type) {
    case "price_asc":
      return arr.sort((a, b) => getVariantPrice(a) - getVariantPrice(b));
    case "price_desc":
      return arr.sort((a, b) => getVariantPrice(b) - getVariantPrice(a));
    default:
      return arr;
  }
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [carouselImages, setCarouselImages] = useState([]);

  const navigate = useNavigate();

  const groupProducts = (arr) => {
    const grouped = {};
    arr.forEach((p) => {
      if (!p.category) return;
      if (!grouped[p.category]) grouped[p.category] = [];
      grouped[p.category].push(p);
    });
    setGroupedProducts(grouped);
  };

  useEffect(() => {
    client
      .fetch(`*[_type == "product"]{
        _id,
        name,
        slug,
        description,
        images,
        prices,
        price,
        weights,
        category,
        rating,
        isPreOrder,
        isFeatured
      }`)
      .then((data) => {
        setAllProducts(data);
        groupProducts(data);

        const featured = data.filter((item) => item.isFeatured && item.images?.[0]);
        const carouselData = featured.map((item) => ({
          id: item._id,
          slug: item.slug,
          image: urlFor(item.images[0]).url(),
        }));
        setCarouselImages(carouselData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    let filtered = allProducts.filter(
      (p) =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.category?.toLowerCase().includes(search.toLowerCase())
    );
    filtered = sortProducts(filtered, sortBy);

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    groupProducts(filtered);
  }, [search, sortBy, allProducts, selectedCategory]);

  useEffect(() => {
    if (!drawerOpen) return;
    const escHandler = (e) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", escHandler);
    return () => window.removeEventListener("keydown", escHandler);
  }, [drawerOpen]);

  const allCategories = [...new Set(allProducts.map((p) => p.category))];

  const handleCarouselClick = (id) => {
    const product = allProducts.find((p) => p._id === id);
    if (product?.slug?.current) {
      navigate(`/product/${product.slug.current}`);
    } else {
      alert("Product detail not found!");
    }
  };

  return (
    <div className="home-container px-2 mb-5">
      {/* 🔁 Category Slider */}
      {allCategories.length > 0 && (
        <div className="category-slider-wrapper">
          <div className="category-slider-track">
            {["All", ...allCategories, ...allCategories].map((cat, idx) => (
              <span
                key={idx}
                className={`category-slide-item ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Sort Button */}
      <button className="sort-hamburger" onClick={() => setDrawerOpen(true)} aria-label="Open sort menu">
        <span />
        <span />
        <span />
      </button>

      {/* Sort Drawer */}
      <div className={`sort-drawer${drawerOpen ? " open" : ""}`}>
        <div className="sort-drawer-header">
          <span>Sort By</span>
          <button className="close-btn" onClick={() => setDrawerOpen(false)}>&times;</button>
        </div>
        <div className="sort-drawer-body">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => {
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

      {/* ✅ Carousel */}
      <div className="mb-3 d-flex justify-content-center">
        <div className="w-100 home-carousel-wrapper">
          <Carousel fade interval={2800} indicators className="mobile-carousel">
            {carouselImages.map((item, idx) => (
              <Carousel.Item key={idx}>
                <img
                  className="d-block w-100"
                  src={item.image}
                  alt={`Slide ${idx + 1}`}
                  height="320"
                  style={{ objectFit: "cover", cursor: "pointer" }}
                  onClick={() => handleCarouselClick(item.id)}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Search */}
      <div className="d-flex flex-row align-items-center gap-2 mb-3 px-2" style={{ justifyContent: "flex-end" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search by name or category"
          className="form-control"
          style={{ maxWidth: 320 }}
        />
      </div>

      {/* Welcome Banner */}
      <div className="home-welcome-banner text-center rounded shadow-sm mb-3 px-2">
        <h2 className="fw-bold mb-1 home-title-gradient">Welcome to Sweet Moments!</h2>
        <p className="mb-0 lead text-secondary small home-lead-desc">
          Discover the best cakes & pastries in town. Every bite, a celebration.
        </p>
      </div>

      {/* Products */}
      <div className="all-categories">
        {Object.keys(groupedProducts).length === 0 ? (
          <p className="text-center text-muted mt-4">No products found.</p>
        ) : (
          Object.keys(groupedProducts).map((cat) => (
            <div className="category-row" key={cat}>
              <div className="d-flex align-items-center mb-2 ps-1">
                <img
                  src="https://img.icons8.com/color/32/000000/cake.png"
                  alt=""
                  style={{ marginRight: 10, opacity: 0.88 }}
                />
                <span className="category-title">{cat}</span>
              </div>
              <div className="product-scroll">
                {groupedProducts[cat]?.map((product) => (
                  <div className="product-card mx-1 mb-2 position-relative" key={product._id}>
                    <Link to={`/product/${product.slug?.current}`} className="d-block text-decoration-none product-link-hover">
                      <div className="position-relative product-img-wrapper">
                        {product.isPreOrder ? (
                          <div className="pre-order-badge">Pre Order Only</div>
                        ) : (
                          <div className="order-now-badge">Order Now</div>
                        )}
                        {product.images?.[0] && (
                          <img
                            src={urlFor(product.images[0]).width(300).url()}
                            alt={product.name}
                            className="product-img"
                          />
                        )}
                      </div>
                      <div className="mt-2 text-center">
                        <div className="fw-semibold text-dark small">{product.name}</div>
                      </div>
                    </Link>
                  </div>
                ))}
                <div className="product-scroll-fade"></div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CTA */}
      <div className="my-5 text-center">
        <div className="py-3 px-2 px-md-3 bg-white rounded-4 shadow-sm d-inline-block cta-action">
          <h5 className="mb-2" style={{ color: "#6f47b7", fontWeight: 600 }}>Hungry?</h5>
          <Link
            to="/contact"
            className="btn btn-warning btn-lg fw-semibold"
            style={{ fontSize: "1.1rem", borderRadius: "20px" }}
          >
            Order Now &rarr;
          </Link>
          <div className="mt-2 text-muted small">Swift delivery, happiness guaranteed!</div>
        </div>
      </div>
    </div>
  );
}