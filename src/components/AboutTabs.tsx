'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ABOUT_TABS } from '../data/aboutTabs';

// ─── Design Tokens ────────────────────────────────────────────────────────────
const T = {
  font:    "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
  red:     '#e62b1e',
  redDim:  'rgba(230,43,30,0.12)',
  white:   '#ffffff',
  bg:      '#0a0a0a',
  surface: 'rgba(255,255,255,0.04)',
  border:  'rgba(255,255,255,0.08)',
  muted:   'rgba(255,255,255,0.38)',
  sub:     'rgba(255,255,255,0.65)',
  ease:    'cubic-bezier(0.4, 0, 0.2, 1)',
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  root: {
    fontFamily: T.font,
    background: T.bg,
    borderRadius: 20,
    overflow: 'hidden',
    border: `1px solid ${T.border}`,
  },

  // Image strip — full-width cinematic header
  imgWrap: {
    position: 'relative',
    width: '100%',
    height: 260,
    overflow: 'hidden',
  },
  img: {
    width: '100%', height: '100%',
    objectFit: 'cover', display: 'block',
    transition: `transform 0.6s ${T.ease}, opacity 0.4s ease`,
  },
  imgOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to bottom, rgba(10,10,10,0) 40%, rgba(10,10,10,0.95) 100%)',
    pointerEvents: 'none',
  },
  // Floating TED-style index badge
  badge: {
    position: 'absolute', top: 18, left: 20,
    background: T.red,
    color: T.white,
    fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
    padding: '4px 10px', borderRadius: 4,
    textTransform: 'uppercase',
  },

  // Body
  body: { padding: '22px 24px 20px' },
  heading: {
    fontSize: 22, fontWeight: 600, letterSpacing: '-0.5px',
    color: T.white, marginBottom: 8,
    transition: `opacity 0.3s ease`,
  },
  text: {
    fontSize: 14, lineHeight: 1.7,
    color: T.sub, marginBottom: 20,
    transition: `opacity 0.3s ease`,
  },

  // Tab row — pill chips
  tabRow: {
    display: 'flex', gap: 6, flexWrap: 'wrap',
    borderTop: `1px solid ${T.border}`,
    paddingTop: 16,
  },
  tab: (active) => ({
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '6px 14px',
    borderRadius: 980,
    border: `1px solid ${active ? T.red : T.border}`,
    background: active ? T.redDim : 'transparent',
    color: active ? T.red : T.muted,
    fontSize: 12.5, fontWeight: active ? 600 : 400,
    cursor: 'pointer',
    letterSpacing: '-0.1px',
    transition: `all 0.2s ${T.ease}`,
    userSelect: 'none',
  }),

  // Progress bar (auto-advance)
  progressWrap: {
    height: 2,
    background: T.border,
    overflow: 'hidden',
  },
  progressBar: (pct) => ({
    height: '100%',
    width: `${pct}%`,
    background: T.red,
    transition: 'width 0.1s linear',
  }),

  css: `
    ._tab:hover { border-color: rgba(230,43,30,0.4) !important; color: rgba(255,255,255,0.75) !important; }
    ._img:hover { transform: scale(1.04); }
  `,
};

const INTERVAL = 10000;
const TICK     = 100;

// ─── Component ────────────────────────────────────────────────────────────────
export default function AboutTabs() {
  const [active, setActive]     = useState(0);
  const [progress, setProgress] = useState(0);
  const [fading, setFading]     = useState(false);
  const elapsed = useRef(0);

  const goTo = (idx) => {
    if (idx === active) return;
    setFading(true);
    setTimeout(() => { setActive(idx); setFading(false); elapsed.current = 0; setProgress(0); }, 260);
  };

  useEffect(() => {
    const id = setInterval(() => {
      elapsed.current += TICK;
      setProgress(Math.min((elapsed.current / INTERVAL) * 100, 100));
      if (elapsed.current >= INTERVAL) {
        elapsed.current = 0;
        setActive(prev => {
          setFading(true);
          setTimeout(() => setFading(false), 260);
          return (prev + 1) % ABOUT_TABS.length;
        });
      }
    }, TICK);
    return () => clearInterval(id);
  }, []);

  const tab = ABOUT_TABS[active];

  return (
    <div style={S.root}>
      <style>{S.css}</style>

      {/* Progress bar */}
      <div style={S.progressWrap}>
        <div style={S.progressBar(progress)} />
      </div>

      {/* Cinematic image */}
      <div style={S.imgWrap}>
        <img src={tab.image} alt={tab.title} style={{ ...S.img, opacity: fading ? 0 : 1 }} className="_img" />
        <div style={S.imgOverlay} />
        <span style={S.badge}>TEDx</span>
      </div>

      {/* Text + tabs */}
      <div style={S.body}>
        <h2 style={{ ...S.heading, opacity: fading ? 0 : 1 }}>{tab.title}</h2>
        <p  style={{ ...S.text,    opacity: fading ? 0 : 1 }}>{tab.text}</p>

        <div style={S.tabRow}>
          {ABOUT_TABS.map((t, idx) => (
            <button key={idx} style={S.tab(idx === active)}
              className="_tab" onClick={() => goTo(idx)}>
              {t.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}