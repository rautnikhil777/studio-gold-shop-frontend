import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow p-4">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p>₹{product.price}</p>
      <Link to={`/product/${product.id}`} className="text-blue-500 mt-2 inline-block">View Details</Link>
    </div>
  )
}

export default ProductCard
