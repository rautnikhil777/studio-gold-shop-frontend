// src/hooks/useFetchProducts.js
import { useEffect, useState } from "react";
import client from "../sanity";

export default function useFetchProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "product"]{
          _id,
          name,
          description,
          image,
          karat,
          weight,
          price,
          rating,
          category
        }`
      )
      .then(setProducts)
      .catch(console.error);
  }, []);

  return products;
}
