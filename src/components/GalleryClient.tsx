'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GALLERY_DATA } from '../data/galleryData';
import { FALLBACK_TEXTS } from '../data/fallbackTexts';
import GalleryModal from './GalleryModal';

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<any>(null);

  useEffect(() => {
    document.body.style.overflow = activeCategory ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeCategory]);

  const dataList = GALLERY_DATA || [];

  return (
    <>
      <div className="event-gallery__grid">
        {dataList.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', padding: '60px 24px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '16px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>{FALLBACK_TEXTS.gallery.heading}</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{FALLBACK_TEXTS.gallery.subheading}</p>
          </div>
        ) : (
          dataList.map((item) => (
            <article
              key={item.id}
              className="event-gallery__card"
              onClick={() => setActiveCategory(item)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={item.coverImage || '/images/placeholders/gallery-cover.png'}
                alt={item.label}
                className="event-gallery__image"
                loading="lazy"
              />
              <div className="event-gallery__overlay">
                {(item as any).credit && (
                  <span className="event-gallery__credit">{(item as any).credit}</span>
                )}
                <h2 className="event-gallery__label">{item.label}</h2>
              </div>
            </article>
          ))
        )}
      </div>

      <AnimatePresence>
        {activeCategory && (
          <GalleryModal
            activeCategory={activeCategory}
            onClose={() => setActiveCategory(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
