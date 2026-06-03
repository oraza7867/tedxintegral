import React from 'react';
import { CONTACT_PAGE_CONTENT } from '../data/contactData';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap');

  .lv-page {
    background: #080808;
    color: #f0f0f0;
    font-family: 'Inter', -apple-system, sans-serif;
    font-weight: 300;
    padding: 72px 48px;
  }
  .lv-wrap {
    max-width: 980px;
    margin: 0 auto;
  }

  /* Eyebrow */
  .lv-eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 44px;
  }
  .lv-eyebrow-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #e62b1e;
    flex-shrink: 0;
  }
  .lv-eyebrow-text {
    font-size: 9.5px;
    font-weight: 500;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.22);
  }
  .lv-eyebrow-rule {
    flex: 1;
    height: 0.5px;
    background: rgba(255,255,255,0.06);
  }

  /* Grid */
  .lv-split {
    display: grid;
    grid-template-columns: 1fr 360px;
    height: 480px;
    border: 0.5px solid rgba(255,255,255,0.07);
    overflow: hidden;
  }

  /* Map */
  .lv-map {
    position: relative;
    overflow: hidden;
    background: #0c0c0c;
  }
  .lv-map iframe,
  .lv-map img {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
    object-fit: cover;
    filter: grayscale(1) brightness(0.45) contrast(1.15);
    transition: filter 0.8s ease;
  }
  .lv-map:hover iframe,
  .lv-map:hover img {
    filter: grayscale(0.2) brightness(0.75) contrast(1.05);
  }
  .lv-map-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(8,8,8,0.3) 0%, transparent 60%);
    pointer-events: none;
  }
  .lv-map-corner {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }
  .lv-map-corner::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 2px; height: 44px;
    background: #e62b1e;
  }
  .lv-map-corner::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 44px; height: 2px;
    background: #e62b1e;
  }
  .lv-map-footer {
    position: absolute;
    bottom: 18px;
    left: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
    pointer-events: none;
  }
  .lv-map-pill {
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.38);
    background: rgba(0,0,0,0.6);
    padding: 5px 11px;
    border: 0.5px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  .lv-map-coords {
    font-size: 9px;
    font-weight: 300;
    letter-spacing: 0.12em;
    color: rgba(255,255,255,0.2);
    font-variant-numeric: tabular-nums;
  }

  /* Panel */
  .lv-panel {
    border-left: 0.5px solid rgba(255,255,255,0.07);
    display: flex;
    flex-direction: column;
    background: #0b0b0b;
    overflow: hidden;
  }
  .lv-panel-top {
    padding: 32px 28px 26px;
    border-bottom: 0.5px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
  }
  .lv-panel-tag {
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.2);
    margin: 0 0 14px;
  }
  .lv-panel-title {
    font-size: 26px;
    font-weight: 200;
    color: #f5f5f5;
    line-height: 1.18;
    letter-spacing: -0.025em;
    margin: 0 0 6px;
  }
  .lv-panel-title strong {
    font-weight: 600;
    color: #ffffff;
  }
  .lv-panel-title em {
    font-style: normal;
    color: #e62b1e;
    font-weight: 300;
  }
  .lv-panel-sub {
    font-size: 11px;
    font-weight: 300;
    color: rgba(255,255,255,0.28);
    letter-spacing: 0.06em;
    margin: 0;
  }

  /* Description */
  .lv-panel-desc {
    padding: 20px 28px;
    border-bottom: 0.5px solid rgba(255,255,255,0.06);
    font-size: 12px;
    line-height: 1.85;
    color: rgba(255,255,255,0.35);
    font-weight: 300;
    margin: 0;
    flex-shrink: 0;
  }

  /* Stats row */
  .lv-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 0.5px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
  }
  .lv-stat {
    padding: 16px 20px;
    border-right: 0.5px solid rgba(255,255,255,0.06);
  }
  .lv-stat:last-child { border-right: none; }
  .lv-stat-label {
    font-size: 8.5px;
    font-weight: 500;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.18);
    margin: 0 0 6px;
  }
  .lv-stat-value {
    font-size: 14px;
    font-weight: 300;
    color: rgba(255,255,255,0.78);
    letter-spacing: -0.01em;
    margin: 0;
  }

  /* Meta rows */
  .lv-meta { flex: 1; overflow: hidden; }
  .lv-meta-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 28px;
    border-bottom: 0.5px solid rgba(255,255,255,0.045);
  }
  .lv-meta-row:last-child { border-bottom: none; }
  .lv-meta-left {
    display: flex;
    align-items: center;
    gap: 9px;
  }
  .lv-meta-icon {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    opacity: 0.28;
  }
  .lv-meta-key {
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.08em;
    color: rgba(255,255,255,0.28);
  }
  .lv-meta-val {
    font-size: 11.5px;
    font-weight: 300;
    color: rgba(255,255,255,0.7);
    letter-spacing: 0.01em;
  }

  /* CTA */
  .lv-cta-wrap {
    border-top: 0.5px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
  }
  .lv-cta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 15px 28px;
    background: transparent;
    color: rgba(255,255,255,0.9);
    font-family: 'Inter', sans-serif;
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-decoration: none;
    transition: background 0.2s ease;
    cursor: pointer;
    box-sizing: border-box;
    border: none;
    outline: none;
  }
  .lv-cta:hover {
    background: rgba(230,43,30,0.08);
  }
  .lv-cta:hover .lv-cta-arrow {
    transform: translateX(4px);
    color: #e62b1e;
  }
  .lv-cta-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .lv-cta-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #e62b1e;
    flex-shrink: 0;
  }
  .lv-cta-arrow {
    font-size: 16px;
    color: rgba(255,255,255,0.3);
    transition: transform 0.2s ease, color 0.2s ease;
  }

  /* Responsive */
  @media (max-width: 760px) {
    .lv-page  { padding: 52px 20px; }
    .lv-split { grid-template-columns: 1fr; height: auto; }
    .lv-map   { min-height: 240px; }
    .lv-panel { border-left: none; border-top: 0.5px solid rgba(255,255,255,0.07); }
    .lv-panel-title { font-size: 22px; }
    .lv-map-coords { display: none; }
  }
