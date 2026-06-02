"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import DraggableCard from './DraggableCard';
import GalleryCarousel from './GalleryCarousel';

const GalleryModal = ({ activeCategory, onClose }) => {
  const dragContainerRef = useRef(null);

  if (!activeCategory) return null;

  // Predefined layouts for polaroid piles
  const cardLayouts = [
    { top: "20%", left: "15%", rotate: "-8deg", className: "card-large" },
    { top: "35%", left: "45%", rotate: "6deg", className: "card-medium" },
    { top: "15%", left: "68%", rotate: "12deg", className: "card-small" },
    { top: "50%", left: "20%", rotate: "10deg", className: "card-medium" },
    { top: "20%", left: "40%", rotate: "-15deg", className: "card-large" },
    { top: "55%", left: "65%", rotate: "-5deg", className: "card-small" },
    { top: "15%", left: "30%", rotate: "8deg", className: "card-medium" },
    { top: "45%", left: "55%", rotate: "-12deg", className: "card-medium" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="popup-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.95)',
        zIndex: 1000,
        overflowY: 'auto',
      }}
    >
      {/* Fixed Close Button */}
      <button
        className="popup-close-btn"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 1010,
          backgroundColor: '#e62b1e',
          color: '#fff',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '999px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '14px',
          boxShadow: '0 4px 15px rgba(230,43,30,0.4)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        Close &times;
      </button>

      {/* Scrollable Modal Content Wrap */}
      <div className="popup-scroll-content">
        
        {/* Section A: Polaroid dragging sandbox */}
        <section className="drag-section" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 className="drag-bg-text" style={{ position: 'absolute', zIndex: 0, pointerEvents: 'none', select: 'none', userSelect: 'none', fontSize: '90px', fontWeight: '900', color: 'rgba(255,255,255,0.025)', textAlign: 'center', width: '100%', letterSpacing: '2px', fontFamily: 'Playfair Display, serif' }}>
            <span className="drag-bg-text-highlight" style={{ color: 'rgba(230,43,30,0.08)' }}>TEDx</span> Integral
          </h2>

          <div
            className="drag-cards-container"
            ref={dragContainerRef}
            style={{
              position: 'relative',
              width: '90%',
              height: '80%',
              zIndex: 5,
            }}
          >
            {activeCategory.dragImages.map((img, idx) => {
              const layout = cardLayouts[idx % cardLayouts.length];
              return (
                <DraggableCard
                  key={idx}
                  src={img}
                  alt={`${activeCategory.label} highlight`}
                  top={layout.top}
                  left={layout.left}
                  rotate={layout.rotate}
                  className={layout.className}
                  containerRef={dragContainerRef}
                />
              );
            })}
          </div>

          <div className="scroll-hint" style={{ position: 'absolute', bottom: '32px', color: 'rgba(255,255,255,0.5)', zIndex: 10, animation: 'bounce 2s infinite', fontSize: '14px', letterSpacing: '1px' }}>
            Scroll Down &darr;
          </div>
        </section>

        {/* Section B: Fullscreen sliding slide show */}
        <GalleryCarousel items={activeCategory.carouselImages} />
      </div>
    </motion.div>
  );
};

export default GalleryModal;
