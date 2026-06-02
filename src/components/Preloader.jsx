'use client';
import React, { useEffect, useState } from 'react';

const Preloader = ({ onVideoEnd, duration = 2500 }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, duration - 600); // begin fade before callback fires

    const doneTimer = setTimeout(() => {
      if (onVideoEnd) onVideoEnd();
    }, duration);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onVideoEnd, duration]);

  return (
    <div
      id="pre-loader"
      className={`preloader${exiting ? ' preloader--exit' : ''}`}
      aria-label="Loading TEDx Integral"
      role="status"
    >
      {/* Ambient red glow */}
      <div className="preloader-glow" aria-hidden="true" />

      <div className="preloader-content">
        {/* Animated X mark — TEDx identity */}
        <div className="preloader-x" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line className="x-line x-line-1" x1="6" y1="6" x2="42" y2="42" stroke="#e62b1e" strokeWidth="5" strokeLinecap="round" />
            <line className="x-line x-line-2" x1="42" y1="6" x2="6" y2="42" stroke="#e62b1e" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Text lockup */}
        <div className="preloader-lockup">
          <span className="preloader-ted">TED</span>
          <span className="preloader-x-text">X</span>
          <span className="preloader-name">Integral</span>
        </div>

        {/* Progress bar */}
        <div className="preloader-bar-track" aria-hidden="true">
          <div className="preloader-bar-fill" />
        </div>
      </div>

      <style jsx="true">{`
        .preloader {
          position: fixed;
          inset: 0;
          background-color: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          opacity: 1;
          transition: opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .preloader--exit {
          opacity: 0;
          pointer-events: none;
        }

        /* Radial ambient glow behind the logo */
        .preloader-glow {
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(230, 43, 30, 0.12) 0%, transparent 70%);
          animation: glow-breathe 2.4s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes glow-breathe {
          0%, 100% { transform: scale(0.85); opacity: 0.6; }
          50%       { transform: scale(1.1);  opacity: 1; }
        }

        /* Main content stack */
        .preloader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          position: relative;
          z-index: 1;
        }

        /* Animated X svg */
        .preloader-x {
          width: 52px;
          height: 52px;
          animation: x-arrive 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes x-arrive {
          from { transform: scale(0.4) rotate(-20deg); opacity: 0; }
          to   { transform: scale(1)   rotate(0deg);   opacity: 1; }
        }

        .x-line {
          stroke-dasharray: 52;
          stroke-dashoffset: 52;
        }

        .x-line-1 {
          animation: draw-line 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
        }

        .x-line-2 {
          animation: draw-line 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards;
        }

        @keyframes draw-line {
          to { stroke-dashoffset: 0; }
        }

        /* Text lockup */
        .preloader-lockup {
          display: flex;
          align-items: baseline;
          gap: 2px;
          animation: lockup-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.45s both;
        }

        @keyframes lockup-rise {
          from { transform: translateY(14px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        .preloader-ted {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .preloader-x-text {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: #e62b1e;
          line-height: 1;
        }

        .preloader-name {
          font-family: 'Helvetica Neue', 'Arial', sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.45);
          letter-spacing: 0.32em;
          text-transform: uppercase;
          margin-left: 10px;
          align-self: center;
        }

        /* Progress bar */
        .preloader-bar-track {
          width: 160px;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 1px;
          overflow: hidden;
          animation: bar-appear 0.3s ease 0.6s both;
        }

        @keyframes bar-appear {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .preloader-bar-fill {
          height: 100%;
          background: #e62b1e;
          border-radius: 1px;
          animation: bar-fill ${(duration / 1000).toFixed(1)}s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both;
          transform-origin: left;
        }

        @keyframes bar-fill {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Preloader;