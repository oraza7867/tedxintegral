'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';

/*
  TEDx Integral — Apple-grade Preloader
  ─────────────────────────────────────
  • Canvas: depth-sorted 3-D particle starfield with
    per-particle motion streaks and a perspective warp
  • Wordmark: 86px Inter Black with gradient "x",
    sub-pixel letter-spacing, drop-shadow glow
  • Physics: easeOutExpo letter reveal, easeInOutQuart
    shimmer sweep, spring-settle on entry
  • Layers: grid texture, radial red haze, deep vignette
  • Progress: live counter with glowing bar cursor dot
  • Exit: scale-up + fade, exactly like Apple splash screens
*/

const DURATION = 3800;

export default function Preloader({ onVideoEnd, duration = DURATION }) {
  const canvasRef  = useRef(null);
  const animRef    = useRef(null);
  const startRef   = useRef(null);
  const ptsRef     = useRef([]);

  const [pct,     setPct]     = useState(0);
  const [counter, setCounter] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [reveal,  setReveal]  = useState(false);
  const [showHUD, setShowHUD] = useState(false);
  const [showTag, setShowTag] = useState(false);

  /* ── Make particles ── */
  const makePts = useCallback((W, H) => {
    ptsRef.current = Array.from({ length: 90 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      z:  Math.random() * 1400 + 100,
      vz: -(Math.random() * 1.6 + 0.5),
      red: Math.random() > 0.86,
      s:   Math.random() * 1.4 + 0.3,
      o:   Math.random() * 0.55 + 0.1,
    }));
  }, []);

  /* ── Canvas loop ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const FOV = 520;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      makePts(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(elapsed / duration, 1);

      setPct(t);
      setCounter(Math.floor(t * 100));

      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      /* Red radial haze */
      const grd = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, W * 0.48);
      grd.addColorStop(0, 'rgba(80,10,5,.16)');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      /* Grid texture */
      ctx.strokeStyle = 'rgba(255,255,255,.016)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 60) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += 60) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      /* Particles */
      ptsRef.current.forEach((p) => {
        p.z += p.vz;
        if (p.z < 5) { p.z = 1500; p.x = Math.random() * W; p.y = Math.random() * H; }
        const sc  = FOV / (FOV + p.z);
        const sx  = (p.x - W / 2) * sc + W / 2;
        const sy  = (p.y - H / 2) * sc + H / 2;
        const alpha = p.o * (1 - p.z / 1600);

        ctx.beginPath();
        ctx.arc(sx, sy, p.s * sc, 0, Math.PI * 2);
        ctx.fillStyle = p.red
          ? `rgba(230,43,30,${alpha})`
          : `rgba(255,255,255,${alpha * 0.65})`;
        ctx.fill();

        /* Streak */
        if (alpha > 0.22) {
          const bsc = FOV / (FOV + p.z + 16);
          const bx  = (p.x - W / 2) * bsc + W / 2;
          const by  = (p.y - H / 2) * bsc + H / 2;
          const g   = ctx.createLinearGradient(bx, by, sx, sy);
          g.addColorStop(0, 'transparent');
          g.addColorStop(1, p.red
            ? `rgba(230,43,30,${alpha * 0.35})`
            : `rgba(255,255,255,${alpha * 0.18})`);
          ctx.strokeStyle = g;
          ctx.lineWidth   = p.s * sc * 0.8;
          ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(sx, sy); ctx.stroke();
        }
      });

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [duration, makePts]);

  /* ── Reveal sequence ── */
  useEffect(() => {
    const t1 = setTimeout(() => setReveal(true),  80);
    const t2 = setTimeout(() => setShowHUD(true), 500);
    const t3 = setTimeout(() => setShowTag(true), 1200);
    const t4 = setTimeout(() => setExiting(true), duration - 720);
    const t5 = setTimeout(() => { if (onVideoEnd) onVideoEnd(); }, duration);
    return () => [t1,t2,t3,t4,t5].forEach(clearTimeout);
  }, [duration, onVideoEnd]);

  const spring = 'cubic-bezier(.16,1,.3,1)';

  return (
    <div
      role="status"
      aria-label="Loading TEDx Integral"
      style={{
        position:  'fixed',
        inset:      0,
        zIndex:     99999,
        background: '#000',
        overflow:  'hidden',
        opacity:    exiting ? 0 : 1,
        transform:  exiting ? 'scale(1.055)' : 'scale(1)',
        transition: exiting
          ? `opacity .72s ${spring}, transform .72s ${spring}`
          : 'none',
        pointerEvents: exiting ? 'none' : 'auto',
        fontFamily: '"Inter","Helvetica Neue",Arial,sans-serif',
      }}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}
      />

      {/* Vignette */}
      <div aria-hidden="true" style={{
        position:   'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 20%, rgba(0,0,0,.75) 100%)',
      }} />

      {/* Shimmer sweep */}
      <div aria-hidden="true" style={{
        position:   'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
      }}>
        <div style={{
          position:   'absolute', top: 0, height: '100%', width: '60%',
          background: 'linear-gradient(105deg,transparent 40%,rgba(255,255,255,.03) 50%,transparent 60%)',
          transform:  'skewX(-20deg)',
          left:       reveal ? '160%' : '-100%',
          transition: reveal ? `left 1.4s cubic-bezier(.4,0,.2,1) .4s` : 'none',
        }} />
      </div>

      {/* Top-left tag */}
      <div aria-hidden="true" style={{
        position:   'absolute', top: '28px', left: '32px',
        display:    'flex', alignItems: 'center', gap: '10px',
        opacity:    showTag ? 1 : 0,
        transform:  showTag ? 'translateX(0)' : 'translateX(-8px)',
        transition: `opacity .6s ease, transform .6s ease`,
      }}>
        <div style={{ width:'18px', height:'.5px', background:'rgba(230,43,30,.5)' }} />
        <span style={{
          fontSize:'9.5px', fontWeight:300, letterSpacing:'.42em',
          textTransform:'uppercase', color:'rgba(255,255,255,.28)',
        }}>Ideas Worth Spreading</span>
      </div>

      {/* Centre wordmark */}
      <div style={{
        position:  'absolute', top:'50%', left:'50%',
        transform: 'translate(-50%,-50%)',
        display:   'flex', flexDirection:'column', alignItems:'center', gap:0,
      }}>
        {/* TED + x */}
        <div style={{ display:'flex', alignItems:'flex-end', lineHeight:1 }}>
          <span style={{
            fontSize:'86px', fontWeight:900, letterSpacing:'-.04em',
            color:   '#fff',
            opacity:    reveal ? 1 : 0,
            transform:  reveal ? 'translateY(0) scale(1)' : 'translateY(30px) scale(.94)',
            transition: `opacity .9s ${spring}, transform .9s ${spring}`,
          }}>TED</span>
          <span style={{
            fontSize:'86px', fontWeight:900, letterSpacing:'-.04em',
            background: 'linear-gradient(135deg,#ff6b55 0%,#e62b1e 40%,#c0180e 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            filter:     'drop-shadow(0 0 28px rgba(230,43,30,.55))',
            opacity:    reveal ? 1 : 0,
            transform:  reveal ? 'translateY(0) scale(1)' : 'translateY(30px) scale(.94)',
            transition: `opacity .9s ${spring} .12s, transform .9s ${spring} .12s`,
          }}>x</span>
        </div>

        {/* University name */}
        <div style={{
          fontSize:   '11px', fontWeight:300, letterSpacing:'.45em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,.32)',
          marginTop:  '18px',
          opacity:    reveal ? 1 : 0,
          transform:  reveal ? 'translateY(0)' : 'translateY(10px)',
          transition: `opacity .8s ${spring} .55s, transform .8s ${spring} .55s`,
        }}>Integral University</div>

        {/* Hairline divider */}
        <div aria-hidden="true" style={{
          height:     '1px',
          width:      reveal ? '180px' : '0px',
          background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.1) 30%,rgba(255,255,255,.1) 70%,transparent)',
          marginTop:  '28px',
          transition: `width 1.1s ${spring} .3s`,
        }} />

        {/* Progress bar */}
        <div aria-hidden="true" style={{
          width:'180px', height:'1px',
          background: 'rgba(255,255,255,.07)',
          marginTop:  '28px',
          position:   'relative',
          overflow:   'visible',
          opacity:    showHUD ? 1 : 0,
          transition: 'opacity .4s ease',
        }}>
          <div style={{
            height:     '100%',
            width:      `${Math.round(pct * 100)}%`,
            background: 'linear-gradient(90deg,#8b0000,#e62b1e 60%,#ff6b55)',
            borderRadius: '1px',
            boxShadow:  '0 0 6px rgba(230,43,30,.8), 0 0 18px rgba(230,43,30,.3)',
            transition: 'width .06s linear',
          }} />
          {/* Glowing cursor dot */}
          <div style={{
            position: 'absolute', top:'-1.5px', right:'-2px',
            width:'4px', height:'4px', borderRadius:'50%',
            background:'#ff6b55',
            boxShadow: '0 0 8px #ff6b55, 0 0 20px rgba(255,107,85,.6)',
          }} />
        </div>

        {/* Counter */}
        <div style={{
          marginTop:  '12px',
          fontSize:   '10px', fontWeight:300, letterSpacing:'.22em',
          color:      'rgba(255,255,255,.2)',
          fontVariantNumeric: 'tabular-nums',
          opacity:    showHUD ? 1 : 0,
          transition: 'opacity .4s ease',
          fontFamily: '"SF Mono","Fira Code",Menlo,monospace',
        }}>
          {String(counter).padStart(3,'0')}
        </div>
      </div>

      {/* Inter font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;900&display=swap');`}</style>
    </div>
  );
}