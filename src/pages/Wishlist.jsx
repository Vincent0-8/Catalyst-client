import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'

const Wishlist = () => {
  const { items } = useSelector((state) => state.wishlist)

  if (items.length === 0) {
    return (
      <div className="px-8 py-16 text-center">
        <p className="font-serif text-2xl text-primary mb-4">Your wishlist is empty</p>
        <Link to="/" className="text-accent hover:underline text-sm">Continue shopping</Link>
      </div>
    )
  }

  return (
    <div className="px-8 py-10">
      <h1 className="font-serif text-3xl text-primary mb-8">Wishlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {items.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Wishlist