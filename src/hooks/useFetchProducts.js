// src/hooks/useFetchProducts.js

import { useEffect, useState } from "react";
import { client } from "../sanityClient";

// Query only for fields matching your schema
const query = `*[_type == "product"]{
  _id,
  name,
  description,
  price,
  image,
  karat,
  weight
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
