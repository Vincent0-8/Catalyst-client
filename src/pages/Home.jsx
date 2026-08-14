import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import ProductCard from "../components/ProductCard";
import { getProducts } from '../redux/slices/productSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  const { items, loading, error } = useSelector((state) => state.products);
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    dispatch(getProducts({ category, search }));
  }, [dispatch, category, search]);

  const debouncedSetSearch = useMemo(
    () => debounce((term) => {
      setSearchParams(term ? { search: term } : {});
    }, 500),
    [setSearchParams]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSetSearch(value);
  };

  const isFiltering = Boolean(category || search);

  if (loading) return <p className="px-8 py-10">Loading...</p>;
  if (error) {
    const errorMsg = typeof error === 'string' ? error : error.message || 'Failed to load products';
    return <p className="px-8 py-10 text-red-500">Error: {errorMsg}</p>;
  }

  return (
    <div>
      {/* Hero Section */}
      {!isFiltering && (
        <div
          className="relative bg-cover bg-center min-h-[70vh] flex items-center justify-center px-8 text-center"
          style={{ backgroundImage: `url(/hero-unsplash.jpg)` }}
        >
          <div className="absolute inset-0 bg-secondary/70" />
          <div className="relative">
            <p
              data-aos="fade-up"
              data-aos-duration="700"
              className="font-sans text-xs uppercase tracking-widest text-primary/60 mb-2"
            >
              New Season Collection
            </p>
            <h1
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay="100"
              className="font-serif text-4xl md:text-5xl text-accent mb-4"
            >
              Curated Fashion Essentials
            </h1>
            <p
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay="200"
              className="font-sans text-sm text-primary/70 max-w-md mx-auto mb-6"
            >
              Discover timeless silhouettes, luxury outerwear, and minimalist apparel crafted for everyday elegance.
            </p>
            <input
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay="300"
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full max-w-sm mx-auto block border-b border-primary/40 bg-transparent px-3 py-2 text-sm font-sans text-center focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      )}

      {/* Title Header */}
      {isFiltering && (
        <div className="px-8 pt-8 pb-4 border-b border-primary/10 mb-6 flex justify-between items-center">
          <h1 className="font-serif text-2xl text-primary">
            {category ? category : `Search results for "${search}"`}
          </h1>
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={handleSearchChange}
            className="border-b border-primary/40 bg-transparent px-2 py-1 text-sm font-sans w-48 focus:outline-none focus:border-accent"
          />
        </div>
      )}

      {/* Product Grid / Empty State */}
      <div className="px-8 py-8 pb-16">
        {!isFiltering && (
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl text-primary font-medium tracking-wide">Featured Collection</h2>
            <div className="w-12 h-0.5 bg-accent/40 mx-auto mt-2" />
          </div>
        )}
        {items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl text-primary mb-2">No products found</p>
            <p className="font-sans text-sm text-primary/60 mb-6">
              We couldn't find any items matching your search or category filter.
            </p>
            <button
              onClick={() => { setSearchInput(''); navigate('/'); }}
              className="bg-primary text-secondary px-6 py-2 text-xs uppercase tracking-wider hover:bg-accent transition-colors cursor-pointer"
            >
              View All Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {items.map((product, index) => (
              <ProductCard key={product._id} product={product} delay={index * 100} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;