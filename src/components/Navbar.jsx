import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { loadCart, removeFromCart, clearCart } from '../redux/slices/cartSlice';
import { Menu, X } from 'lucide-react';
import { loadWishlist, clearWishlist } from '../redux/slices/wishlistSlice';

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

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(loadCart());
    dispatch(loadWishlist());
    navigate('/');
    setShowMobileMenu(false);
  };

  const handleRemove = (productId, size) => {
    dispatch(removeFromCart({ productId, size }));
  };

  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  return (
    <nav className="bg-secondary border-b border-primary/10 sticky top-0 z-40">
      {/* Main bar */}
      <div className="relative flex items-center justify-between px-8 py-5">
        {/* Logo */}
        <Link to="/" className="font-serif text-2xl font-semibold text-accent hover:opacity-90 transition-opacity">
          Catalyst
        </Link>

        {/* Category Navigation — desktop only (lg screens and up) */}
        <div className="hidden lg:flex gap-6 xl:gap-10 font-sans text-xs uppercase tracking-widest text-primary/80">
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
        <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-primary font-sans text-sm">
          <Link to="/wishlist" className="cursor-pointer text-xs uppercase tracking-wider hover:text-accent transition-colors whitespace-nowrap">
            Wishlist ({wishlistItems.length})
          </Link>

          {/* Cart Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCart(!showCart)}
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
                            <p className="text-primary/60 mt-0.5">Size: {item.size} × {item.quantity}</p>
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
          className="lg:hidden flex p-1 cursor-pointer text-primary"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Toggle menu"
        >
          {showMobileMenu ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile dropdown menu — tablet & mobile */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out font-sans text-sm text-primary bg-secondary ${
          showMobileMenu ? 'max-h-[500px] border-t border-primary/10' : 'max-h-0'
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
            <Link to="/wishlist" onClick={() => setShowMobileMenu(false)} className="text-xs uppercase tracking-wider hover:text-accent transition-colors">
              Wishlist ({wishlistItems.length})
            </Link>
            <Link to="/cart" onClick={() => setShowMobileMenu(false)} className="text-xs uppercase tracking-wider hover:text-accent transition-colors">
              Cart ({totalQuantity})
            </Link>
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