import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { EVENTS_LIST } from '../../data/eventsList';
import { FALLBACK_TEXTS } from '../../data/fallbackTexts';

export const metadata: Metadata = {
  title: 'Our Events | TEDx Integral',
  description: 'Explore the journey and themes of TEDx Integral events, from The Ship of Theseus to upcoming editions.',
};

export default function EventsPage() {
  const events = EVENTS_LIST && Array.isArray(EVENTS_LIST) ? EVENTS_LIST : [];
  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Upper Cover Banner Section */}
      <div className="events_upper__LIg3x" style={{ position: 'relative', width: '100%', height: 'auto', overflow: 'hidden' }}>
        <div className="events_homeimage__pfyrI" style={{ width: '100%', height: 'auto' }}>
          <img
            src="/images/eventsHome/coverImage2.png"
            alt="Events Timeline Banner"
            style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '50vh', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Main Timeline Block */}
      <div className="EventTimeline_container__TI6lX" style={{ padding: '60px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div className="EventTimeline_heading__Z31PV" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', fontFamily: 'Playfair Display, serif' }}>
            Some of our Events
          </h1>
        </div>

        {/* Responsive Layout with Pure CSS */}
        <div>
          {/* 1. Mobile View Layout (Visible on screens < 1024px) */}
          <div className="mobile-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {events.length === 0 ? (
              <div style={{ padding: '40px 24px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '16px', textAlign: 'center', width: '100%' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>{FALLBACK_TEXTS.events.heading}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{FALLBACK_TEXTS.events.subheading}</p>
              </div>
            ) : (
              events.map((event, idx) => (
                <div key={idx} className="EventTimeline_mobileRow__F3jfY" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    className="EventTimeline_yearDotMobile__aUrn4"
                    style={{
                      backgroundColor: '#e62b1e',
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      flexShrink: 0
                    }}
                  >
                    {event.year}
                  </div>
                  <div className="EventTimeline_mobileCardWrapper__b2M26" style={{ flexGrow: 1 }}>
                    <Link href={event.link.toLowerCase()} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div
                        className="EventTimeline_card__i28aQ mobile-card-hover"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <img src={event.image} alt={event.themeTitle} className="EventTimeline_cardImage__rYOqm" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                        <div className="EventTimeline_cardContent__5TaIB" style={{ padding: '20px' }}>
                          <h3 className="EventTimeline_cardTheme__sWRTq" style={{ fontSize: '20px', fontWeight: 'bold', color: '#e62b1e', marginBottom: '8px' }}>{event.themeTitle}</h3>
                          <p className="EventTimeline_cardDescription__U8Qhb" style={{ fontSize: '14px', lineHeight: '1.5', color: 'rgba(255,255,255,0.7)', margin: '0' }}>{event.themeTagline}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 2. Desktop Alternate Timeline Layout (Visible on screens >= 1024px) */}
          <div className="desktop-timeline" style={{ position: 'relative', width: '100%' }}>
            {events.length === 0 ? (
              <div style={{ padding: '40px 24px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '16px', textAlign: 'center', width: '100%' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>{FALLBACK_TEXTS.events.heading}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{FALLBACK_TEXTS.events.subheading}</p>
              </div>
            ) : (
              <>
                {/* Center Line */}
                <div
                  className="EventTimeline_centerTimeline__JUNqa"
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '4px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    zIndex: 1
                  }}
                />

                {/* Glowing dots at top and bottom */}
                <div className="EventTimeline_glowDot__nSwCO EventTimeline_glowDotTop__4JuU+" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#e62b1e', boxShadow: '0 0 10px #e62b1e', zIndex: 2 }} />
                <div className="EventTimeline_glowDot__nSwCO EventTimeline_glowDotBottom__0YaiU" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#e62b1e', boxShadow: '0 0 10px #e62b1e', zIndex: 2 }} />

                {/* Alternate timeline cards */}
                <div className="EventTimeline_contentWrapper__s0n1o" style={{ display: 'flex', flexDirection: 'column', gap: '64px', position: 'relative', zIndex: 3 }}>
                  {events.map((event, idx) => {
                    const isLeft = idx % 2 === 0;
                    const isLast = idx === events.length - 1;

                    return (
                      <div
                        key={idx}
                        className={`EventTimeline_timelineRow__kz9mZ ${isLast ? 'EventTimeline_lastItem__c0Udz' : ''}`}
                        style={{ display: 'flex', width: '100%' }}
                      >
                        {/* Left Column */}
                        <div className="EventTimeline_leftSide__KHpLM" style={{ width: '50%', paddingRight: '48px', position: 'relative', display: 'flex', justifyContent: 'flex-end' }}>
                          {isLeft && (
                            <>
                              {/* Centered Year Dot */}
                              <div
                                className="EventTimeline_yearDotWrapper__B3ukG"
                                style={{
                                  position: 'absolute',
                                  right: '-27.5px',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  width: '55px',
                                  height: '55px',
                                  zIndex: 5,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <div
                                  className="EventTimeline_yearDot__vSXuJ"
                                  style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    backgroundColor: '#e62b1e',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: '13px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '3px solid #000',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
                                  }}
                                >
                                  {event.year}
                                </div>
                              </div>

                              {/* Details Card */}
                              <Link href={event.link.toLowerCase()} style={{ textDecoration: 'none', color: 'inherit', width: '100%', maxWidth: '460px' }}>
                                <div
                                  className="EventTimeline_card__i28aQ desktop-card-hover"
                                  style={{
                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
                                  }}
                                >
                                  <img src={event.image} alt={event.themeTitle} className="EventTimeline_cardImage__rYOqm" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                                  <div className="EventTimeline_cardContent__5TaIB" style={{ padding: '24px' }}>
                                    <h3 className="EventTimeline_cardTheme__sWRTq" style={{ fontSize: '22px', fontWeight: 'bold', color: '#e62b1e', marginBottom: '8px' }}>{event.themeTitle}</h3>
                                    <p className="EventTimeline_cardDescription__U8Qhb" style={{ fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)', margin: '0' }}>{event.themeTagline}</p>
                                  </div>
                                </div>
                              </Link>
                            </>
                          )}
                        </div>

                        {/* Right Column */}
                        <div className="EventTimeline_rightSide__+6020" style={{ width: '50%', paddingLeft: '48px', position: 'relative', display: 'flex', justifyContent: 'flex-start' }}>
                          {!isLeft && (
                            <>
                              {/* Centered Year Dot */}
                              <div
                                className="EventTimeline_yearDotWrapper__B3ukG"
                                style={{
                                  position: 'absolute',
                                  left: '-27.5px',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  width: '55px',
                                  height: '55px',
                                  zIndex: 5,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <div
                                  className="EventTimeline_yearDot__vSXuJ"
                                  style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    backgroundColor: '#e62b1e',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: '13px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '3px solid #000',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
                                  }}
                                >
                                  {event.year}
                                </div>
                              </div>

                              {/* Details Card */}
                              <Link href={event.link.toLowerCase()} style={{ textDecoration: 'none', color: 'inherit', width: '100%', maxWidth: '460px' }}>
                                <div
                                  className="EventTimeline_card__i28aQ desktop-card-hover"
                                  style={{
                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
                                  }}
                                >
                                  <img src={event.image} alt={event.themeTitle} className="EventTimeline_cardImage__rYOqm" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                                  <div className="EventTimeline_cardContent__5TaIB" style={{ padding: '24px' }}>
                                    <h3 className="EventTimeline_cardTheme__sWRTq" style={{ fontSize: '22px', fontWeight: 'bold', color: '#e62b1e', marginBottom: '8px' }}>{event.themeTitle}</h3>
                                    <p className="EventTimeline_cardDescription__U8Qhb" style={{ fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)', margin: '0' }}>{event.themeTagline}</p>
                                  </div>
                                </div>
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Core Responsive Styles */}
      <style>{`
        /* Mobile-first styling */
        .desktop-timeline {
          display: none;
        }
        .mobile-timeline {
          display: flex;
        }
        .mobile-card-hover:hover {
          box-shadow: 0 10px 30px rgba(230,43,30,0.15);
        }

        /* Desktop queries for responsive timeline */
        @media (min-width: 1024px) {
          .desktop-timeline {
            display: block;
          }
          .mobile-timeline {
            display: none;
          }
          .desktop-card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 15px 35px rgba(230,43,30,0.18) !important;
          }
        }
      `}</style>
    </div>
  );
}