`;

/* SVG icons — inline so zero deps */
const IconPin = () => (
  <svg className="lv-meta-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" style={{ color: 'rgba(255,255,255,0.5)' }}>
    <circle cx="8" cy="6.5" r="2.5" />
    <path d="M8 1C5.24 1 3 3.24 3 6c0 4 5 9 5 9s5-5 5-9c0-2.76-2.24-5-5-5z" strokeLinejoin="round" />
  </svg>
);
const IconCal = () => (
  <svg className="lv-meta-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" style={{ color: 'rgba(255,255,255,0.5)' }}>
    <rect x="2" y="3" width="12" height="11" rx="1.5" />
    <path d="M2 7h12M5 1v4M11 1v4" />
  </svg>
);
const IconClock = () => (
  <svg className="lv-meta-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" style={{ color: 'rgba(255,255,255,0.5)' }}>
    <circle cx="8" cy="8" r="6" />
    <path d="M8 5v3.5l2.5 1.5" />
  </svg>
);

function Map({ venue }) {
  return (
    <div className="lv-map">
      <iframe
        src={venue.mapEmbedUrl}
        allowFullScreen=""
        loading="lazy"
        title="Venue location"
      />
      <div className="lv-map-overlay" />
      <div className="lv-map-corner" />
      <div className="lv-map-footer">
        <span className="lv-map-pill">{venue.title} · {venue.city}</span>
        {venue.coordinates && (
          <span className="lv-map-coords">{venue.coordinates}</span>
        )}
      </div>
    </div>
  );
}

function Panel({ venue }) {
  const metaRows = [
    { key: 'Address', icon: <IconPin />,   value: venue.location },
    { key: 'Date',    icon: <IconCal />,   value: venue.date     },
    { key: 'Time',    icon: <IconClock />, value: venue.time     },
  ];

  return (
    <div className="lv-panel">

      <div className="lv-panel-top">
        <p className="lv-panel-tag">{venue.subtitle || 'TEDx Event Venue'}</p>
        <h2 className="lv-panel-title">
          <strong>{venue.titleStrong || 'Integral'}</strong>{' '}
          <em>{venue.titleEm || 'University'}</em>
        </h2>
        <p className="lv-panel-sub">{venue.city}{venue.region ? `, ${venue.region}` : ''}</p>
      </div>

      <p className="lv-panel-desc">{venue.description}</p>

      {(venue.capacity || venue.campus) && (
        <div className="lv-stats">
          {venue.capacity && (
            <div className="lv-stat">
              <p className="lv-stat-label">Capacity</p>
              <p className="lv-stat-value">{venue.capacity}</p>
            </div>
          )}
          {venue.campus && (
            <div className="lv-stat">
              <p className="lv-stat-label">Campus</p>
              <p className="lv-stat-value">{venue.campus}</p>
            </div>
          )}
        </div>
      )}

      <div className="lv-meta">
        {metaRows.map(({ key, icon, value }) => value && (
          <div key={key} className="lv-meta-row">
            <div className="lv-meta-left">
              {icon}
              <span className="lv-meta-key">{key}</span>
            </div>
            <span className="lv-meta-val">{value}</span>
          </div>
        ))}
      </div>

      <div className="lv-cta-wrap">
        <a
          href={venue.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="lv-cta"
        >
          <div className="lv-cta-left">
            <div className="lv-cta-dot" />
            <span>Open in Maps</span>
          </div>
          <span className="lv-cta-arrow">→</span>
        </a>
      </div>

    </div>
  );
}

const LocationVenue = () => {
  const { venue } = CONTACT_PAGE_CONTENT;
  if (!venue) return null;

  return (
    <section className="lv-page">
      <style>{STYLES}</style>
      <div className="lv-wrap">

        <div className="lv-eyebrow">
          <span className="lv-eyebrow-dot" />
          <span className="lv-eyebrow-text">Venue &amp; Location</span>
          <span className="lv-eyebrow-rule" />
        </div>

        <div className="lv-split">
          <Map venue={venue} />
          <Panel venue={venue} />
        </div>

      </div>
    </section>
  );
};

export default LocationVenue;