"use client";

import React, { useEffect, useRef, useState } from 'react';

import { SPEAKERS_DATA as speakersData } from '../data/speakersData';


const SpeakerCylinder = () => {
  const containerRef = useRef(null);
  const cylinderRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const visible = true;

  const numSpeakers = speakersData.length;
  const angleStep = 360 / numSpeakers;
  const radius = (270 * numSpeakers) / (2 * Math.PI); // Radius of the 3D cylinder based on width of cards

  const dragData = useRef({
    rotationY: 0,
    velocity: 0,
    isDragging: false,
    startX: 0,
    lastFrontIndex: -1
  });

  useEffect(() => {
    // Set 3D transform properties on cards
    if (cardsRef.current.length > 0) {
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const transformStr = `rotateY(${idx * angleStep}deg) translateZ(${radius}px)`;
        card.style.setProperty('--base', transformStr);
        card.style.transform = transformStr;
      });
    }

    let animationFrameId;

    const updatePhysics = () => {
      const state = dragData.current;
      state.velocity *= 0.95; // Friction
      state.rotationY += state.velocity;

      if (cylinderRef.current) {
        cylinderRef.current.style.transform = `translate3d(0, 0, 0) rotateY(${state.rotationY}deg)`;
      }

      // Calculate which card is currently in the front (facing the screen)
      const wrappedRotation = (-state.rotationY % 360 + 360) % 360;
      const frontIndex = (Math.round(wrappedRotation / angleStep) % numSpeakers + numSpeakers) % numSpeakers;

      if (frontIndex !== state.lastFrontIndex) {
        state.lastFrontIndex = frontIndex;
        cardsRef.current.forEach((card, idx) => {
          if (card) {
            if (idx === frontIndex) {
              card.classList.add('front');
            } else {
              card.classList.remove('front');
            }
          }
        });
        setActiveIndex(frontIndex);
      }

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);

    const container = containerRef.current;

    const handlePointerDown = (e) => {
      dragData.current.isDragging = true;
      dragData.current.startX = e.clientX;
      if (container) {
        container.setPointerCapture(e.pointerId);
      }
    };

    const handlePointerMove = (e) => {
      if (!dragData.current.isDragging) return;
      const deltaX = e.clientX - dragData.current.startX;
      dragData.current.startX = e.clientX;
      dragData.current.rotationY += deltaX * 0.25;
      dragData.current.velocity = deltaX * 0.15;
    };

    const handlePointerUp = () => {
      dragData.current.isDragging = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      dragData.current.rotationY -= delta * 0.25;
      dragData.current.velocity = -delta * 0.15;
    };

    if (container) {
      container.addEventListener('pointerdown', handlePointerDown);
      container.addEventListener('pointermove', handlePointerMove);
      container.addEventListener('pointerup', handlePointerUp);
      container.addEventListener('pointercancel', handlePointerUp);
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener('pointerdown', handlePointerDown);
        container.removeEventListener('pointermove', handlePointerMove);
        container.removeEventListener('pointerup', handlePointerUp);
        container.removeEventListener('pointercancel', handlePointerUp);
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [angleStep, numSpeakers, radius]);

  const handleCardClick = (idx, e) => {
    e.stopPropagation();
    const targetRotation = -idx * angleStep;
    const currentRotation = dragData.current.rotationY;
    let startTime = null;

    const animateClick = (time) => {
      if (startTime === null) {
        startTime = time;
      }
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / 550, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic Ease Out
      dragData.current.rotationY = currentRotation + (targetRotation - currentRotation) * easeProgress;
      if (progress < 1) {
        requestAnimationFrame(animateClick);
      }
    };

    requestAnimationFrame(animateClick);
  };

  const activeSpeaker = speakersData[activeIndex];

  return (
    <div className="speakers-section-container">
      <div className="speakers-header">
        <h1 className="section-title">
          OUR <span className="highlight">SPEAKERS</span>
        </h1>
        <div className="section-subtitle">Ideas That Deserve The Spotlight</div>
      </div>
      <div className="cylinder-layout">
        <div className="cylinder-left" ref={containerRef}>
          <div className="cylinder-stage">
            <div className="cylinder-viewport">
              <div className="cylinder-obj" ref={cylinderRef}>
                {speakersData.map((speaker, idx) => (
                  <div
                    key={idx}
                    className="cyl-card"
                    ref={(el) => (cardsRef.current[idx] = el)}
                    onClick={(e) => handleCardClick(idx, e)}
                  >
                    <div
                      className="cyl-photo"
                      style={{
                        backgroundImage: `url(${speaker.img})`,
                      }}
                    />
                    <div className="cyl-meta">
                      <div className="cyl-name">{speaker.name}</div>
                      <div className="cyl-title">{speaker.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="cyl-hint">Scroll or drag to rotate</div>
          </div>
        </div>
        <div className="cylinder-right">
          <aside className={`info-panel ${visible ? '' : 'hidden'}`}>
            {activeSpeaker && (
              <>
                <div className="info-header-container">
                  <div className="info-text-group">
                    <div className="info-badge">Speaker</div>
                    <h2 className="info-name-large">{activeSpeaker.name}</h2>
                    <div className="info-title-large">{activeSpeaker.title}</div>
                  </div>
                  <div
                    className="info-photo-right"
                    style={{
                      backgroundImage: `url(${activeSpeaker.img})`,
                    }}
                  />
                </div>
                <div className="info-divider" />
                <div className="info-body">{activeSpeaker.bio}</div>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SpeakerCylinder;