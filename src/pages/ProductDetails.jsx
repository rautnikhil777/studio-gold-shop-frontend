// src/pages/ProductDetails.jsx

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { client, urlFor } from "../sanityClient";

export default function ProductDetails() {
  const { slug } = useParams();  // slug param from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Agar slug undefined ya empty ho to fetch na karein (400 error se bachne ke liye)
    if (!slug) return;

    setLoading(true);
    client
      .fetch(
        `*[_type == "product" && slug.current == $slug][0]{
          _id,
          name,
          description,
          price,
          prices,
          images,
          karat,
          weights,
          isPreOrder,
          isFeatured
        }`,
        { slug }
      )
      .then((prod) => {
        setProduct(prod);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading)
    return <div className="text-center mt-5">Loading product details...</div>;

  if (!product)
    return (
      <div className="text-center mt-5">
        Product not found.
        <div>
          <Link to="/" className="btn btn-outline-primary mt-3">
            ← Back to Home
          </Link>
        </div>
      </div>
    );

  // Price display logic: prices object ka use karein agar available ho, varna base price
  let priceText = "";
  if (product.prices) {
    const { karat18, karat22, karat24 } = product.prices;
    if (karat18) priceText += `18K: ₹${karat18} `;
    if (karat22) priceText += `22K: ₹${karat22} `;
    if (karat24) priceText += `24K: ₹${karat24} `;
  }
  if (product.price && !priceText) {
    priceText = `₹${product.price}`;
  }

  // WhatsApp message string for ordering
  const waMessage = encodeURIComponent(
    `Order enquiry for gold item:\n` +
      `Product: ${product.name}\n` +
      (product.karat ? `Karat: ${product.karat}\n` : "") +
      (product.weights && product.weights.length > 0
        ? `Weight(s): ${product.weights.join(", ")} gm\n`
        : "") +
      (priceText ? `Price: ${priceText}\n` : "") +
      (product.description ? `Description: ${product.description}\n` : "")
  );

  return (
    <div className="container my-4" style={{ maxWidth: 720 }}>
      <div className="card shadow-lg p-3">
        <div className="row g-4 align-items-center">
          {/* Product Images: First image dikhayen */}
          <div className="col-md-5 text-center">
            {product.images && product.images.length > 0 ? (
              <img
                src={urlFor(product.images[0]).width(500).url()}
                alt={product.name}
                className="img-fluid rounded"
                style={{ maxHeight: 300, objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: 300,
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#aaa",
                  borderRadius: 6,
                }}
              >
                No Image Available
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="col-md-7">
            <h2 className="fw-bold">{product.name}</h2>

            {priceText && (
              <div className="mb-2">
                <b>Price:</b> {priceText}
              </div>
            )}

            {product.karat && (
              <div className="mb-2">
                <b>Karat:</b> {product.karat}
              </div>
            )}

            {product.weights && product.weights.length > 0 && (
              <div className="mb-2">
                <b>Weight(s):</b> {product.weights.join(", ")} gm
              </div>
            )}

            {product.isPreOrder !== undefined && (
              <div className="mb-2">
                <b>Status:</b> {product.isPreOrder ? "Pre-Order" : "Available"}
              </div>
            )}

            {product.description && (
              <div className="mb-2">
                <b>Description:</b>
                <div className="text-muted">{product.description}</div>
              </div>
            )}

            {/* WhatsApp Order Button */}
            <a
              className="btn btn-success mt-3"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://wa.me/919146834885?text=${waMessage}`}
            >
              📲 Order on WhatsApp
            </a>

            <Link to="/" className="btn btn-outline-secondary mt-3 ms-2">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
