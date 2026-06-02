"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryCarousel = ({ items }) => {
  const [current, setCurrent] = useState(0);

  if (!items || items.length === 0) return null;

  const currentItem = items[current];

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev + 1) % items.length);
  };

  return (
    <section className="carousel-fullscreen" style={{ position: 'relative', width: '100%', height: '80vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Blurred background backdrop */}
      <div
        className="carousel-backdrop"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${currentItem.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px) brightness(0.4)',
          transform: 'scale(1.1)',
          zIndex: 0
        }}
      />
      
      {/* Dark tint overlay */}
      <div className="carousel-backdrop-overlay" style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1 }} />

      {/* Main Content frame */}
      <div className="carousel-content-wrapper" style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '100%', padding: '0 24px' }}>
        
        {/* Nav Prev */}
        <button
          onClick={handlePrev}
          className="carousel-nav-btn prev-btn"
          style={{
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
        >
          ❮
        </button>

        {/* Dynamic Image frame */}
        <div className="carousel-image-container" style={{ position: 'relative', flexGrow: 1, height: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 24px' }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              src={currentItem.image}
              alt="Gallery item"
              className="carousel-main-image"
              style={{
                maxWidth: '100%',
                maxHeight: '90%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 15px 40px rgba(0,0,0,0.8)'
              }}
            />
          </AnimatePresence>
          {currentItem.label && (
            <div className="carousel-image-caption" style={{ marginTop: '16px', textAlign: 'center' }}>
              <h3 style={{ margin: '0', fontSize: '16px', color: '#fff' }}>{currentItem.label}</h3>
              {currentItem.credit && <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{currentItem.credit}</p>}
            </div>
          )}
        </div>

        {/* Nav Next */}
        <button
          onClick={handleNext}
          className="carousel-nav-btn next-btn"
          style={{
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
        >
          ❯
        </button>

      </div>
    </section>
  );
};

export default GalleryCarousel;
