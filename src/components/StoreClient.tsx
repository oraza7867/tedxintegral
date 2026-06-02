'use client';

import React, { useState, useEffect } from 'react';

// ─────────────────────────────────────────────────────────────
// EVENT CONFIG — edit here
// ─────────────────────────────────────────────────────────────
const EVENT = {
  edition:   'I',
  org:       'TEDxIntegral',
  year:      '2026',
  theme:     'Tessellation',
  themeLine: 'From Individual Ideas to Collective Impact',
  about:     '',
  tags:      ['Identity', 'Connection', 'Synergy', 'Impact'],
  venue:     'X',
  date:      '2026',
  time:      'X am',
  city:      'Lucknow',
  legal:     'This independent TEDx event is operated under license from TED.',
};

// ─────────────────────────────────────────────────────────────
// PASSES CONFIG — edit here
// ─────────────────────────────────────────────────────────────
const PASSES = {
  general: {
    key:        'general',
    tier:       'I',
    label:      'General',
    name:       'General Pass',
    price:      9,
    originalPrice: null,
    code:       'GEN-2026',
    eligibility:'Open to all',
    features:   ['Main Hall Sessions', 'Speaker Networking', 'Attendees Kit', 'Early Check-in'],
    note:       'No pre-registration required.',
    link:       '#',
  },
  early: {
    key:        'early',
    tier:       'II',
    label:      'Early Bird',
    name:       'Early Bird Pass',
    price:      6,
    originalPrice: 9,
    code:       'EARLY-2026',
    eligibility:'Pre-registered only',
    features:   ['Main Hall Sessions', 'Speaker Networking', 'Attendees Kit', 'Early Check-in', 'Priority Seating'],
    note:       'Limited availability. Pre-register to unlock.',
    link:       '#',
  },
};

// ─────────────────────────────────────────────────────────────
// COMPARISON ROWS — edit here
// ─────────────────────────────────────────────────────────────
const CMP_ROWS = [
  { label: 'Price',               gen: '₹999',      early: '₹699', highlight: true },
  { label: 'Main Hall Sessions',  gen: true,         early: true },
  { label: 'Speaker Networking',  gen: true,         early: true },
  { label: 'Attendees Kit',       gen: true,         early: true },
  { label: 'Early Check-in',      gen: true,         early: true },
  { label: 'Priority Seating',    gen: false,        early: true },
  { label: 'Eligibility',         gen: 'Open',       early: 'Pre-register' },
];

// ─────────────────────────────────────────────────────────────
// BARCODE GENERATOR
// ─────────────────────────────────────────────────────────────
function barHeights(code, n = 52) {
  let s = 0;
  for (let i = 0; i < code.length; i++) s = (31 * s + code.charCodeAt(i)) >>> 0;
  s = s || 99991;
  return Array.from({ length: n }, () => {
    s = (1103515245 * s + 12345) % 2147483648;
    return 30 + (s % 70);
  });
}

