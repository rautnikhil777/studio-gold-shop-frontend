import imageUrlBuilder from "@sanity/image-url";
import { useEffect, useState } from "react";
import sanityClient from "../sanity"; // tumhara configured sanity client
import './Carousel.css'; // optional styling

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

const ProductCarousel = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    sanityClient.fetch(
      `*[_type == "product" && _id == $id][0]{
        name,
        images
      }`,
      { id: productId }
    ).then((data) => setProduct(data));
  }, [productId]);

  if (!product || !product.images) return <div>Loading...</div>;

  return (
    <div className="carousel-container">
      {product.images.map((img, index) => (
        <div className="slide" key={index}>
          <img src={urlFor(img).url()} alt={`Slide ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default ProductCarousel;