import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Multi-browser & iOS Safari compatible scroll reset
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;

