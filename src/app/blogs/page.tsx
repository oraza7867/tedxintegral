import React from 'react';
import type { Metadata } from 'next';
import { BLOGS_DATA, BLOGS_PAGE_CONTENT } from '../../data/blogsData';
import { FALLBACK_TEXTS } from '../../data/fallbackTexts';

export const metadata: Metadata = {
  title: BLOGS_PAGE_CONTENT.metaTitle,
  description: BLOGS_PAGE_CONTENT.metaDescription,
};

export default function BlogsPage() {
  const blogs = BLOGS_DATA || [];
  return (
    <div className="blogs_blogSection__doh6s" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '80px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Blog Section Header */}
        <header className="blogs_blogHeader__fmiTx" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', margin: '0 0 16px', fontFamily: 'Playfair Display, serif' }}>
            {BLOGS_PAGE_CONTENT.titlePart1}<span className="blogs_highlight__BuTqT" style={{ color: '#e62b1e' }}>{BLOGS_PAGE_CONTENT.titlePart2}</span>
          </h2>
          <div className="blogs_headerBar__beID-" style={{ width: '60px', height: '4px', backgroundColor: '#e62b1e', margin: '0 auto' }} />
        </header>

        {/* Blog Cards Grid */}
        <div className="blogs_blogGrid__A-ngW" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
          {blogs.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '60px 24px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '16px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>{FALLBACK_TEXTS.blogs.heading}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{FALLBACK_TEXTS.blogs.subheading}</p>
            </div>
          ) : (
            blogs.map((blog) => (
              <a
                key={blog.id}
                href={blog.link}
                className="blogs_blogCard__E3tdl"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  color: 'inherit',
                  height: '350px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Card Background Image */}
                <div
                  className="blogs_cardBg__e1L5l"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${blog.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.5s ease',
                    zIndex: 1
                  }}
                />
                
                {/* Dark Overlay Filter */}
                <div
                  className="blogs_cardOverlay__aFZlm"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.65)',
                    transition: 'background-color 0.3s ease',
                    zIndex: 2
                  }}
                />
                
                {/* Card Content Container */}
                <div
                  className="blogs_cardContent__kphZl"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    zIndex: 3
                  }}
                >
                  <span
                    className="blogs_cardCategory__5rTsk"
                    style={{
                      alignSelf: 'flex-start',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      color: '#e62b1e',
                      backgroundColor: 'rgba(230,43,30,0.1)',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      border: '1px solid rgba(230,43,30,0.2)',
                      marginBottom: '12px'
                    }}
                  >
                    {blog.category}
                  </span>
                  
                  <h3
                    className="blogs_cardTitle__yhNgn"
                    style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      margin: '0 0 12px',
                      lineHeight: '1.4',
                      color: '#fff'
                    }}
                  >
                    {blog.title}
                  </h3>
                  
                  {/* Description Block */}
                  <div className="blogs_cardDescContainer__m9OiW" style={{ position: 'relative', overflow: 'hidden', height: '48px', marginBottom: '16px' }}>
                    <p
                      className="blogs_shortDesc__8els0"
                      style={{
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: 'rgba(255,255,255,0.7)',
                        margin: '0',
                        position: 'absolute',
                        inset: 0,
                        transition: 'opacity 0.3s ease'
                      }}
                    >
                      {blog.shortDesc}
                    </p>
                    <p
                      className="blogs_longDesc__lWDq3"
                      style={{
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: 'rgba(255,255,255,0.85)',
                        margin: '0',
                        position: 'absolute',
                        inset: 0,
                        opacity: 0,
                        transition: 'opacity 0.3s ease'
                      }}
                    >
                      {blog.longDesc}
                    </p>
                  </div>
                  
                  {/* Read More Link */}
                  <div
                    className="blogs_readMore__yoYtL"
                    style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#e62b1e',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    Read Article <span className="blogs_arrow__VElh9" style={{ transition: 'transform 0.3s ease' }}>→</span>
                  </div>
                </div>
              </a>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
