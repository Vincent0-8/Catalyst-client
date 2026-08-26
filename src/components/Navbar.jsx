import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { loadCart, removeFromCart, clearCart } from '../redux/slices/cartSlice';
import { Menu, X } from 'lucide-react';
import { loadWishlist, clearWishlist } from '../redux/slices/wishlistSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { items: cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/?category=${encodeURIComponent(category)}`);
    setShowMobileMenu(false);
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + (item?.quantity || 1), 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item?.product?.price || 0) * (item?.quantity || 1), 0);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(loadCart());
    dispatch(loadWishlist());
    navigate('/');
    setShowMobileMenu(false);
    setShowCart(false);
  };

  const handleRemove = (productId, size) => {
    dispatch(removeFromCart({ productId, size }));
  };

  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  const handleCartClick = () => {
    if (!user) {
      toast.error('Please login to unlock Cart');
      navigate('/login');
      setShowMobileMenu(false);
      return;
    }
    setShowCart(!showCart);
  };

  const handleMobileCartClick = () => {
    if (!user) {
      toast.error('Please login to unlock Cart');
      navigate('/login');
      setShowMobileMenu(false);
      return;
    }
    navigate('/cart');
    setShowMobileMenu(false);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to unlock Wishlist Products');
      navigate('/login');
      setShowMobileMenu(false);
      return;
    }
    navigate('/wishlist');
    setShowMobileMenu(false);
  };

  return (
    <nav className="bg-secondary border-b border-primary/10 sticky top-0 z-40">
      {/* Main bar */}
      <div className="relative flex items-center justify-between px-8 py-5 xl:grid xl:grid-cols-[1fr_auto_1fr]">
        
        {/* Logo */}
        <Link to="/" className="font-serif text-2xl font-semibold text-accent hover:opacity-90 transition-opacity xl:justify-self-start">
          Catalyst
        </Link>

        {/* Category Navigation — desktop only, truly centered */}
        <div className="hidden xl:flex justify-center gap-5 2xl:gap-8 font-sans text-xs uppercase tracking-widest text-primary/80">
          {['Outerwear', 'Tops', 'Bottoms', 'Accessories'].map((cat) => (
            <span
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="cursor-pointer hover:text-accent transition-colors font-medium"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Right Menu — desktop only (lg screens and up) */}
        <div className="hidden xl:flex items-center justify-end gap-4 2xl:gap-6 text-primary font-sans text-sm xl:justify-self-end">
          <button
            onClick={handleWishlistClick}
            className="cursor-pointer text-xs uppercase tracking-wider hover:text-accent transition-colors whitespace-nowrap"
          >
            Wishlist ({wishlistItems.length})
          </button>

          {/* Cart Dropdown */}
          <div className="relative">
            <button
              onClick={handleCartClick}
              className="cursor-pointer text-xs uppercase tracking-wider hover:text-accent transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              Cart ({totalQuantity})
            </button>

            {showCart && (
              <div className="absolute right-0 top-8 w-80 bg-secondary border border-primary/10 shadow-xl p-5 z-50 rounded-sm">
                {cartItems.length === 0 ? (
                  <p className="text-primary/60 text-xs text-center py-2">Your cart is empty.</p>
                ) : (
                  <>
                    <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
                      {cartItems.map((item) => (
                        <div key={`${item.product._id}-${item.size}`} className="flex justify-between items-start text-xs border-b border-primary/5 pb-2">
                          <div>
                            <p className="text-primary font-medium">{item.product.name}</p>
                            <p className="text-primary/60 mt-0.5 text-left">Size: {item.size} x {item.quantity}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-primary font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                            <button
                              onClick={() => handleRemove(item.product._id, item.size)}
                              className="text-accent text-[10px] hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-primary/10 mt-3 pt-3 flex justify-between text-xs font-semibold text-primary">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>

                    <Link
                      to="/cart"
                      onClick={() => setShowCart(false)}
                      className="mt-4 block text-center bg-primary text-secondary py-2 text-xs uppercase tracking-wider hover:bg-accent transition-colors"
                    >
                      View Cart
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* User section */}
          {user ? (
            <div className="flex items-center gap-3 border-l border-primary/10 pl-3">
              <span className="text-primary/70 text-xs whitespace-nowrap">Hi, {user.name}</span>
              <Link to="/orders" className="cursor-pointer text-xs uppercase tracking-wider hover:text-accent transition-colors">
                Orders
              </Link>
              <button onClick={handleLogout} className="cursor-pointer text-xs uppercase tracking-wider hover:text-accent transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="cursor-pointer text-xs uppercase tracking-wider transition-colors bg-accent text-secondary border border-primary/10 px-4 py-1">
              Login
            </Link>
          )}
        </div>

        {/* Hamburger button — tablet & mobile only */}
        <button
          className="xl:hidden flex p-1 cursor-pointer text-primary"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Toggle menu"
        >
          {showMobileMenu ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile dropdown menu — tablet & mobile */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out font-sans text-sm text-primary bg-secondary ${
          showMobileMenu ? 'max-h-125 border-t border-primary/10' : 'max-h-0'
        }`}
      >
        <div className="px-8 py-6 flex flex-col gap-5">

          {/* Categories */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] uppercase tracking-widest text-primary/40 font-medium">Shop</p>
            {['Outerwear', 'Tops', 'Bottoms', 'Accessories'].map((cat) => (
              <span
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="cursor-pointer text-xs uppercase tracking-wider hover:text-accent transition-colors font-medium"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="border-t border-primary/10" />

          {/* Wishlist & Cart */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] uppercase tracking-widest text-primary/40 font-medium">Bag</p>
            <button
              onClick={handleWishlistClick}
              className="text-xs uppercase tracking-wider hover:text-accent transition-colors cursor-pointer"
            >
              Wishlist ({wishlistItems.length})
            </button>
            <button
              onClick={handleMobileCartClick}
              className="text-xs uppercase tracking-wider hover:text-accent transition-colors cursor-pointer"
            >
              Cart ({totalQuantity})
            </button>
          </div>

          <div className="border-t border-primary/10" />

          {/* Account */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] uppercase tracking-widest text-primary/40 font-medium">Account</p>
            {user ? (
              <>
                <span className="text-xs text-primary/60">Hi, {user.name}</span>
                <Link to="/orders" onClick={() => setShowMobileMenu(false)} className="text-xs uppercase tracking-wider hover:text-accent transition-colors">
                  Orders
                </Link>
                <button onClick={handleLogout} className="text-xs uppercase tracking-wider bg-accent text-secondary px-4 py-2 text-center hover:bg-primary transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setShowMobileMenu(false)} className="text-xs uppercase tracking-wider bg-accent text-secondary px-4 py-2 text-center hover:bg-primary transition-colors">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;