// src/hooks/useFetchProducts.js

import { useEffect, useState } from "react";
import { client } from "../sanityClient";

// Sanity schema ke hisaab se query update karo
const query = `*[_type == "product"]{
  _id,
  name,
  description,
  price,
  prices,
  images,
  karat,
  weights,
  category,
  rating,
  isPreOrder,
  isFeatured,
  slug
}`;

export function useFetchProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    client.fetch(query)
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return products;
}
