'use client';

import React, { useState, useEffect } from 'react';
import { FALLBACK_TEXTS } from '../data/fallbackTexts';
import { resolveAsset } from '../data/siteSettings';


interface Speaker {
  name: string;
  about: string;
  description: string;
  youtubeLink?: string;
  image?: string;
}

interface TeamMember {
  name: string;
  about: string;
  image?: string;
}

interface Sponsor {
  id: string;
  name: string;
  logo: string;
}

interface EventDetailClientProps {
  year: string;
  themeTitle: string;
  themeTagline: string;
  themeDate: string;
  themeDescription: string;
  heroImage: string;
  speakers: Speaker[];
  team: TeamMember[];
  sponsors: Sponsor[];
  memories: string[];
}

// MemoryCarousel Component
const MemoryCarousel = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '350px', maxHeight: '550px', overflow: 'hidden', borderRadius: '16px' }}>
      {images.map((img, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            inset: 0,
            transition: 'opacity 1s ease-in-out',
            opacity: idx === current ? 1 : 0,
            zIndex: idx === current ? 2 : 0,
          }}
        >
          <img src={img} alt={`Memory ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ))}
      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((current - 1 + images.length) % images.length)}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '40px',
              height: '40px',
              borderRadius: '999px',
              backgroundColor: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ❮
          </button>
          <button
            onClick={() => setCurrent((current + 1) % images.length)}
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '40px',
              height: '40px',
              borderRadius: '999px',
              backgroundColor: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ❯
          </button>
        </>
      )}
    </div>
  );
};

export default function EventDetailClient({
  year,
  themeTitle,
  themeTagline,
  themeDate,
  themeDescription,
  heroImage,
  speakers,
  team,
  sponsors,
  memories
}: EventDetailClientProps) {
  const [activeSpeaker, setActiveSpeaker] = useState<Speaker | null>(null);
  const [hoverSpeakerId, setHoverSpeakerId] = useState<number | null>(null);

  return (
    <div className="Event_25_body__6ynI8" style={{ color: '#fff', backgroundColor: '#000', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* 1. Header Hero Banner */}
      <header style={{ padding: '80px 24px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <img src="/images/TEDx26 Logo.png" alt="TEDx Logo" style={{ width: '220px', height: 'auto' }} />
          <div className="Event_25_theme__LMXk3" style={{ marginTop: '20px' }}>
            <h1 style={{ fontSize: '18px', color: '#e62b1e', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 8px' }}>Theme {year}</h1>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', margin: '0 0 8px' }}>{themeTitle}</h2>
            {themeTagline && <p style={{ fontSize: '16px', color: '#e62b1e', fontStyle: 'italic', margin: '0 0 8px' }}>{themeTagline}</p>}
          </div>
        </div>
        <h3 style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginTop: '16px', fontWeight: 'normal' }}>{themeDate}</h3>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        {/* 2. Banner Image */}
        <div className="Event_25_banner__s9GoI" style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', marginBottom: '48px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <img
            src={heroImage || `/images/eventsHome/theme${year === "2023" ? "_23" : year.substring(2)}.png`}
            alt={themeTitle}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            onError={(e) => {
              // Fallback extension handling (.jpg vs .png vs .jpeg)
              const ext = year === "2024" ? "jpg" : year === "2022" ? "jpeg" : "png";
              const target = e.target as HTMLImageElement;
              target.src = `/images/eventsHome/theme${year === "2023" ? "_23" : year.substring(2)}.${ext}`;
            }}
          />
        </div>

        {/* 3. About Section */}
        <div className="Event_25_about__vEkpK" style={{ marginBottom: '64px', backgroundColor: 'rgba(255,255,255,0.03)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '24px', color: '#e62b1e', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>About The Theme</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'rgba(255,255,255,0.8)', margin: '0' }}>{themeDescription}</p>
        </div>

        {/* 4. Memories Slide */}
        <div className="Event_25_gallery__2omqB" style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', color: '#e62b1e', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '1px' }}>Event Memories</h2>
          <div style={{ width: '100%', height: 'auto' }}>
            {!memories || memories.length === 0 ? (
              <div style={{ position: 'relative', width: '100%', minHeight: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '16px', padding: '40px 24px', textAlign: 'center' }}>
                <img src="/images/placeholders/gallery-cover.png" alt="No memories yet" style={{ width: '200px', height: '120px', objectFit: 'cover', borderRadius: '8px', opacity: 0.4, marginBottom: '20px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>{FALLBACK_TEXTS.gallery.heading}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{FALLBACK_TEXTS.gallery.subheading}</p>
              </div>
            ) : (
              <MemoryCarousel images={memories} />
            )}
          </div>
        </div>

        {/* 5. Speakers Section */}
        <div className="Event_25_speakers__j-90y" style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', color: '#e62b1e', marginBottom: '32px', textTransform: 'uppercase', letterSpacing: '1px' }}>Featured Speakers</h2>
          {!speakers || speakers.length === 0 ? (
            <div style={{ padding: '60px 24px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '16px', textAlign: 'center' }}>
              <img src="/images/placeholders/speaker.png" alt="No speakers yet" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', opacity: 0.4, margin: '0 auto 20px', border: '3px solid rgba(255,255,255,0.1)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>{FALLBACK_TEXTS.speakers.heading}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{FALLBACK_TEXTS.speakers.subheading}</p>
            </div>
          ) : (
            <div
              className="Event_25_speakerContainer__NOQGG"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '32px',
              }}
            >
              {speakers.map((speaker, idx) => (
                <div
                  key={idx}
                  className="Event_25_speaker__aBEuG"
                  onClick={() => setActiveSpeaker(speaker)}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  }}
                  onMouseEnter={() => setHoverSpeakerId(idx)}
                  onMouseLeave={() => setHoverSpeakerId(null)}
                >
                  <div style={{ position: 'relative', width: '100%', paddingBottom: '110%', overflow: 'hidden' }}>
                    <img
                      src={speaker.image || '/images/placeholders/speaker.png'}
                      alt={speaker.name}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        transform: hoverSpeakerId === idx ? 'scale(1.05)' : 'scale(1)',
                      }}
                    />
                  </div>
                  <div style={{ padding: '16px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 6px', color: '#fff' }}>
                      {hoverSpeakerId === idx ? 'Know More' : speaker.name}
                    </h3>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: '0' }}>{speaker.about}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sponsors Section */}
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', color: '#e62b1e', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '1px' }}>Event Partners</h2>
          {!sponsors || sponsors.length === 0 ? (
            <div style={{ padding: '40px 24px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '16px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>Partnership opportunities for this event will be updated soon.</p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: '24px'
              }}
            >
              {sponsors.map((sponsor, idx) => (
                <div
                  key={sponsor.id || idx}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 6. Organizing Team Section */}
        <div className="Event_25_team__T9OaF" style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', color: '#e62b1e', marginBottom: '32px', textTransform: 'uppercase', letterSpacing: '1px' }}>Organizing Team</h2>
          {!team || team.length === 0 ? (
            <div style={{ padding: '60px 24px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '16px', textAlign: 'center' }}>
              <img src="/images/placeholders/team.png" alt="No team members yet" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', opacity: 0.4, margin: '0 auto 20px', border: '3px solid rgba(255,255,255,0.1)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>{FALLBACK_TEXTS.team.heading}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{FALLBACK_TEXTS.team.subheading}</p>
            </div>
          ) : (
            <div
              className="Event_25_teamContainer__MDXZx"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '24px',
              }}
            >
              {team.map((member, idx) => (
                <div
                  key={idx}
                  className="Event_25_member__QY9-n"
                  style={{
                    textAlign: 'center',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    padding: '24px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  <img
                    src={member.image || '/images/placeholders/team.png'}
                    alt={member.name}
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      margin: '0 auto 16px',
                      border: '2px solid rgba(255,255,255,0.1)',
                    }}
                  />
                  <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 4px', color: '#fff' }}>{member.name}</h3>
                  <h4 style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: '0', fontWeight: 'normal' }}>{member.about}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* 7. Speaker Details Popup Modal Overlay */}
      {activeSpeaker && (
        <>
          <div
            onClick={() => setActiveSpeaker(null)}
            className="Event_25_overlay__YOC3r"
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 998,
            }}
          />
          <div
            className="Event_25_popUp__mzOcJ"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '750px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#0a0a0a',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '20px',
              padding: '32px',
              zIndex: 999,
              boxShadow: '0 25px 50px rgba(0,0,0,0.9)',
            }}
          >
            {/* Modal Header */}
            <div className="Event_25_popUpHeader__2ygyB" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 className="Event_25_popUptitle__aRYL6" style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{activeSpeaker.name}</h2>
              <button
                onClick={() => setActiveSpeaker(null)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: '28px',
                  cursor: 'pointer',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                &times;
              </button>
            </div>
            
            <hr style={{ borderColor: 'rgba(255,255,255,0.08)', marginBottom: '24px' }} />
            
            {/* Modal Content Body */}
            <div className="Event_25_popUpBody__Ae7Z0" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flexShrink: 0 }}>
                <img
                  src={activeSpeaker.image || '/images/placeholders/speaker.png'}
                  alt={activeSpeaker.name}
                  style={{
                    width: '160px',
                    height: '160px',
                    borderRadius: '16px',
                    objectFit: 'cover',
                    border: '2px solid rgba(255,255,255,0.1)',
                    marginBottom: '16px',
                  }}
                />
                <h4 style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0, fontWeight: 'normal', maxWidth: '180px' }}>{activeSpeaker.about}</h4>
              </div>
              <div className="Event_25_description__wohi+" style={{ flexGrow: 1 }}>
                <p style={{ fontSize: '15px', lineHeight: '1.6', color: 'rgba(255,255,255,0.78)', margin: '0 0 24px' }}>{activeSpeaker.description}</p>
                {activeSpeaker.youtubeLink && (
                  <div className="Event_25_watchTalk__F4D2U">
                    <a
                      href={`https://www.youtube.com/watch?v=${activeSpeaker.youtubeLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 24px',
                        backgroundColor: '#e62b1e',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '999px',
                        textDecoration: 'none',
                        fontSize: '14px',
                        boxShadow: '0 10px 20px rgba(230,43,30,0.25)',
                      }}
                    >
                      Watch Talk
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
