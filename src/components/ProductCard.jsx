import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { toast } from 'react-toastify';

const ProductCard = ({ product, delay = 0 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error('Please login to save items to your wishlist');
      navigate('/login');
      return;
    }
    dispatch(toggleWishlist(product));
  };

  return (
    <Link to={`/product/${product._id}`} className="group cursor-pointer block" data-aos="fade-up" data-aos-delay={delay}>
      <div className="relative aspect-3/4 overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-secondary/80 rounded-full text-lg cursor-pointer transition-opacity duration-300 ${
            isWishlisted ? 'opacity-100 text-accent' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>
      </div>
      
      <div className="mt-3 flex justify-between items-start">
        <div className="flex justify-start items-start flex-col">
          <h3 className="font-sans text-sm text-primary">{product.name}</h3>
          <p className="font-sans text-xs text-primary/60 mt-1">{product.category}</p>
        </div>
        <p className="font-sans text-sm text-primary">
          ${product.price}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;