import React from 'react';
import type { Metadata } from 'next';
import GalleryClient from '../../components/GalleryClient';
import { GALLERY_PAGE_CONTENT } from '../../data/galleryData';

export const metadata: Metadata = {
  title: GALLERY_PAGE_CONTENT.metaTitle,
  description: GALLERY_PAGE_CONTENT.metaDescription,
};

export default function GalleryPage() {
  return (
    <section className="event-gallery" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', paddingBottom: '80px' }}>
      <header className="event-gallery__header">
        <h1 className="event-gallery__title">
          <span className="event-gallery__title-bold">
            <span className="kireeti">{GALLERY_PAGE_CONTENT.titlePart1}</span>{GALLERY_PAGE_CONTENT.titlePart2}
          </span>
          {GALLERY_PAGE_CONTENT.titlePart3}
        </h1>
      </header>

      <GalleryClient />
    </section>
  );
}