// ─────────────────────────────────────────────────────────────
// GLOBAL STYLES (injected once)
// ─────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

  .tedx-root *{box-sizing:border-box;margin:0;padding:0}
  .tedx-root{
    --red:#D62B20;
    --ink:#0D0D0D;
    --paper:#F4F0E8;
    --rule:rgba(13,13,13,0.12);
    --muted:rgba(13,13,13,0.45);
    background:var(--ink);
    color:var(--paper);
    font-family:'DM Sans',sans-serif;
    min-height:100vh;
    -webkit-font-smoothing:antialiased;
  }

  /* MASTHEAD */
  .tedx-masthead{
    border-bottom:1px solid rgba(244,240,232,0.12);
    padding:18px 48px;
    display:flex;align-items:center;justify-content:space-between;
    gap:16px;flex-wrap:wrap;
  }
  .tedx-masthead-brand{
    font-family:'Bebas Neue',sans-serif;
    font-size:28px;letter-spacing:0.04em;
    display:flex;align-items:center;gap:14px;
  }
  .tedx-masthead-red{color:var(--red)}
  .tedx-masthead-divider{
    width:1px;height:22px;background:rgba(244,240,232,0.2);
  }
  .tedx-masthead-meta{
    font-size:11px;letter-spacing:0.12em;text-transform:uppercase;
    color:rgba(244,240,232,0.4);font-family:'DM Mono',monospace;
  }
  .tedx-masthead-right{
    display:flex;align-items:center;gap:8px;
  }
  .tedx-live-pip{
    display:flex;align-items:center;gap:6px;
    padding:5px 12px;border:1px solid rgba(214,43,32,0.35);
    border-radius:2px;
    font-size:11px;letter-spacing:0.1em;text-transform:uppercase;
    color:var(--red);font-family:'DM Mono',monospace;
  }
  .tedx-live-dot{
    width:5px;height:5px;border-radius:50%;background:var(--red);
    animation:tedx-blink 1.4s infinite;
  }
  @keyframes tedx-blink{0%,100%{opacity:1}50%{opacity:0.3}}

  /* HERO GRID */
  .tedx-hero{
    display:grid;
    grid-template-columns:1fr 360px;
    gap:0;
    border-bottom:1px solid rgba(244,240,232,0.1);
    min-height:72vh;
  }
  @media(max-width:820px){
    .tedx-hero{grid-template-columns:1fr}
    .tedx-hero-right{border-left:none!important;border-top:1px solid rgba(244,240,232,0.1)}
  }

  /* LEFT */
  .tedx-hero-left{
    padding:56px 48px 56px;
    border-right:1px solid rgba(244,240,232,0.1);
    display:flex;flex-direction:column;justify-content:space-between;
    position:relative;overflow:hidden;
  }
  .tedx-hero-eyebrow{
    display:flex;align-items:center;gap:12px;margin-bottom:40px;
  }
  .tedx-eyebrow-text{
    font-size:11px;letter-spacing:0.14em;text-transform:uppercase;
    color:rgba(244,240,232,0.35);font-family:'DM Mono',monospace;
  }
  .tedx-eyebrow-line{width:40px;height:1px;background:var(--red)}

  .tedx-edition{
    font-family:'Bebas Neue',sans-serif;
    font-size:clamp(100px,14vw,180px);
    line-height:0.85;letter-spacing:-0.01em;
    color:rgba(244,240,232,0.06);
    position:absolute;top:-10px;right:-10px;
    pointer-events:none;user-select:none;
  }

  .tedx-theme{
    font-family:'Bebas Neue',sans-serif;
    font-size:clamp(54px,7vw,96px);
    line-height:0.92;letter-spacing:-0.01em;
    color:var(--paper);
    margin-bottom:24px;
    position:relative;z-index:1;
  }
  .tedx-theme em{color:var(--red);font-style:normal}

  .tedx-tagline{
    font-size:16px;line-height:1.65;font-weight:300;
    color:rgba(244,240,232,0.5);
    max-width:480px;margin-bottom:40px;
    font-style:italic;
    border-left:2px solid var(--red);
    padding-left:16px;
  }

  .tedx-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:36px}
  .tedx-tag{
    padding:4px 12px;border:1px solid rgba(244,240,232,0.15);
    font-size:11px;letter-spacing:0.08em;text-transform:uppercase;
    color:rgba(244,240,232,0.45);font-family:'DM Mono',monospace;
    border-radius:1px;
  }

  .tedx-hero-bottom{display:flex;align-items:center;gap:16px;flex-wrap:wrap}

  .tedx-cmp-btn{
    padding:10px 20px;border:1px solid rgba(244,240,232,0.2);
    background:transparent;color:rgba(244,240,232,0.6);
    font-size:12px;letter-spacing:0.08em;text-transform:uppercase;
    font-family:'DM Mono',monospace;cursor:pointer;
    border-radius:1px;transition:all 0.2s;
  }
  .tedx-cmp-btn:hover{border-color:rgba(244,240,232,0.5);color:var(--paper)}

  /* RIGHT */
  .tedx-hero-right{
    border-left:1px solid rgba(244,240,232,0.1);
    display:flex;flex-direction:column;
  }
  .tedx-info-block{
    padding:32px 36px;
    border-bottom:1px solid rgba(244,240,232,0.1);
  }
  .tedx-info-label{
    font-size:10px;letter-spacing:0.16em;text-transform:uppercase;
    color:rgba(244,240,232,0.25);font-family:'DM Mono',monospace;
    margin-bottom:8px;
  }
  .tedx-info-value{
    font-size:15px;font-weight:500;color:var(--paper);
    letter-spacing:-0.01em;
  }
  .tedx-info-value-large{
    font-family:'Bebas Neue',sans-serif;
    font-size:38px;letter-spacing:0.02em;line-height:1;
    color:var(--paper);
  }
  .tedx-info-value-large span{color:var(--red)}

  .tedx-about-block{
    padding:32px 36px;
    flex:1;display:flex;flex-direction:column;justify-content:flex-end;
  }
  .tedx-about-text{
    font-size:13px;line-height:1.7;color:rgba(244,240,232,0.4);font-weight:300;
  }

  /* COMPARISON */
  .tedx-cmp-section{
    border-bottom:1px solid rgba(244,240,232,0.1);
    animation:tedx-reveal 0.3s ease;
  }
  @keyframes tedx-reveal{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}

  .tedx-cmp-inner{max-width:900px;margin:0 auto;padding:48px 48px}
  .tedx-cmp-hd{
    display:flex;align-items:baseline;gap:16px;margin-bottom:32px;
  }
  .tedx-cmp-title{
    font-family:'Bebas Neue',sans-serif;
    font-size:36px;letter-spacing:0.03em;color:var(--paper);
  }
  .tedx-cmp-sub{
    font-size:12px;color:rgba(244,240,232,0.3);
    font-family:'DM Mono',monospace;letter-spacing:0.06em;
  }

  .tedx-cmp-table{width:100%;border-collapse:collapse}
  .tedx-cmp-thead th{
    padding:10px 16px;text-align:left;
    font-size:10px;letter-spacing:0.14em;text-transform:uppercase;
    color:rgba(244,240,232,0.3);font-family:'DM Mono',monospace;font-weight:400;
    border-bottom:1px solid rgba(244,240,232,0.1);
  }
  .tedx-cmp-thead th:not(:first-child){text-align:center}
  .tedx-cmp-tr td{
    padding:12px 16px;
    border-bottom:1px solid rgba(244,240,232,0.06);
    font-size:13px;color:rgba(244,240,232,0.55);
  }
  .tedx-cmp-tr td:not(:first-child){text-align:center;color:var(--paper)}
  .tedx-cmp-tr td.hl{color:var(--red);font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:0.04em}
  .tedx-tick{color:var(--red);font-size:14px}
  .tedx-cross{color:rgba(244,240,232,0.18);font-size:14px}

  /* TICKET SECTION */
  .tedx-ticket-section{padding:80px 48px 140px;max-width:1000px;margin:0 auto}
  .tedx-section-hd{margin-bottom:64px}
  .tedx-section-rule{
    display:flex;align-items:center;gap:16px;margin-bottom:24px;
  }
  .tedx-section-rule-line{flex:1;height:1px;background:rgba(244,240,232,0.1)}
  .tedx-section-rule-label{
    font-size:10px;letter-spacing:0.18em;text-transform:uppercase;
    color:rgba(244,240,232,0.25);font-family:'DM Mono',monospace;
    white-space:nowrap;
  }
  .tedx-section-title{
    font-family:'Bebas Neue',sans-serif;
    font-size:clamp(42px,5vw,68px);
    letter-spacing:0.01em;line-height:0.95;
    color:var(--paper);
  }

  /* TICKET GRID */
  .tedx-ticket-grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(320px,1fr));
    gap:1px;
    background:rgba(244,240,232,0.08);
    border:1px solid rgba(244,240,232,0.08);
    border-radius:2px;
  }

  /* TICKET CARD */
  .tedx-ticket{
    background:var(--ink);
    cursor:pointer;
    position:relative;
    transition:background 0.25s;
    display:flex;flex-direction:column;
  }
  .tedx-ticket:hover{background:#111}
  .tedx-ticket.selected{background:#130000}

  .tedx-ticket-top-bar{
    height:2px;background:rgba(244,240,232,0.08);
    transition:background 0.25s;
  }
  .tedx-ticket.selected .tedx-ticket-top-bar{background:var(--red)}

  .tedx-ticket-head{padding:32px 32px 24px}
  .tedx-ticket-meta{
    display:flex;justify-content:space-between;align-items:flex-start;
    margin-bottom:24px;
  }
  .tedx-ticket-tier{
    font-family:'DM Mono',monospace;
    font-size:10px;letter-spacing:0.16em;text-transform:uppercase;
    color:rgba(244,240,232,0.25);margin-bottom:6px;
  }
  .tedx-ticket-code{
    font-family:'DM Mono',monospace;
    font-size:13px;letter-spacing:0.06em;color:rgba(244,240,232,0.7);
  }
  .tedx-ticket-badge{
    padding:4px 10px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;
    font-family:'DM Mono',monospace;border-radius:1px;
    background:rgba(244,240,232,0.07);color:rgba(244,240,232,0.4);
  }
  .tedx-ticket-badge.premium{background:rgba(214,43,32,0.15);color:var(--red)}

  .tedx-ticket-price-row{display:flex;justify-content:space-between;align-items:flex-end}
  .tedx-ticket-name{
    font-family:'Bebas Neue',sans-serif;
    font-size:36px;letter-spacing:0.03em;line-height:1;
    color:var(--paper);
  }
  .tedx-price-block{text-align:right}
  .tedx-price-strike{
    font-size:12px;color:rgba(244,240,232,0.25);
    text-decoration:line-through;font-family:'DM Mono',monospace;
    margin-bottom:2px;
  }
  .tedx-price{
    font-family:'Bebas Neue',sans-serif;
    font-size:44px;letter-spacing:0.02em;line-height:1;
    color:var(--paper);
  }
  .tedx-price.discount{color:var(--red)}
  .tedx-savings{
    font-size:11px;color:var(--red);
    font-family:'DM Mono',monospace;letter-spacing:0.06em;
    margin-top:4px;
  }

  /* tear line */
  .tedx-tear{
    display:flex;align-items:center;margin:0 -1px;
    position:relative;
  }
  .tedx-tear-circle{
    width:14px;height:14px;border-radius:50%;
    background:var(--ink);
    border:1px solid rgba(244,240,232,0.08);
    flex-shrink:0;position:relative;z-index:1;
  }
  .tedx-ticket.selected .tedx-tear-circle{background:#130000}
  .tedx-tear-line{
    flex:1;border-top:1px dashed rgba(244,240,232,0.1);
  }

  /* body */
  .tedx-ticket-body{padding:24px 32px}
  .tedx-feat-label{
    font-size:10px;letter-spacing:0.14em;text-transform:uppercase;
    color:rgba(244,240,232,0.2);font-family:'DM Mono',monospace;
    margin-bottom:14px;
  }
  .tedx-feat-list{display:flex;flex-direction:column;gap:9px;margin-bottom:20px}
  .tedx-feat-item{display:flex;align-items:center;gap:10px}
  .tedx-feat-dot{
    width:4px;height:4px;border-radius:50%;
    background:var(--red);flex-shrink:0;
  }
  .tedx-feat-text{font-size:13px;color:rgba(244,240,232,0.55);line-height:1}

  .tedx-note{
    padding:10px 14px;border-left:2px solid rgba(244,240,232,0.1);
    margin-bottom:20px;
    transition:border-color 0.25s;
  }
  .tedx-ticket.selected .tedx-note{border-left-color:var(--red)}
  .tedx-note-label{
    font-size:10px;font-weight:500;text-transform:uppercase;
    letter-spacing:0.1em;color:rgba(244,240,232,0.4);margin-bottom:3px;
    font-family:'DM Mono',monospace;
  }
  .tedx-note-text{font-size:12px;color:rgba(244,240,232,0.3);line-height:1.5}

  .tedx-select-btn{
    width:100%;padding:14px;border:1px solid rgba(244,240,232,0.12);
    background:transparent;color:rgba(244,240,232,0.45);
    font-size:11px;letter-spacing:0.12em;text-transform:uppercase;
    font-family:'DM Mono',monospace;cursor:pointer;border-radius:1px;
    transition:all 0.2s;
  }
  .tedx-select-btn:hover{border-color:rgba(244,240,232,0.3);color:var(--paper)}
  .tedx-select-btn.selected{
    background:var(--red);border-color:var(--red);
    color:#fff;
  }

  /* barcode */
  .tedx-barcode{
    padding:16px 32px 24px;
    border-top:1px dashed rgba(244,240,232,0.08);
    display:flex;flex-direction:column;align-items:center;gap:6px;
  }
  .tedx-bars{display:flex;align-items:flex-end;gap:1.5px;height:32px}
  .tedx-bar{
    width:1.5px;background:rgba(244,240,232,0.25);
    border-radius:0.5px;flex-shrink:0;
  }
  .tedx-barcode-text{
    font-family:'DM Mono',monospace;
    font-size:8px;letter-spacing:0.22em;
    color:rgba(244,240,232,0.15);
  }

  /* CHECKOUT */
  .tedx-checkout{
    position:fixed;bottom:0;left:0;right:0;z-index:200;
    animation:tedx-checkout-in 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  @keyframes tedx-checkout-in{
    from{transform:translateY(100%);opacity:0}
    to{transform:translateY(0);opacity:1}
  }
  .tedx-checkout-inner{
    border-top:1px solid rgba(244,240,232,0.1);
    background:rgba(10,10,10,0.97);
    backdrop-filter:blur(20px);
    padding:18px 48px;
    display:flex;align-items:center;justify-content:space-between;gap:16px;
    flex-wrap:wrap;
  }
  .tedx-checkout-left{display:flex;align-items:center;gap:24px}
  .tedx-checkout-label{
    font-size:10px;letter-spacing:0.14em;text-transform:uppercase;
    color:rgba(244,240,232,0.25);font-family:'DM Mono',monospace;margin-bottom:4px;
  }
  .tedx-checkout-name{font-size:15px;font-weight:500;color:var(--paper);letter-spacing:-0.01em}
  .tedx-checkout-divider{width:1px;height:32px;background:rgba(244,240,232,0.1)}
  .tedx-checkout-price{
    font-family:'Bebas Neue',sans-serif;
    font-size:32px;letter-spacing:0.03em;color:var(--red);
  }
  .tedx-proceed-btn{
    padding:13px 32px;background:var(--red);border:none;
    color:#fff;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;
    font-family:'DM Mono',monospace;cursor:pointer;
    border-radius:1px;transition:opacity 0.15s;flex-shrink:0;
  }
  .tedx-proceed-btn:hover{opacity:0.85}
  .tedx-checkout-legal{
    font-size:10px;color:rgba(244,240,232,0.15);
    font-family:'DM Mono',monospace;letter-spacing:0.05em;
    text-align:center;padding:8px 48px 12px;
  }
`;

// ─────────────────────────────────────────────────────────────
// STYLE INJECTOR
// ─────────────────────────────────────────────────────────────
function StyleInjector() {
  useEffect(() => {
    const id = 'tedx-brutalist-styles';
    if (!document.getElementById(id)) {
      const el = document.createElement('style');
      el.id = id;
      el.textContent = CSS;
      document.head.appendChild(el);
    }
  }, []);
  return null;
}

// ─────────────────────────────────────────────────────────────
// MASTHEAD
// ─────────────────────────────────────────────────────────────
function Masthead() {
  return (
    <header className="tedx-masthead">
      <div className="tedx-masthead-brand">
        <span className="tedx-masthead-red">TED</span>x
        <span>{EVENT.org.replace('TEDx','')}</span>
        <div className="tedx-masthead-divider" />
        <span className="tedx-masthead-meta">{EVENT.city} · {EVENT.year}</span>
      </div>
      <div className="tedx-masthead-right">
        <div className="tedx-live-pip">
          <span className="tedx-live-dot" />
          Live Event
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────
function Hero({ showCmp, onToggleCmp }) {
  const [title, accent] = EVENT.theme.split(' of ');
  return (
    <section className="tedx-hero">
      {/* Left */}
      <div className="tedx-hero-left">
        <div style={{position:'relative',zIndex:1}}>
          <div className="tedx-hero-eyebrow">
            <div className="tedx-eyebrow-line" />
            <span className="tedx-eyebrow-text">Edition {EVENT.edition} ·</span>
          </div>

          <div className="tedx-edition" aria-hidden="true">{EVENT.edition}</div>

          <h1 className="tedx-theme">
            {title}{' '}
            <em> {accent}</em>
          </h1>

          <p className="tedx-tagline">{EVENT.themeLine}</p>

          <div className="tedx-tags">
            {EVENT.tags.map(t => <span key={t} className="tedx-tag">{t}</span>)}
          </div>
        </div>

        <div className="tedx-hero-bottom">
          <button className="tedx-cmp-btn" onClick={onToggleCmp}>
            {showCmp ? '— Hide' : '+ Compare'} passes
          </button>
          <span style={{fontSize:11,color:'rgba(244,240,232,0.2)',fontFamily:'DM Mono,monospace',letterSpacing:'0.06em'}}>
            {EVENT.about}
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="tedx-hero-right">
        <div className="tedx-info-block">
          <div className="tedx-info-label">Date</div>
          <div className="tedx-info-value-large">
            {EVENT.date.split(' ')[0]}<span> {EVENT.date.split(' ')[1]}</span>
          </div>
          <div style={{fontSize:12,color:'rgba(244,240,232,0.3)',fontFamily:'DM Mono,monospace',marginTop:4,letterSpacing:'0.06em'}}>
            {EVENT.year}
          </div>
        </div>
        <div className="tedx-info-block">
          <div className="tedx-info-label">Time</div>
          <div className="tedx-info-value">{EVENT.time}</div>
        </div>
        <div className="tedx-info-block">
          <div className="tedx-info-label">Venue</div>
          <div className="tedx-info-value">{EVENT.venue}</div>
        </div>
        <div className="tedx-info-block">
          <div className="tedx-info-label">Location</div>
          <div className="tedx-info-value">{EVENT.city}</div>
        </div>
        <div className="tedx-about-block">
          <p className="tedx-about-text">{EVENT.about}</p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPARISON TABLE
// ─────────────────────────────────────────────────────────────
function ComparisonTable() {
  const cell = (val) => {
    if (val === true)  return <span className="tedx-tick">✕</span>; // repurposed as check mark
    if (val === false) return <span className="tedx-cross">—</span>;
    return val;
  };
  return (
    <div className="tedx-cmp-section">
      <div className="tedx-cmp-inner">
        <div className="tedx-cmp-hd">
          <h3 className="tedx-cmp-title">Pass Comparison</h3>
          <span className="tedx-cmp-sub">// feature breakdown</span>
        </div>
        <table className="tedx-cmp-table">
          <thead className="tedx-cmp-thead">
            <tr>
              <th style={{width:'46%'}}>Feature</th>
              <th>General</th>
              <th>Early Bird</th>
            </tr>
          </thead>
          <tbody>
            {CMP_ROWS.map((r, i) => (
              <tr key={i} className="tedx-cmp-tr">
                <td>{r.label}</td>
                <td className={r.highlight ? 'hl' : ''}>{cell(r.gen)}</td>
                <td className={r.highlight ? 'hl' : ''}>{cell(r.early)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TICKET CARD
// ─────────────────────────────────────────────────────────────
function TicketCard({ pass, isSelected, onSelect }) {
  const isPremium = pass.key === 'early';
  const heights = barHeights(pass.code);

  return (
    <div
      className={`tedx-ticket${isSelected ? ' selected' : ''}`}
      onClick={() => onSelect(pass.key)}
    >
      <div className="tedx-ticket-top-bar" />

      <div className="tedx-ticket-head">
        <div className="tedx-ticket-meta">
          <div>
            <div className="tedx-ticket-tier">Pass Tier {pass.tier}</div>
            <div className="tedx-ticket-code">{pass.code}</div>
          </div>
          <div className={`tedx-ticket-badge${isPremium ? ' premium' : ''}`}>
            {pass.label}
          </div>
        </div>

        <div className="tedx-ticket-price-row">
          <div className="tedx-ticket-name">{pass.name}</div>
          <div className="tedx-price-block">
            {pass.originalPrice && (
              <div className="tedx-price-strike">₹{pass.originalPrice}</div>
            )}
            <div className={`tedx-price${pass.originalPrice ? ' discount' : ''}`}>
              ₹{pass.price}
            </div>
            {pass.originalPrice && (
              <div className="tedx-savings">Save ₹{pass.originalPrice - pass.price}</div>
            )}
          </div>
        </div>
      </div>

      {/* Tear line */}
      <div className="tedx-tear">
        <div className="tedx-tear-circle" />
        <div className="tedx-tear-line" />
        <div className="tedx-tear-circle" />
      </div>

      <div className="tedx-ticket-body">
        <div className="tedx-feat-label">Included</div>
        <div className="tedx-feat-list">
          {pass.features.map((f, i) => (
            <div key={i} className="tedx-feat-item">
              <span className="tedx-feat-dot" />
              <span className="tedx-feat-text">{f}</span>
            </div>
          ))}
        </div>

        <div className="tedx-note">
          <div className="tedx-note-label">{pass.eligibility}</div>
          <div className="tedx-note-text">{pass.note}</div>
        </div>

        <button className={`tedx-select-btn${isSelected ? ' selected' : ''}`}>
          {isSelected ? '✓ Selected' : 'Select this pass'}
        </button>
      </div>

      <div className="tedx-barcode">
        <div className="tedx-bars">
          {heights.map((h, i) => (
            <div key={i} className="tedx-bar" style={{height:`${h}%`}} />
          ))}
        </div>
        <div className="tedx-barcode-text">{pass.code}—TEDX—{EVENT.year}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CHECKOUT BAR
// ─────────────────────────────────────────────────────────────
function CheckoutBar({ pass, onProceed }) {
  return (
    <div className="tedx-checkout">
      <div className="tedx-checkout-inner">
        <div className="tedx-checkout-left">
          <div>
            <div className="tedx-checkout-label">Selected pass</div>
            <div className="tedx-checkout-name">{pass.name}</div>
          </div>
          <div className="tedx-checkout-divider" />
          <div className="tedx-checkout-price">₹{pass.price}</div>
        </div>
        <button className="tedx-proceed-btn" onClick={onProceed}>
          Proceed to booking →
        </button>
      </div>
      <div className="tedx-checkout-legal">{EVENT.legal}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────
export default function StoreClient() {
  const [selected, setSelected]   = useState(null);
  const [showCmp, setShowCmp]     = useState(false);

  const activePass = selected ? PASSES[selected] : null;

  return (
    <div className="tedx-root">
      <StyleInjector />
      <Masthead />
      <Hero showCmp={showCmp} onToggleCmp={() => setShowCmp(v => !v)} />
      {showCmp && <ComparisonTable />}

      <section className="tedx-ticket-section">
        <div className="tedx-section-hd">
          <div className="tedx-section-rule">
            <div className="tedx-section-rule-line" />
            <span className="tedx-section-rule-label">Select your pass</span>
            <div className="tedx-section-rule-line" />
          </div>
          <h2 className="tedx-section-title">Choose<br />Your Seat.</h2>
        </div>

        <div className="tedx-ticket-grid">
          {Object.values(PASSES).map(p => (
            <TicketCard
              key={p.key}
              pass={p}
              isSelected={selected === p.key}
              onSelect={setSelected}
            />
          ))}
        </div>
      </section>

      {activePass && (
        <CheckoutBar
          pass={activePass}
          onProceed={() => window.open(activePass.link, '_blank')}
        />
      )}
    </div>
  );
}