import React from 'react';
import type { Metadata } from 'next';
import {
  BENEFITS,
  CURRENT_SPONSORS,
  PAST_SPONSORS,
  SPONSORS_PAGE_CONTENT,
  FALLBACK_TEXTS
} from '../../data/sponsorsData';

export const metadata: Metadata = {
  title: SPONSORS_PAGE_CONTENT.metaTitle,
  description: SPONSORS_PAGE_CONTENT.metaDescription,
};

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// Tokens:  Accent → #e62b1e  |  BG → #000  |  Text → #f5f5f7
// Fonts:   Playfair Display (headings) · DM Sans (body)
// ─────────────────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  /* ── SHELL ── */
  .sp { background:#000; color:#f5f5f7; min-height:100vh; font-family:'DM Sans',sans-serif; font-weight:300; overflow-x:hidden; }
  .sp-wrap { max-width:1080px; margin:0 auto; padding:0 40px; }

  /* ── SHARED TYPOGRAPHY ── */
  .sp-eyebrow { font-size:11px; font-weight:500; letter-spacing:.18em; text-transform:uppercase; color:rgba(255,255,255,.22); margin:0 0 56px; }
  .sp-h2 { font-family:'Playfair Display',serif; font-size:clamp(30px,4vw,48px); font-weight:400; letter-spacing:-.015em; line-height:1.1; margin:0 0 64px; }

  /* ── SHARED LOGO GRID ── */
  .sp-logo-grid { display:grid; gap:.5px; background:rgba(255,255,255,.06); border:.5px solid rgba(255,255,255,.06); }
  .sp-logo-cell { background:#000; display:flex; align-items:center; justify-content:center; padding:24px; transition:background .25s; }
  .sp-logo-cell:hover { background:#0a0a0a; }
  .sp-logo-cell img { max-width:100%; max-height:100%; object-fit:contain; transition:filter .35s; }
  .sp-logo-link { display:flex; align-items:center; justify-content:center; width:100%; height:100%; }

  /* ── SECTION SPACING ── */
  .sp-section { padding:100px 0; border-bottom:.5px solid rgba(255,255,255,.07); }
  .sp-section-last { padding:100px 0 140px; }

  /* ── HERO ── */
  .sp-hero { padding:160px 0 120px; border-bottom:.5px solid rgba(255,255,255,.07); }
  .sp-tag { display:flex; align-items:center; gap:10px; margin-bottom:40px; }
  .sp-tag-dot { width:5px; height:5px; border-radius:50%; background:#e62b1e; flex-shrink:0; }
  .sp-tag-txt { font-size:11px; font-weight:500; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.35); }
  .sp-h1 { font-family:'Playfair Display',serif; font-size:clamp(52px,7vw,92px); font-weight:400; line-height:1.02; letter-spacing:-.02em; margin:0 0 36px; max-width:820px; }
  .sp-h1 em { font-style:italic; color:#e62b1e; }
  .sp-lead { font-size:17px; line-height:1.8; color:rgba(255,255,255,.4); max-width:560px; margin:0; }

  /* ── CTA STRIP ── */
  .sp-cta { display:grid; grid-template-columns:1fr auto; align-items:end; gap:48px; }
  .sp-cta h2 { font-family:'Playfair Display',serif; font-size:clamp(28px,4vw,46px); font-weight:400; line-height:1.12; letter-spacing:-.015em; margin:0 0 18px; max-width:580px; }
  .sp-cta p { font-size:15px; line-height:1.8; color:rgba(255,255,255,.4); margin:0; max-width:520px; }
  .sp-btn { display:inline-flex; align-items:center; gap:10px; padding:15px 30px; background:#e62b1e; color:#fff; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500; letter-spacing:.02em; border-radius:999px; text-decoration:none; white-space:nowrap; transition:background .2s,transform .2s; }
  .sp-btn:hover { background:#ff3b30; transform:translateY(-2px); }
  .sp-btn span { transition:transform .2s; }
  .sp-btn:hover span { transform:translateX(3px); }

  /* ── CURRENT SPONSORS ── */
  .cs-tier { margin-bottom:48px; }
  .cs-tier:last-child { margin-bottom:0; }
  .cs-tier-label { font-size:10px; font-weight:500; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.18); margin:0 0 14px; }

  /* ── BENEFITS GRID ── */
  .sp-benefits-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:.5px; background:rgba(255,255,255,.06); border:.5px solid rgba(255,255,255,.06); }
  .sp-card { background:#000; padding:40px 32px; transition:background .25s; }
  .sp-card:hover { background:#0a0a0a; }
  .sp-card-icon { font-size:26px; margin-bottom:22px; display:block; }
  .sp-card-title { font-size:15px; font-weight:500; color:#f5f5f7; margin:0 0 10px; letter-spacing:-.01em; }
  .sp-card-desc { font-size:13px; line-height:1.8; color:rgba(255,255,255,.35); margin:0; }

  /* ── PAST SPONSORS ── */
  .sp-past-grid { background:rgba(255,255,255,.05); border:.5px solid rgba(255,255,255,.05); }
  .sp-past-cell img { filter:grayscale(1) brightness(.4); }
  .sp-past-cell:hover img { filter:grayscale(0) brightness(1); }
  .sp-sub { font-size:15px; line-height:1.8; color:rgba(255,255,255,.35); max-width:480px; margin:-32px 0 56px; }

  /* ── EMPTY STATES ── */
  .sp-empty { grid-column:1/-1; padding:72px 32px; text-align:center; background:#000; }
  .sp-empty h3 { font-family:'Playfair Display',serif; font-size:22px; font-weight:400; color:rgba(255,255,255,.25); margin:0 0 8px; }
  .sp-empty p { font-size:13px; color:rgba(255,255,255,.15); margin:0; font-style:italic; }

  /* ── RESPONSIVE ── */
  @media(max-width:680px) {
    .sp-wrap { padding:0 24px; }
    .sp-hero { padding:110px 0 80px; }
    .sp-cta { grid-template-columns:1fr; gap:28px; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// TIER CONFIG — controls display order, labels, and sizing for CurrentSponsors.
// To add a new tier: add an entry here AND use that key in CURRENT_SPONSORS.
// ─────────────────────────────────────────────────────────────────────────────
const TIERS = [
  { key: 'title',     label: 'Title Sponsor',     cellHeight: 140, cols: '300px' },
  { key: 'gold',      label: 'Gold Partners',      cellHeight: 110, cols: '220px' },
  { key: 'silver',    label: 'Silver Partners',    cellHeight: 90,  cols: '180px' },
  { key: 'community', label: 'Community Partners', cellHeight: 80,  cols: '160px' },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTIONS
// ─────────────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <header className="sp-hero">
      <div className="sp-tag">
        <span className="sp-tag-dot" />
        <span className="sp-tag-txt">{SPONSORS_PAGE_CONTENT.eyebrow}</span>
      </div>
      <h1 className="sp-h1">
        Partner <em>with</em><br />us.
      </h1>
      <p className="sp-lead">{SPONSORS_PAGE_CONTENT.subtitle}</p>
    </header>
  );
}

function CTA() {
  return (
    <div className="sp-section sp-cta">
      <div>
        <h2>{SPONSORS_PAGE_CONTENT.ctaTitle}</h2>
        <p>{SPONSORS_PAGE_CONTENT.ctaDescription}</p>
      </div>
      <a href={`mailto:${SPONSORS_PAGE_CONTENT.contactEmail}`} className="sp-btn">
        {SPONSORS_PAGE_CONTENT.ctaButtonText}
        <span>→</span>
      </a>
    </div>
  );
}

// Hides itself when CURRENT_SPONSORS is empty — no placeholder shown
function CurrentSponsors() {
  if (!CURRENT_SPONSORS?.length) return null;

  return (
    <section className="sp-section">
      <p className="sp-eyebrow">00 — Current partners</p>
      <h2 className="sp-h2">{SPONSORS_PAGE_CONTENT.currentSponsorsHeading}</h2>

      {TIERS.map(({ key, label, cellHeight, cols }) => {
        const sponsors = CURRENT_SPONSORS.filter(s => s.tier === key);
        if (!sponsors.length) return null;

        return (
          <div key={key} className="cs-tier">
            <p className="cs-tier-label">{label}</p>
            <div
              className="sp-logo-grid"
              style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${cols}, 1fr))` }}
            >
              {sponsors.map((s, i) => (
                <div key={s.id ?? i} className="sp-logo-cell" style={{ height: cellHeight }}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="sp-logo-link" aria-label={s.name}>
                      <img src={s.logo} alt={s.name} />
                    </a>
                  ) : (
                    <img src={s.logo} alt={s.name} />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

function Benefits() {
  return (
    <section className="sp-section">
      <p className="sp-eyebrow">01 — Why partner</p>
      <h2 className="sp-h2">{SPONSORS_PAGE_CONTENT.benefitsHeading}</h2>
      <div className="sp-benefits-grid">
        {BENEFITS?.length ? (
          BENEFITS.map((b, i) => (
            <div key={b.id ?? i} className="sp-card">
              <span className="sp-card-icon" role="img" aria-label="">{b.icon}</span>
              <h3 className="sp-card-title">{b.title}</h3>
              <p className="sp-card-desc">{b.description}</p>
            </div>
          ))
        ) : (
          <div className="sp-empty">
            <p>Content details will be published shortly.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function PastSponsors() {
  return (
    <section className="sp-section-last">
      <p className="sp-eyebrow">02 — Past partners</p>
      <h2 className="sp-h2">{SPONSORS_PAGE_CONTENT.pastSponsorsHeading}</h2>
      <p className="sp-sub">{SPONSORS_PAGE_CONTENT.pastSponsorsSubtitle}</p>
      <div
        className="sp-logo-grid sp-past-grid"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}
      >
        {PAST_SPONSORS?.length ? (
          PAST_SPONSORS.map((s, i) => (
            <div key={s.id ?? i} className="sp-logo-cell sp-past-cell" style={{ height: 100 }}>
              <img src={s.logo} alt={s.name} />
            </div>
          ))
        ) : (
          <div className="sp-empty">
            <h3>{FALLBACK_TEXTS.sponsors.heading}</h3>
            <p>{FALLBACK_TEXTS.sponsors.subheading}</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE — reorder sections here
// ─────────────────────────────────────────────────────────────────────────────
export default function SponsorsPage() {
  return (
    <section className="sp" id="sponsors">
      <style>{STYLES}</style>
      <div className="sp-wrap">
        <Hero />
        <CTA />
        <CurrentSponsors />
        <Benefits />
        <PastSponsors />
      </div>
    </section>
  );
}