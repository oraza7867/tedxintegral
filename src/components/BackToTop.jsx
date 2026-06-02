'use client';

import React, { useState, useEffect } from 'react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return visible ? (
    <button onClick={scrollToTop} className="backtotop_backTotop__xIpB2">
      <i className="ri-arrow-up-s-line"></i>
    </button>
  ) : null;
};

export default BackToTop;
