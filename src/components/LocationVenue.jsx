import React from 'react';
import { CONTACT_PAGE_CONTENT } from '../data/contactData';

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// Quick token reference — find & replace to retheme:
//   Accent red   →  #e62b1e
//   Background   →  #0a0a0a
//   Text white   →  #f0f0f0
//   Fonts        →  change the @import URL + font-family declarations
// ─────────────────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

  /* ── PAGE SHELL ─────────────────────────────── */
  .lv-page {
    background: #0a0a0a;
    color: #f0f0f0;
    font-family: 'DM Sans', -apple-system, sans-serif;
    font-weight: 300;
    padding: 80px 48px;
  }

  /* ── OUTER WRAPPER: tight max-width ─────────── */
  .lv-wrap {
    max-width: 1040px;
    margin: 0 auto;
  }

  /* ── EYEBROW ROW ────────────────────────────── */
  .lv-eyebrow {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 40px;
  }
  .lv-eyebrow-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #e62b1e;
    flex-shrink: 0;
  }
  .lv-eyebrow-text {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
  }
  .lv-eyebrow-rule {
    flex: 1;
    height: 0.5px;
    background: rgba(255,255,255,0.07);
  }

  /* ── MAIN SPLIT: map left | details right ───── */
  .lv-split {
    display: grid;
    grid-template-columns: 1fr 380px;
    border: 0.5px solid rgba(255,255,255,0.07);
    overflow: hidden;
  }

  /* ── LEFT: MAP ──────────────────────────────── */
  .lv-map {
    position: relative;
    min-height: 460px;
    overflow: hidden;
  }
  .lv-map iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
    filter: grayscale(100%) brightness(0.55) contrast(1.1);
    transition: filter 0.6s ease;
  }
  .lv-map:hover iframe {
    filter: grayscale(0%) brightness(1) contrast(1);
  }
  /* Red corner accent on the map */
  .lv-map-corner {
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 48px;
    background: #e62b1e;
    pointer-events: none;
  }
  .lv-map-corner::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 48px;
    height: 3px;
    background: #e62b1e;
  }
  /* Explore badge */
  .lv-map-badge {
    position: absolute;
    bottom: 16px;
    left: 16px;
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    background: rgba(10,10,10,0.75);
    padding: 5px 10px;
    border: 0.5px solid rgba(255,255,255,0.1);
    pointer-events: none;
  }

  /* ── RIGHT: DETAILS PANEL ───────────────────── */
  .lv-panel {
    border-left: 0.5px solid rgba(255,255,255,0.07);
    display: flex;
    flex-direction: column;
    background: #0e0e0e;
  }

  /* Venue name block */
  .lv-panel-hero {
    padding: 32px 28px 28px;
    border-bottom: 0.5px solid rgba(255,255,255,0.06);
  }
  .lv-panel-tag {
    font-size: 9px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    margin: 0 0 12px;
  }
  .lv-panel-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 22px;
    font-weight: 400;
    line-height: 1.25;
    letter-spacing: -0.01em;
    color: #f0f0f0;
    margin: 0 0 6px;
  }
  .lv-panel-title em {
    font-style: italic;
    color: #e62b1e;
  }
  .lv-panel-subtitle {
    font-size: 12px;
    color: rgba(255,255,255,0.3);
    margin: 0;
    font-weight: 300;
  }

  /* Description */
  .lv-panel-desc {
    padding: 22px 28px;
    border-bottom: 0.5px solid rgba(255,255,255,0.06);
    font-size: 12.5px;
    line-height: 1.8;
    color: rgba(255,255,255,0.38);
    font-weight: 300;
    margin: 0;
  }

  /* Meta rows */
  .lv-meta {
    flex: 1;
  }
  .lv-meta-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 28px;
    border-bottom: 0.5px solid rgba(255,255,255,0.05);
  }
  .lv-meta-key {
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.2);
    flex-shrink: 0;
  }
  .lv-meta-val {
    font-size: 12px;
    color: rgba(255,255,255,0.7);
    font-weight: 300;
    text-align: right;
  }

  /* CTA */
  .lv-cta-wrap {
    padding: 20px 28px;
  }
  .lv-cta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 13px 18px;
    background: #e62b1e;
    color: #fff;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-decoration: none;
    transition: background 0.2s, transform 0.2s;
    font-family: 'DM Sans', sans-serif;
    box-sizing: border-box;
  }
  .lv-cta:hover {
    background: #ff3026;
    transform: translateY(-1px);
  }
  .lv-cta-arrow { font-size: 14px; transition: transform 0.2s; }
  .lv-cta:hover .lv-cta-arrow { transform: translateX(4px); }

  /* ── RESPONSIVE ─────────────────────────────── */
  @media (max-width: 760px) {
    .lv-page  { padding: 56px 20px; }
    .lv-split { grid-template-columns: 1fr; }
    .lv-map   { min-height: 240px; }
    .lv-panel { border-left: none; border-top: 0.5px solid rgba(255,255,255,0.07); }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// SECTION: MAP
// Desaturated by default, full colour on hover. Red corner bracket is decorative.
// To turn off the colour-on-hover effect: remove the .lv-map:hover rule in STYLES.
// ─────────────────────────────────────────────────────────────────────────────
function Map({ venue }) {
  return (
    <div className="lv-map">
      <iframe
        src={venue.mapEmbedUrl}
        allowFullScreen=""
        loading="lazy"
        title="Venue location"
      />
      <div className="lv-map-corner" />
      <span className="lv-map-badge">Hover to explore →</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION: DETAILS PANEL
// Compact right-hand panel with venue name, description, meta rows, CTA.
// To add/remove meta rows: edit the metaRows array below.
// ─────────────────────────────────────────────────────────────────────────────
function Panel({ venue }) {
  // Add, remove, or reorder rows freely
  const metaRows = [
    { key: 'Location', value: venue.location },
    { key: 'Date',     value: venue.date     },
    { key: 'Time',     value: venue.time     },
  ];

  return (
    <div className="lv-panel">

      {/* Venue name */}
      <div className="lv-panel-hero">
        <p className="lv-panel-tag">{venue.subtitle}</p>
        <h2 className="lv-panel-title">
          Hosted at the <em>{venue.title}</em>
        </h2>
        <p className="lv-panel-subtitle">TEDx Event Venue</p>
      </div>

      {/* Description */}
      <p className="lv-panel-desc">{venue.description}</p>

      {/* Meta rows */}
      <div className="lv-meta">
        {metaRows.map(({ key, value }) => (
          <div key={key} className="lv-meta-row">
            <span className="lv-meta-key">{key}</span>
            <span className="lv-meta-val">{value}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="lv-cta-wrap">
        <a
          href={venue.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="lv-cta"
        >
          Open in Maps
          <span className="lv-cta-arrow">→</span>
        </a>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE — ASSEMBLER
// ─────────────────────────────────────────────────────────────────────────────
const LocationVenue = () => {
  const { venue } = CONTACT_PAGE_CONTENT;
  if (!venue) return null;

  return (
    <section className="lv-page">
      <style>{STYLES}</style>
      <div className="lv-wrap">

        {/* Eyebrow rule */}
        <div className="lv-eyebrow">
          <span className="lv-eyebrow-dot" />
          <span className="lv-eyebrow-text">Venue & Location</span>
          <span className="lv-eyebrow-rule" />
        </div>

        {/* Map | Panel */}
        <div className="lv-split">
          <Map venue={venue} />
          <Panel venue={venue} />
        </div>

      </div>
    </section>
  );
};

export default LocationVenue;
