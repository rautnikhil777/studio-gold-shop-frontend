// src/pages/ProductDetails.jsx

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { client, urlFor } from "../sanityClient";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "product" && _id == $id][0]{
          _id,
          name,
          description,
          price,
          image,
          karat,
          weight
        }`,
        { id }
      )
      .then(setProduct)
      .catch(console.error);
  }, [id]);

  if (!product)
    return <div className="text-center mt-5">Product not found</div>;

  // WhatsApp order message
  const waMessage = encodeURIComponent(
    `Order enquiry for gold item:\n` +
    `Product: ${product.name}\n` +
    (product.karat ? `Karat: ${product.karat}\n` : "") +
    (product.weight ? `Weight: ${product.weight} gm\n` : "") +
    (product.price ? `Price: ₹${product.price}\n` : "") +
    (product.description ? `Description: ${product.description}\n` : "")
  );

  return (
    <div className="container my-4" style={{ maxWidth: 720 }}>
      <div className="card shadow-lg p-3">
        <div className="row g-4 align-items-center">
          <div className="col-md-5 text-center">
            {product.image && (
              <img
                src={urlFor(product.image).width(500).url()}
                alt={product.name}
                className="img-fluid rounded"
                style={{ maxHeight: 300, objectFit: "cover" }}
              />
            )}
          </div>
          <div className="col-md-7">
            <h2 className="fw-bold">{product.name}</h2>

            {product.price && (
              <div className="mb-2">
                <b>Price:</b> ₹{product.price}
              </div>
            )}

            {product.karat && (
              <div className="mb-2">
                <b>Karat:</b> {product.karat}
              </div>
            )}

            {product.weight && (
              <div className="mb-2">
                <b>Weight:</b> {product.weight} gm
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
