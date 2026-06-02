"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DraggableCard = ({ src, alt, top, left, rotate, className, containerRef }) => {
  const [zIndex, setZIndex] = useState(1);

  const bringToFront = () => {
    // Query all polaroid cards in the container
    const cards = document.querySelectorAll('.drag-card-element');
    let maxZ = 0;
    cards.forEach((card) => {
      const z = parseInt(window.getComputedStyle(card).zIndex, 10);
      if (!isNaN(z) && z > maxZ) {
        maxZ = z;
      }
    });
    setZIndex(maxZ + 1);
  };

  return (
    <motion.img
      src={src}
      alt={alt}
      onPointerDown={bringToFront}
      drag
      dragConstraints={containerRef}
      dragElastic={0.65}
      style={{
        position: 'absolute',
        top: top,
        left: left,
        rotate: rotate,
        zIndex: zIndex,
        cursor: 'grab',
      }}
      className={`drag-card-element ${className}`}
      whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
    />
  );
};

export default DraggableCard;
