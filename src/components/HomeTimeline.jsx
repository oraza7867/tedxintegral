"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";

// ─── EDITABLE SCHEDULE DATA ──────────────────────────────────────────────────
export const scheduleData = [
  { time: "9:00 AM", event: "Entry + Registration", type: "anchor" },
  { time: "9:45 AM", event: "Event Starts", type: "anchor" },
  { time: "10:15 – 10:45 AM", event: "Inauguration", type: "anchor" },
  { time: "10:45 – 11:25 AM", event: "Speaker 1", type: "speaker", speakerName: "Dr. Jane Doe" },
  { time: "11:25 – 12:05 PM", event: "Speaker 2", type: "speaker", speakerName: "John Smith" },
  { time: "12:05 – 12:20 PM", event: "Performance", type: "performance", detail: "Acoustic Set" },
  { time: "12:20 – 1:00 PM", event: "Speaker 3", type: "speaker" },
  { time: "1:00 – 1:40 PM", event: "Speaker 4", type: "speaker" },
  { time: "1:40 – 2:40 PM", event: "Lunch Break", type: "break" },
  { time: "2:40 – 3:10 PM", event: "Performance", type: "performance" },
  { time: "3:10 – 3:50 PM", event: "Speaker 5", type: "speaker" },
  { time: "3:50 – 4:30 PM", event: "Speaker 6", type: "speaker" },
  { time: "4:30 – 4:45 PM", event: "Performance", type: "performance" },
  { time: "4:45 – 5:25 PM", event: "Speaker 7", type: "speaker" },
  { time: "5:25 – 6:05 PM", event: "Speaker 8", type: "speaker" },
  { time: "6:05 – 6:30 PM", event: "Performance", type: "performance" },
  { time: "6:30 – 7:00 PM", event: "Vote of Thanks", type: "anchor" },
];

// ─── APPLE-STYLE CSS ─────────────────────────────────────────────────────────
const STYLES = `
  :root {
    --accent-color: #E62B1E; /* TEDx Red */
    --accent-glow: rgba(230, 43, 30, 0.4);
    --bg-color: #000000;
    --card-bg: rgba(28, 28, 30, 0.4);
    --card-border: rgba(255, 255, 255, 0.08);
    --text-primary: #F5F5F7;
    --text-secondary: #86868B;
    --font-stack: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  .premium-tl-wrapper {
    background: var(--bg-color);
    padding: 120px 24px;
    font-family: var(--font-stack);
    color: var(--text-primary);
    min-height: 100vh;
    display: flex;
    justify-content: center;
  }

  .premium-tl-container {
    width: 100%;
    max-width: 800px;
    position: relative;
  }

  /* Header Section */
  .premium-tl-header {
    text-align: center;
    margin-bottom: 100px;
  }

  .premium-tl-eyebrow {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--text-secondary);
    margin-bottom: 16px;
    display: block;
  }

  .premium-tl-title {
    font-size: clamp(40px, 6vw, 64px);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.7) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 16px;
  }

  .premium-tl-title span {
    color: var(--accent-color);
    -webkit-text-fill-color: var(--accent-color);
  }

  .premium-tl-subtitle {
    font-size: 20px;
    font-weight: 400;
    color: var(--text-secondary);
    letter-spacing: -0.01em;
  }

  /* Timeline Track */
  .premium-tl-track-container {
    position: absolute;
    left: 160px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    transform: translateX(-50%);
  }

  .premium-tl-track-fill {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--accent-color);
    border-radius: 2px;
    transform-origin: top;
    transform: scaleY(0);
    box-shadow: 0 0 12px var(--accent-glow);
    will-change: transform;
  }

  /* Timeline Row */
  .premium-tl-row {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    position: relative;
    opacity: 0.4;
    transform: translateY(20px);
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .premium-tl-row.active {
    opacity: 1;
    transform: translateY(0);
  }

  /* Time Column */
  .premium-tl-time {
    width: 160px;
    padding-right: 40px;
    text-align: right;
    font-variant-numeric: tabular-nums;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
    letter-spacing: -0.01em;
  }

  .premium-tl-row.active .premium-tl-time {
    color: var(--text-primary);
  }

  /* Indicator Dot */
  .premium-tl-indicator-wrap {
    position: absolute;
    left: 160px;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }

  .premium-tl-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #000;
    border: 2px solid rgba(255, 255, 255, 0.2);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .premium-tl-row.active .premium-tl-indicator {
    background: var(--accent-color);
    border-color: var(--accent-color);
    box-shadow: 0 0 0 4px rgba(230, 43, 30, 0.15), 0 0 12px var(--accent-glow);
    transform: scale(1.2);
  }

  .premium-tl-row.active.type-break .premium-tl-indicator {
    background: var(--text-secondary);
    border-color: var(--text-secondary);
    box-shadow: none;
  }

  /* Glassmorphic Card */
  .premium-tl-card {
    flex: 1;
    margin-left: 40px;
    padding: 24px;
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 20px;
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    cursor: default;
    transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease;
  }

  .premium-tl-card:hover {
    background: rgba(40, 40, 42, 0.6);
    border-color: rgba(255, 255, 255, 0.15);
    transform: scale(1.02);
  }

  .premium-tl-event {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .premium-tl-detail {
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 400;
  }

  /* Status Tags */
  .premium-tag {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 4px 8px;
    border-radius: 6px;
    background: rgba(255,255,255,0.1);
  }
  
  .tag-speaker { color: #fff; background: rgba(255,255,255,0.1); }
  .tag-performance { color: var(--accent-color); background: rgba(230, 43, 30, 0.15); }
  .tag-break { color: var(--text-secondary); background: transparent; border: 1px solid rgba(255,255,255,0.1); }

  /* Mobile Adjustments */
  @media (max-width: 600px) {
    .premium-tl-track-container { left: 24px; }
    .premium-tl-indicator-wrap { left: 24px; }
    .premium-tl-time { display: none; }
    .premium-tl-card { margin-left: 24px; padding: 20px; }
    .premium-tl-mobile-time {
      display: block;
      font-size: 12px;
      color: var(--accent-color);
      font-weight: 600;
      margin-bottom: 8px;
      letter-spacing: 0.05em;
    }
  }
  
  @media (min-width: 601px) {
    .premium-tl-mobile-time { display: none; }
  }
`;

