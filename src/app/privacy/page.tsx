import React from 'react';
import type { Metadata } from 'next';
import { PRIVACY_PAGE_CONTENT } from '../../data/privacyData';

export const metadata: Metadata = {
  title: PRIVACY_PAGE_CONTENT.metaTitle,
  description: PRIVACY_PAGE_CONTENT.metaDescription,
};

export default function PrivacyPage() {
  const content = PRIVACY_PAGE_CONTENT;

  return (
    <div className="Privacy_page__3Kj63" style={{ color: '#fff', backgroundColor: '#000', minHeight: '100vh', padding: '80px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="Privacy_title__r8Od-" style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px', fontFamily: 'Playfair Display, serif' }}>Privacy Policy</h1>
        <p className="Privacy_updated__NHTNa" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '32px', fontSize: '14px' }}>{content.updatedDate}</p>

        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.introduction.heading}</h2>
          {content.introduction.paragraphs.map((para, idx) => (
            <p key={idx} style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{para}</p>
          ))}
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.personalInfo.heading}</h2>
          {content.personalInfo.paragraphs.map((para, idx) => (
            <p key={idx} style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{para}</p>
          ))}
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.collectionHolding.heading}</h2>
          {content.collectionHolding.paragraphs.map((para, idx) => (
            <p key={idx} style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{para}</p>
          ))}
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.purpose.heading}</h2>
          {content.purpose.paragraphs.map((para, idx) => (
            <p key={idx} style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{para}</p>
          ))}
          <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {content.purpose.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.accessCorrection.heading}</h2>
          {content.accessCorrection.paragraphs.map((para, idx) => (
            <p key={idx} style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{para}</p>
          ))}
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.overseas.heading}</h2>
          {content.overseas.paragraphs.map((para, idx) => (
            <p key={idx} style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{para}</p>
          ))}
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.policyChange.heading}</h2>
          {content.policyChange.paragraphs.map((para, idx) => (
            <p key={idx} style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{para}</p>
          ))}
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.contact.heading}</h2>
          {content.contact.paragraphs.map((para, idx) => (
            <p key={idx} style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{para}</p>
          ))}
        </section>
      </div>
    </div>
  );
}
