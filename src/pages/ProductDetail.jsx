import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct, loading } = useSelector((state) => state.products);
  const { items: cartItems } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  if (loading || !selectedProduct) return <p className="px-8 py-10">Loading...</p>;

  // to count how many quantity the product and size existed in the cart
  const alreadyInCart = cartItems
    .filter((item) => item.product._id === selectedProduct._id)
    .reduce((sum, item) => sum + item.quantity, 0);
    
  const availableStock = selectedProduct.stock - alreadyInCart;


  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to your cart');
      navigate('/login');
      return;
    }

    if (!selectedSize && selectedProduct.sizes.length > 0) {
      toast.warn('Please select a size first');
      return;
    }

    if (quantity > availableStock) {
      toast.error(`Only ${availableStock} more available (${alreadyInCart} already in your cart)`);
      return;
    }

    dispatch(addToCart({ product: selectedProduct, size: selectedSize, quantity }));
    toast.success('Added to cart!');
    setQuantity(1);
  };

  const handleToggleWishlist = () => {
    if (!user) {
      toast.error('Please login to save items to your wishlist');
      navigate('/login');
      return;
    }
    dispatch(toggleWishlist(selectedProduct));
    const isWishlisted = wishlistItems.some((item) => item._id === selectedProduct._id);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  const isWishlisted = wishlistItems.some((item) => item._id === selectedProduct._id);

  return (
    <div className="px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="h-64 md:h-auto md:aspect-[3/4] bg-secondary overflow-hidden mx-auto max-w-xs md:max-w-none">
  <img
    src={selectedProduct.image}
    alt={selectedProduct.name}
    className="w-full h-full object-cover"
  />
</div>

      <div>
        <h1 className="font-serif text-3xl text-primary">{selectedProduct.name}</h1>
        <p className="font-sans text-sm text-primary/60 mt-1">{selectedProduct.category}</p>
        <p className="font-sans text-xl text-primary mt-4">${selectedProduct.price}</p>
        <p className="font-sans text-sm text-primary/80 mt-4">{selectedProduct.description}</p>

        {selectedProduct.sizes.length > 0 && (
          <div className="mt-6">
            <p className="font-sans text-sm text-primary mb-2">Size</p>
            <div className="flex gap-2 justify-center">
              {selectedProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-4 py-2 text-sm cursor-pointer ${
                    selectedSize === size ? 'border-accent text-accent' : 'border-primary/20 text-primary'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* quantity feature */}
        <div className="mt-6 flex items-center gap-4">
          <p className="font-sans text-sm text-primary">Quantity</p>
          <div className="flex items-center border border-primary/20">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="px-3 py-1 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => Math.min(availableStock, q + 1))}
              disabled={quantity >= availableStock}
              className="px-3 py-1 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>

        {/* stock detail feature */}
        <p className="font-sans text-xs text-primary/60 mt-2">{selectedProduct.stock} in stock {alreadyInCart > 0 && ` (${alreadyInCart} already in your cart)`}</p>

        {/* conditional - alert stock feature */}
        <button
          onClick={handleAddToCart}
          disabled={availableStock <= 0}
          className="mt-6 w-full bg-primary text-secondary py-3 font-sans text-sm hover:bg-accent cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-primary"
        >
          {availableStock <= 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>

        <button
          onClick={handleToggleWishlist}
          className={`mt-2 w-full py-3 font-sans text-sm border cursor-pointer transition-colors ${
            isWishlisted
              ? 'border-accent text-accent hover:bg-accent hover:text-secondary'
              : 'border-primary/30 text-primary/70 hover:border-accent hover:text-accent'
          }`}
        >
          {isWishlisted ? '♥ Saved to Wishlist' : '♡ Add to Wishlist'}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;