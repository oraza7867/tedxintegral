import React from 'react';
import type { Metadata } from 'next';
import AboutTabs from '../../components/AboutTabs';
import { ABOUT_FEATURES } from '../../data/aboutTabs';
import { ORGANIZING_TEAM } from '../../data/teamData';
import { FALLBACK_TEXTS } from '../../data/fallbackTexts';

export const metadata: Metadata = {
  title: 'About Us | TEDx Integral',
  description: 'Meet the team behind TEDx Integral and learn about the world of TED, TEDx, and our independently organized event.',
};

export default function AboutPage() {
  return (
    <div style={{ color: '#fff', backgroundColor: '#000', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Tab/Slider Section */}
      <section className="Aboutsection_about__fi+pD" style={{ padding: '80px 24px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <h1 className="Aboutsection_title__rC-yt" style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'left', marginBottom: '40px', fontFamily: 'Playfair Display, serif' }}>
          What's TED ?
        </h1>

        {/* Client side interactive slider component */}
        <AboutTabs />

        {/* Core Values / Features section */}
        <div className="Aboutsection_features__EWEkK" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '48px' }}>
          {ABOUT_FEATURES.map((feat, idx) => (
            <div key={idx} className="Aboutsection_feature__hOhxo" style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
              <div className="Aboutsection_icon__SZaFL" style={{ fontSize: '36px', marginBottom: '12px' }}>{feat.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>{feat.title}</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.5', color: 'rgba(255,255,255,0.6)', margin: '0' }}>{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team grid Section */}
      <section className="team_teamsection__382j9" style={{ padding: '60px 24px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <h2 className="team_heading__gOCsE" style={{ fontSize: '32px', textAlign: 'center', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          <span className="team_heading1__ZAYPL" style={{ color: '#fff', fontWeight: 'bold' }}>Meet Our </span>
          <span className="team_heading2__cOyU-" style={{ color: '#e62b1e', fontWeight: 'bold' }}>Team</span>
        </h2>
        <p className="team_description1__f7CMv" style={{ textAlign: 'center', fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginBottom: '48px' }}>
          The people behind TEDx Integral
        </p>

        <div className="team_grid__NavAG" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '32px' }}>
          {!ORGANIZING_TEAM || !Array.isArray(ORGANIZING_TEAM) || ORGANIZING_TEAM.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '40px 24px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '16px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>{FALLBACK_TEXTS.team.heading}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{FALLBACK_TEXTS.team.subheading}</p>
            </div>
          ) : (
            ORGANIZING_TEAM.map((member) => {
              const cardContent = (
                <div className="team_card__qkLFW" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', overflow: 'hidden', padding: '16px', textAlign: 'center', transition: 'all 0.3s ease', position: 'relative' }}>
                  {member.linkedin && (
                    <div className="team_linkedinBadge__MzV9U" style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10 }}>
                      <svg 
                        className="team_linkedIcon__W5nBa" 
                        viewBox="0 0 24 24" 
                        style={{ width: '85%', height: '85%', fill: 'currentColor' }}
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </div>
                  )}
                  <img src={member.image} alt={member.name} className="team_cardImg__7E8eN" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px', border: '3px solid rgba(255,255,255,0.1)' }} />
                  <h3 className="team_cardName__kCIFD" style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 6px', color: '#fff' }}>{member.name}</h3>
                  <p className="team_cardRole__mvqIq" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', margin: '0' }}>{member.role}</p>
                </div>
              );

              if (member.linkedin) {
                return (
                  <a
                    key={member.id}
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="team_cardLink__-wGDh"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {cardContent}
                  </a>
                );
              }

              return (
                <div key={member.id} className="team_cardLink__-wGDh">
                  {cardContent}
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
