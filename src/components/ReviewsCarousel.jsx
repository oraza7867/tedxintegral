"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { FaUserCircle } from 'react-icons/fa';

import { REVIEWS_DATA as reviewsData } from '../data/reviewsData';


const ReviewsCarousel = () => {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [offsetPercentage, setOffsetPercentage] = useState(0);
  const [transitionStyle, setTransitionStyle] = useState("none");
  const [activeModalReview, setActiveModalReview] = useState(null);

  const getWrappedIndex = (i) => {
    const len = reviewsData.length;
    return (i + len) % len;
  };

  const slide = useCallback((direction) => {
    if (isTransitioning || activeModalReview) return;
    setIsTransitioning(true);

    const offset = direction === "next" ? -100 : 100;
    setTransitionStyle("transform 0.5s ease");
    setOffsetPercentage(offset);

    setTimeout(() => {
      setIndex((prevIndex) =>
        direction === "next"
          ? (prevIndex + 1) % reviewsData.length
          : (prevIndex - 1 + reviewsData.length) % reviewsData.length
      );
      setTransitionStyle("none");
      setOffsetPercentage(0);
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning, activeModalReview]);

  useEffect(() => {
    if (activeModalReview || isTransitioning) return;
    const interval = setInterval(() => {
      slide("next");
    }, 15000); // Auto-slide every 15 seconds
    return () => clearInterval(interval);
  }, [slide, activeModalReview, isTransitioning]);

  const current = reviewsData[getWrappedIndex(index)];
  const prev = reviewsData[getWrappedIndex(index - 1)];
  const next = reviewsData[getWrappedIndex(index + 1)];

  return (
    <div className="reviews_testimonialsection__Zpje3">
      <div className="reviews_headercontent__+5lYQ">
        <h1>Enjoyed by Many</h1>
        <p>Real Stories, Real Bites, Real Love - Hear from Those Who've Tasted the Difference</p>
      </div>

      <div className="reviews_carouselcontainer__gGrcY">
        <button
          className="reviews_navbtn__rbQxQ reviews_prevbtn__Zjkl7"
          onClick={() => slide("prev")}
        >
          ↩
        </button>

        {/* Previous Review Card */}
        <div
          className="reviews_glasscard__bFv+3 reviews_sidecard__enlaq reviews_leftcard__Y1nJ8"
          onClick={() => setActiveModalReview(prev)}
          style={{
            transition: transitionStyle,
            transform: `translateX(${offsetPercentage}%) translateY(-50%)`
          }}
        >
          <div className="reviews_textinfoside__xCHsw">
            <h3>{prev.name}</h3>
            <span>{prev.Profession}</span>
          </div>
          <div className="reviews_contentcut__nsFgI">
            <p>{prev.text.substring(0, 40)}...</p>
          </div>
        </div>

        {/* Current Review Card */}
        <div
          className="reviews_glasscard__bFv+3 reviews_maincard__vCre2"
          onClick={() => setActiveModalReview(current)}
          style={{
            transition: transitionStyle,
            transform: `translateX(${offsetPercentage}%) scale(1.05)`
          }}
        >
          <div className="reviews_profileheader__o-lfz">
            <div className="reviews_textinfo__QnJ3E">
              <h3>{current.name}</h3>
              <span>{current.Profession}</span>
            </div>
            <FaUserCircle style={{ width: '40px', height: '40px', color: 'rgba(255,255,255,0.4)' }} />
          </div>
          <div className="reviews_reviewtext__-SJKI">
            <p>{current.text}</p>
          </div>
        </div>

        {/* Next Review Card */}
        <div
          className="reviews_glasscard__bFv+3 reviews_sidecard__enlaq reviews_rightcard__dVGMD"
          onClick={() => setActiveModalReview(next)}
          style={{
            transition: transitionStyle,
            transform: `translateX(${offsetPercentage}%) translateY(-50%)`
          }}
        >
          <div className="reviews_textinfoside__xCHsw">
            <h3>{next.name}</h3>
            <span>{next.Profession}</span>
          </div>
          <div className="reviews_contentcut__nsFgI">
            <p>{next.text.substring(0, 40)}...</p>
          </div>
        </div>

        <button
          className="reviews_navbtn__rbQxQ reviews_nextbtn__HdUtl"
          onClick={() => slide("next")}
        >
          ↪
        </button>
      </div>

      {/* Review Details Modal Popup (Clean custom UI overlay) */}
      {activeModalReview && (
        <div className="reviews_popupoverlay__5MjSg" onClick={() => setActiveModalReview(null)}>
          <div className="reviews_popupbox__7nni6" onClick={(e) => e.stopPropagation()}>
            <button className="reviews_closeBtn__dei1S" onClick={() => setActiveModalReview(null)}>×</button>
            <h3 className="reviews_popupname__oHJMH">{activeModalReview.name}</h3>
            <span className="reviews_popuppro__+7sEq">{activeModalReview.Profession}</span>
            <div style={{ marginTop: '16px', color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: '1.6' }}>
              <strong>{activeModalReview.Headline}</strong>
            </div>
            <p className="reviews_popuptext__8XbNa" style={{ marginTop: '12px' }}>{activeModalReview.text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsCarousel;
