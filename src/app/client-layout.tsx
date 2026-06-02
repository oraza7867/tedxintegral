'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MobileNavbar from '../components/MobileNavbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import Preloader from '../components/Preloader';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 750);
    };
    window.addEventListener('resize', handleResize);

    // Defer state updates to avoid synchronous setState inside the effect body
    setTimeout(() => {
      handleResize();
      setMounted(true);
    }, 0);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) {
    // Avoid hydration mismatch by rendering a dark shell until mounted
    return <div className="App-root" style={{ background: '#000', minHeight: '100vh' }} />;
  }

  return (
    <div className="App-root">
      {/* 1. Preloader Video Intro Screen */}
      {!videoEnded && (
        <Preloader onVideoEnd={() => setVideoEnded(true)} />
      )}

      {/* 2. Responsive Navigation System */}
      {isMobile ? <MobileNavbar /> : <Navbar />}

      {/* 3. Main Content Wrap */}
      <div className={isMobile ? "App_mobileContent__bf9bw" : "App_desktopContent__K+y8X"}>
        {children}

        {/* 4. Back To Top Arrow Button */}
        <BackToTop />

        {/* 5. Shared Global Footer */}
        <Footer />
      </div>
    </div>
  );
}
