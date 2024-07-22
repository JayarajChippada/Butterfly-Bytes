import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [scrollPositions, setScrollPositions] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollPositions((prev) => ({
        ...prev,
        [pathname]: window.scrollY,
      }));
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (scrollPositions[pathname] !== undefined) {
      window.scrollTo(0, scrollPositions[pathname]);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, scrollPositions]);

  return null;
};

export default ScrollToTop;