// ─── ROW COMPONENT ───────────────────────────────────────────────────────────
function TimelineRow({ item, index, speakerCount }) {
  const rowRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    // Trigger activation slightly before the element hits the middle of the screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
        } else if (entry.boundingClientRect.top > window.innerHeight * 0.6) {
          // Allow it to fade back out if scrolled up past it
          setActive(false);
        }
      },
      { rootMargin: "-10% 0px -40% 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rowRef} className={`premium-tl-row type-${item.type} ${active ? "active" : ""}`}>
      {/* Desktop Time */}
      <div className="premium-tl-time">{item.time}</div>

      {/* Track Indicator */}
      <div className="premium-tl-indicator-wrap">
        <div className="premium-tl-indicator" />
      </div>

      {/* Card Content */}
      <div className="premium-tl-card">
        {/* Mobile Time (Hidden on Desktop) */}
        <div className="premium-tl-mobile-time">{item.time}</div>
        
        <div className="premium-tl-event">
          {item.event}
          {item.type !== 'anchor' && (
             <span className={`premium-tag tag-${item.type}`}>
               {item.type === 'speaker' && speakerCount ? `Talk ${speakerCount} of 8` : item.type}
             </span>
          )}
        </div>
        
        {(item.speakerName || item.detail) && (
          <div className="premium-tl-detail">
            {item.speakerName || item.detail}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function AppleStyleTimeline({ schedule = scheduleData }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const fillRef = useRef(null);

  // Inject styles securely
  useEffect(() => {
    const styleId = "apple-premium-timeline-styles";
    if (!document.getElementById(styleId)) {
      const styleEl = document.createElement("style");
      styleEl.id = styleId;
      styleEl.textContent = STYLES;
      document.head.appendChild(styleEl);
    }
  }, []);

  // High-performance scroll tracking using requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      if (!trackRef.current || !fillRef.current) return;

      const trackRect = trackRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far the track is through the center of the viewport
      const triggerPoint = viewportHeight * 0.6; 
      const scrolledPastTop = triggerPoint - trackRect.top;
      const totalHeight = trackRect.height;
      
      let progress = scrolledPastTop / totalHeight;
      progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1

      // Use transform scaleY for 60fps GPU-accelerated animation
      fillRef.current.style.transform = `scaleY(${progress})`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollProgress(); // Initial check

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pre-calculate speaker numbering
  let speakerCounter = 0;
  const processedSchedule = schedule.map((item) => {
    const count = item.type === "speaker" ? ++speakerCounter : null;
    return { ...item, speakerCount: count };
  });

  return (
    <section className="premium-tl-wrapper">
      <div className="premium-tl-container">
        
        {/* Header */}
        <header className="premium-tl-header">
          <span className="premium-tl-eyebrow">Schedule</span>
          <h2 className="premium-tl-title">
            The Day <span>Unfolds</span>
          </h2>
          <p className="premium-tl-subtitle">A full day of ideas worth spreading.</p>
        </header>

        {/* Timeline Content */}
        <div style={{ position: "relative" }} ref={containerRef}>
          {/* Vertical Track */}
          <div className="premium-tl-track-container" ref={trackRef}>
            <div className="premium-tl-track-fill" ref={fillRef} />
          </div>

          {/* Rows */}
          {processedSchedule.map((item, i) => (
            <TimelineRow key={i} item={item} index={i} speakerCount={item.speakerCount} />
          ))}
        </div>

      </div>
    </section>
  );
}