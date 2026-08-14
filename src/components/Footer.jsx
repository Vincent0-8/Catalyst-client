import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing to Catalyst newsletter!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-secondary border-t border-primary/10 mt-auto">
      {/* Newsletter Section */}
      <div className="border-b border-primary/10 py-12 px-8 text-center bg-primary/5">
        <div className="max-w-xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-widest text-primary/60 mb-2">Join the Catalyst Club</p>
          <h3 className="font-serif text-2xl md:text-3xl text-accent mb-3">Curated Arrivals & Exclusive Updates</h3>
          <p className="font-sans text-xs text-primary/70 mb-6">
            Subscribe to receive independent boutique discoveries, seasonal lookbooks, and private member offers.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-secondary border border-primary/20 px-4 py-2 text-xs font-sans text-primary focus:outline-none focus:border-accent"
              required
            />
            <button
              type="submit"
              className="bg-accent text-secondary px-6 py-2.5 sm:py-2 text-xs uppercase tracking-wider font-medium hover:bg-primary transition-colors cursor-pointer w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs font-sans">
        {/* Brand Info */}
        <div>
          <h4 className="font-serif text-xl font-semibold text-accent mb-3">Catalyst</h4>
          <p className="text-primary/70 leading-relaxed">
            A curated marketplace connecting independent designers and modern style enthusiasts worldwide.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h5 className="font-sans font-semibold uppercase tracking-wider text-primary mb-4">Explore</h5>
          <ul className="flex flex-col gap-2.5 text-primary/80">
            <li><Link to="/?category=Outerwear" className="hover:text-accent transition-colors">Outerwear</Link></li>
            <li><Link to="/?category=Tops" className="hover:text-accent transition-colors">Tops</Link></li>
            <li><Link to="/?category=Bottoms" className="hover:text-accent transition-colors">Bottoms</Link></li>
            <li><Link to="/?category=Accessories" className="hover:text-accent transition-colors">Accessories</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h5 className="font-sans font-semibold uppercase tracking-wider text-primary mb-4">Customer Care</h5>
          <ul className="flex flex-col gap-2.5 text-primary/80">
            <li><Link to="/orders" className="hover:text-accent transition-colors">Order Tracking</Link></li>
            <li><Link to="/cart" className="hover:text-accent transition-colors">Shopping Bag</Link></li>
            <li><Link to="/wishlist" className="hover:text-accent transition-colors">Saved Wishlist</Link></li>
            <li><a href="#faq" onClick={(e) => { e.preventDefault(); toast.info('Customer care support: support@catalyst.com'); }} className="hover:text-accent transition-colors">Shipping & Returns</a></li>
          </ul>
        </div>

        {/* Boutique / Contact */}
        <div>
          <h5 className="font-sans font-semibold uppercase tracking-wider text-primary mb-4">Independent Boutiques</h5>
          <p className="text-primary/70 leading-relaxed mb-3">
            Handpicked independent fashion labels and sustainable designers.
          </p>
          <span className="inline-block text-[11px] text-accent border border-accent/30 px-3 py-1 uppercase tracking-wider">
            Verified Partner
          </span>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-primary/10 py-5 px-8 text-center font-sans text-[11px] text-primary/50">
        <p>© {new Date().getFullYear()} Catalyst Marketplace</p>
      </div>
    </footer>
  );
};

export default Footer;
