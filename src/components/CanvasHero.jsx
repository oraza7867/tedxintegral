'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { EVENTS_DATA } from '../data/eventsData';
import { CONTACT_PAGE_CONTENT } from '../data/contactData';
import { resolveAsset } from '../data/siteSettings';

const CanvasHero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacityHero = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const opacityContent = useTransform(scrollYProgress, [0.12, 0.32], [0, 1]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    const particles = [];

    const getDimensions = () => {
      if (!container) return { w: 0, h: 0 };
      const rect = container.getBoundingClientRect();
      return { w: rect.width || 0, h: rect.height || 0 };
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const { w, h } = getDimensions();
      if (w === 0 || h === 0) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    class Particle {
      constructor() {
        this.reset();
        const { h } = getDimensions();
        this.y = Math.random() * h;
        this.opacity = 0.5 * Math.random() + 0.3;
      }

      reset() {
        const { w } = getDimensions();
        this.x = Math.random() * (w || window.innerWidth);
        this.y = -10;
        this.speed = 0.3 * Math.random() + 0.1;
        this.size = 2 * Math.random() + 1;
        this.opacity = 0.5 * Math.random() + 0.3;
      }

      update() {
        const { h } = getDimensions();
        this.y += this.speed;
        if (this.y > h) {
          this.reset();
        }
      }

      draw() {
        ctx.fillStyle = `rgba(226, 43, 30, ${this.opacity})`;
        ctx.font = `${this.size * 4}px sans-serif`; // Scales font based on original particle size
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("IUL", this.x, this.y);
      }
    }

    resizeCanvas();
    for (let i = 0; i < (window.innerWidth < 768 ? 200 : 400); i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      const { w, h } = getDimensions();
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    let timeoutId;
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        resizeCanvas();
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const styles = {
    root: {
      position: "relative",
      width: "100%",
      minHeight: "100vh",
      backgroundColor: "rgb(0,0,0)",
      overflow: "hidden"
    },
    canvas: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 0
    },
    heroSection: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      zIndex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    heroImage: {
      width: "100%",
      height: "auto",
      display: "block",
      objectFit: "contain"
    },
    scrollSpace: {
      height: isMobile ? "100vh" : "120vh"
    },
    contentSection: {
      position: "relative",
      zIndex: 10,
      minHeight: "100vh",
      paddingTop: 64,
      paddingBottom: 64,
      paddingLeft: 24,
      paddingRight: 24
    },
    maxWrap: {
      maxWidth: 1280,
      marginLeft: "auto",
      marginRight: "auto"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: isMobile ? 32 : 64,
      alignItems: "center",
      marginBottom: 96
    },
    videoCard: {
      width: "100%",
      maxWidth: 650,
      marginLeft: "auto",
      marginRight: "auto",
      padding: 10,
      borderRadius: 22,
      border: "1px solid rgba(255,255,255,0.14)",
      backgroundColor: "rgba(10,10,10,0.85)",
      overflow: "hidden",
      boxShadow: "0px 28px 70px rgba(0,0,0,0.75), inset 0px 0px 0px 1px rgba(255,255,255,0.05)"
    },
    videoInnerFrame: {
      width: "100%",
      borderRadius: 16,
      overflow: "hidden",
      backgroundColor: "rgb(0,0,0)",
      border: "1px solid rgba(255,255,255,0.08)",
      position: "relative"
    },
    video: {
      width: "100%",
      height: "auto",
      display: "block",
      borderRadius: 0
    },
    cameraTopBar: {
      position: "absolute",
      top: 8,
      left: 10,
      right: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      pointerEvents: "none",
      zIndex: 2
    },
    cameraDot: {
      width: 8,
      height: 8,
      borderRadius: 999,
      backgroundColor: "rgb(230,43,30)",
      boxShadow: "0px 0px 18px rgba(230,43,30,0.65)"
    },
    cameraText: {
      fontSize: 12,
      letterSpacing: "2.2px",
      color: "rgba(255,255,255,0.35)",
      textTransform: "uppercase",
      fontWeight: 600
    },
    cameraTime: {
      fontSize: 12,
      letterSpacing: "1.6px",
      color: "rgba(255,255,255,0.35)",
      fontWeight: 600
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      paddingLeft: 22,
      paddingRight: 22,
      paddingTop: 12,
      paddingBottom: 12,
      borderRadius: 999,
      backgroundColor: "rgba(31,41,55,0.5)",
      marginBottom: 32,
      border: "1px solid rgba(255,255,255,0.08)"
    },
    badgeTedx: {
      color: "rgb(230,43,30)",
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: 0.2
    },
    badgeRest: {
      color: "rgb(255,255,255)",
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: 0.2
    },
    title: {
      fontSize: isMobile ? 52 : 72,
      fontWeight: 900,
      lineHeight: 1.05,
      marginBottom: 32,
      fontFamily: "Playfair Display, Nunito, serif"
    },
    titleWhite: {
      color: "rgb(255,255,255)"
    },
    titleRed: {
      color: "rgb(230,43,30)"
    },
    para: {
      fontSize: 18,
      lineHeight: 1.7,
      color: "rgb(209,213,219)",
      marginBottom: 32,
      fontFamily: "Nunito, sans-serif"
    },
    pillsRow: {
      display: "flex",
      flexWrap: "wrap",
      gap: 14,
      marginBottom: 24
    },
    pill: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      paddingLeft: 18,
      paddingRight: 18,
      paddingTop: 12,
      paddingBottom: 12,
      borderRadius: 999,
      backgroundColor: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.14)",
      boxShadow: "0px 8px 24px rgba(0,0,0,0.35)"
    },
    pillIconWrapBlue: {
      width: 30,
      height: 30,
      borderRadius: 999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(59,130,246,0.18)",
      border: "1px solid rgba(59,130,246,0.35)",
      flexShrink: 0
    },
    pillIconWrapPink: {
      width: 30,
      height: 30,
      borderRadius: 999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(236,72,153,0.18)",
      border: "1px solid rgba(236,72,153,0.35)",
      flexShrink: 0
    },
    pillText: {
      color: "rgb(255,255,255)",
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: 0.2
    },
    booking: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 12,
      paddingBottom: 12,
      borderRadius: 999,
      backgroundColor: "rgba(20,83,45,0.3)",
      border: "1px solid rgba(34,197,94,0.4)",
      marginBottom: 24,
      marginRight: 10,
      boxShadow: "0px 10px 26px rgba(0,0,0,0.35)"
    },
    bookingDot: {
      width: 8,
      height: 8,
      borderRadius: 999,
      backgroundColor: "rgb(34,197,94)",
      boxShadow: "0px 0px 14px rgba(34,197,94,0.55)"
    },
    bookingText: {
      color: "rgb(74,222,128)",
      fontSize: 14,
      fontWeight: 600
    },
    button: {
      backgroundColor: "rgb(230,43,30)",
      color: "rgb(255,255,255)",
      fontWeight: 800,
      fontSize: 16,
      paddingLeft: 34,
      paddingRight: 34,
      paddingTop: 16,
      paddingBottom: 16,
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.18)",
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: "pointer",
      boxShadow: "0px 18px 45px rgba(230,43,30,0.25), inset 0px 0px 0px 1px rgba(0,0,0,0.25)"
    },
    buttonArrow: {
      fontSize: 18,
      lineHeight: 1,
      transform: "translateY(1px)"
    },
    extraSpace: {
      height: "5vh"
    }
  };

  return (
    <div ref={containerRef} style={styles.root}>
      <canvas ref={canvasRef} style={styles.canvas} />
      
      <motion.section style={{ ...styles.heroSection, opacity: opacityHero }}>
        <img src={resolveAsset("/images/homeimg.png")} alt="Hero" style={styles.heroImage} />
      </motion.section>

      <div style={styles.scrollSpace} />

      <motion.section style={{ ...styles.contentSection, opacity: opacityContent }}>
        <div style={styles.maxWrap}>
          {/* Quote Block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.7 }}
            transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
            style={{
              width: "100%",
              maxWidth: 1100,
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 90,
              paddingLeft: 10,
              paddingRight: 10
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ fontSize: 46, lineHeight: 1, color: "rgb(230,43,30)", transform: "translateY(2px)", userSelect: "none" }}>
                “
              </div>
              <p style={{ margin: 0, fontSize: isMobile ? 16 : 20, lineHeight: 1.7, fontWeight: 400, fontStyle: "italic", color: "rgba(255,255,255,0.65)", letterSpacing: "0.3px", maxWidth: 920 }}>
                In the continuous cycle of renewal and transformation, we discover not loss, but evolution — the essence of identity transcending physical form.
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 22, gap: 20 }}>
              <span style={{ fontSize: 12, letterSpacing: "2.6px", color: "rgba(255,255,255,0.28)", textTransform: "uppercase" }}>ANCIENT PARADOX</span>
              <div style={{ flex: 1, height: 1, backgroundColor: "rgba(230,43,30,0.55)", marginLeft: 18, marginRight: 18 }} />
              <span style={{ fontSize: 12, letterSpacing: "2.6px", color: "rgba(255,255,255,0.28)", textTransform: "uppercase" }}>MODERN INSIGHT</span>
            </div>
          </motion.div>

          {/* Grid Layout (Video on Left, Info on Right) */}
          <div style={styles.grid}>
            {/* Logo Animation Video Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            >
              <div style={styles.videoCard}>
                <div style={styles.videoInnerFrame}>
                  <div style={styles.cameraTopBar}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={styles.cameraDot} />
                      <span style={styles.cameraText}>REC</span>
                    </div>
                    <span style={styles.cameraTime}>00:26</span>
                  </div>
                  <video style={styles.video} autoPlay loop muted playsInline>
                    <source src={resolveAsset("/videos/logo-animation.mp4")} type="video/mp4" />
                  </video>
                </div>
              </div>
            </motion.div>

            {/* Info and Booking Details */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.15 }}
            >
              <div style={styles.badge}>
                <span style={styles.badgeTedx}>TEDx</span>
                <span style={styles.badgeRest}> Integral</span>
              </div>
              <h1 style={styles.title}>
                <span style={styles.titleWhite}>{(EVENTS_DATA["2026"]?.themeTitle || "TESSELLATION")}</span>
              </h1>
              <p style={{ ...styles.para, color: '#e62b1e', fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>
                {EVENTS_DATA["2026"]?.themeTagline || "From Individual Ideas to Collective Impact"}
              </p>
              <p style={styles.para}>
                {EVENTS_DATA["2026"]?.description || "Tessellation explores how individual ideas, like geometric tiles, join together seamlessly to create a grand, collective impact."}
              </p>
              
              <div style={styles.pillsRow}>
                <div style={styles.pill}>
                  <div style={styles.pillIconWrapBlue}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="rgb(147,197,253)">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span style={styles.pillText}>{EVENTS_DATA["2026"]?.themeDate || "September 2026"}</span>
                </div>

                <div style={styles.pill}>
                  <div style={styles.pillIconWrapPink}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(251,113,133)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
                      <circle cx="12" cy="10" r="2.6" />
                    </svg>
                  </div>
                  <span style={styles.pillText}>{CONTACT_PAGE_CONTENT?.venue?.title || "Main Auditorium"}</span>
                </div>
              </div>

              <div style={styles.booking}>
                <div style={styles.bookingDot} />
                <span style={styles.bookingText}>Bookings Open</span>
              </div>

              <div>
                <Link href="/store" style={styles.button}>
                  Book Your Seat <span style={styles.buttonArrow}>→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      <div style={styles.extraSpace} />
    </div>
  );
};

export default CanvasHero;