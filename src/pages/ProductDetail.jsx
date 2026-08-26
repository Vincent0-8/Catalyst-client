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

  if (loading || !selectedProduct) {
    return (
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start animate-pulse">
        <div className="aspect-3/4 bg-primary/10 rounded-xs w-full" />
        <div className="space-y-4 text-left">
          <div className="h-8 bg-primary/10 w-3/4 rounded-xs" />
          <div className="h-4 bg-primary/10 w-1/4 rounded-xs" />
          <div className="h-6 bg-primary/10 w-1/5 rounded-xs" />
          <div className="h-16 bg-primary/10 w-full rounded-xs" />
          <div className="h-10 bg-primary/10 w-full rounded-xs mt-6" />
        </div>
      </div>
    );
  }

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
    <div className="max-w-5xl mx-auto px-6 md:px-8 py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start text-left">
      {/* Product Image */}
      <div className="aspect-3/4 bg-secondary overflow-hidden rounded-xs w-full shadow-xs">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-start">
        <h1 className="font-serif text-3xl md:text-4xl text-primary font-medium">{selectedProduct.name}</h1>
        <p className="font-sans text-xs uppercase tracking-widest text-primary/60 mt-2">{selectedProduct.category}</p>
        <p className="font-sans text-2xl text-primary mt-4 font-semibold">${selectedProduct.price}</p>
        <p className="font-sans text-sm text-primary/75 mt-4 leading-relaxed">{selectedProduct.description}</p>

        {selectedProduct.sizes.length > 0 && (
          <div className="mt-6">
            <p className="font-sans text-xs uppercase tracking-wider text-primary/70 mb-2 font-medium">Select Size</p>
            <div className="flex gap-2 justify-start flex-wrap">
              {selectedProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-4 py-2 text-xs font-sans uppercase tracking-wider cursor-pointer transition-colors rounded-xs ${
                    selectedSize === size 
                      ? 'border-accent bg-accent/5 text-accent font-semibold' 
                      : 'border-primary/20 text-primary hover:border-primary/50'
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
          <p className="font-sans text-xs uppercase tracking-wider text-primary/70 font-medium">Quantity</p>
          <div className="flex items-center border border-primary/20 rounded-xs">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="px-3 py-1 cursor-pointer text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/5 transition-colors"
            >
              -
            </button>
            <span className="px-4 text-xs font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => Math.min(availableStock, q + 1))}
              disabled={quantity >= availableStock}
              className="px-3 py-1 cursor-pointer text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/5 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* stock detail feature */}
        <p className="font-sans text-xs text-primary/60 mt-2.5">
          {selectedProduct.stock} in stock {alreadyInCart > 0 && ` (${alreadyInCart} already in your cart)`}
        </p>

        {/* Action Buttons */}
        <button
          onClick={handleAddToCart}
          disabled={availableStock <= 0}
          className="mt-6 w-full bg-primary text-secondary py-3.5 font-sans text-xs uppercase tracking-widest font-medium hover:bg-accent cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-primary rounded-xs"
        >
          {availableStock <= 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>

        <button
          onClick={handleToggleWishlist}
          className={`mt-2 w-full py-3 font-sans text-xs uppercase tracking-widest font-medium border cursor-pointer transition-colors rounded-xs ${
            isWishlisted
              ? 'border-accent text-accent bg-accent/5 hover:bg-accent hover:text-secondary'
              : 'border-primary/20 text-primary/80 hover:border-accent hover:text-accent'
          }`}
        >
          {isWishlisted ? '♥ Saved to Wishlist' : '♡ Add to Wishlist'}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;