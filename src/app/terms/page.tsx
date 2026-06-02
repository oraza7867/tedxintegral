import React from 'react';
import type { Metadata } from 'next';
import { TERMS_PAGE_CONTENT } from '../../data/termsData';

export const metadata: Metadata = {
  title: TERMS_PAGE_CONTENT.metaTitle,
  description: TERMS_PAGE_CONTENT.metaDescription,
};

export default function TermsPage() {
  const content = TERMS_PAGE_CONTENT;

  return (
    <div className="Terms_page__BPjHK" style={{ color: '#fff', backgroundColor: '#000', minHeight: '100vh', padding: '80px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="Terms_title__6uWSI" style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px', fontFamily: 'Playfair Display, serif' }}>Terms and Conditions</h1>
        <p className="Terms_updated__kO+go" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '32px', fontSize: '14px' }}>{content.updatedDate}</p>
        
        {/* 1. Introduction */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.introduction.heading}</h2>
          {content.introduction.paragraphs.map((para, idx) => (
            <p key={idx} style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{para}</p>
          ))}
        </section>

        {/* 2. Services */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.services.heading}</h2>
          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{content.services.paragraphs[0]}</p>
          <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            <li>{content.services.items[0]}</li>
            <li>
              Access:
              <ul style={{ paddingLeft: '20px', listStyleType: 'circle', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Inspiring, innovative, and educational talks</li>
                <li>An online collection of resources including talks, performances, news, ideas, and other information</li>
              </ul>
            </li>
          </ul>
          {content.services.paragraphs.slice(1).map((para, idx) => (
            <p key={idx} style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{para}</p>
          ))}
        </section>

        {/* 3. Content */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.content.heading}</h2>
          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{content.content.paragraphs[0]}</p>
          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{content.content.paragraphs[1]}</p>
          <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            {content.content.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          {content.content.paragraphs.slice(2).map((para, idx) => (
            <p key={idx} style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{para}</p>
          ))}
        </section>

        {/* 4. Acceptable Use */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.acceptableUse.heading}</h2>
          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{content.acceptableUse.paragraphs[0]}</p>
          <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {content.acceptableUse.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        {/* 5. Intellectual Property */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.intellectualProperty.heading}</h2>
          {content.intellectualProperty.paragraphs.slice(0, 5).map((para, idx) => (
            <p key={idx} style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{para}</p>
          ))}
          <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            {content.intellectualProperty.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{content.intellectualProperty.paragraphs[5]}</p>
        </section>

        {/* 6. Linked Websites */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.linkedWebsites.heading}</h2>
          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{content.linkedWebsites.paragraphs[0]}</p>
          <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            {content.linkedWebsites.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          {content.linkedWebsites.paragraphs.slice(1).map((para, idx) => (
            <p key={idx} style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{para}</p>
          ))}
        </section>

        {/* 7. Privacy and Security */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.privacySecurity.heading}</h2>
          {content.privacySecurity.paragraphs.map((para, idx) => (
            <p key={idx} style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{para}</p>
          ))}
        </section>

        {/* 8. Event Attendance */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.eventAttendance.heading}</h2>
          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{content.eventAttendance.paragraphs[0]}</p>
          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{content.eventAttendance.paragraphs[1]}</p>
          <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            <li>
              Physical and/or Digital Event:
              <ul style={{ paddingLeft: '20px', listStyleType: 'circle', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>You must register to become a member of the TEDx Integral community;</li>
                <li>You must have registered successfully and paid for your attendance in full;</li>
                <li>You must agree to abide by our attendee code of conduct;</li>
                <li>You must provide photo identification if required;</li>
                <li>You must consent to us or our partners taking screenshots, audio, or video of your attendance.</li>
              </ul>
            </li>
            <li>Digital Event: You must be 12 years of age or older;</li>
            <li>
              Physical Event:
              <ul style={{ paddingLeft: '20px', listStyleType: 'circle', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>You must be 18 years of age or older, or if under 18 years of age, you must be accompanied by an adult over 18 years old who has also registered to attend the Event;</li>
                <li>You must consent to us or our partners taking and sharing photographs, audio, and video recordings of you at the Event.</li>
              </ul>
            </li>
          </ul>
          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{content.eventAttendance.paragraphs[2]}</p>
        </section>

        {/* 9. Transfer or Cancellation */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.transferCancellation.heading}</h2>
          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{content.transferCancellation.paragraphs[0]}</p>
          <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            {content.transferCancellation.itemsTransfer.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{content.transferCancellation.paragraphs[1]}</p>
          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{content.transferCancellation.paragraphs[2]}</p>
          <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {content.transferCancellation.itemsCancellation.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        {/* 10. Attendee Code of Conduct */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.codeOfConduct.heading}</h2>
          {content.codeOfConduct.paragraphs.slice(0, 2).map((para, idx) => (
            <p key={idx} style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{para}</p>
          ))}
          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{content.codeOfConduct.paragraphs[2]}</p>
          <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            {content.codeOfConduct.itemsAgree.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{content.codeOfConduct.paragraphs[3]}</p>
          <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            {content.codeOfConduct.itemsNotBelong.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{content.codeOfConduct.paragraphs[4]}</p>
          <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            {content.codeOfConduct.itemsReserve.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          {content.codeOfConduct.paragraphs.slice(5).map((para, idx) => (
            <p key={idx} style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{para}</p>
          ))}
        </section>

        {/* 11. Reliance */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.reliance.heading}</h2>
          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{content.reliance.paragraphs[0]}</p>
          <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {content.reliance.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        {/* 12. Liability */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.liability.heading}</h2>
          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{content.liability.paragraphs[0]}</p>
          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{content.liability.paragraphs[1]}</p>
          <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            {content.liability.itemsAsIs.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{content.liability.paragraphs[2]}</p>
          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{content.liability.paragraphs[3]}</p>
          <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            {content.liability.itemsFailure.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{content.liability.paragraphs[4]}</p>
        </section>

        {/* 13. Maintenance */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.maintenance.heading}</h2>
          {content.maintenance.paragraphs.map((para, idx) => (
            <p key={idx} style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{para}</p>
          ))}
        </section>

        {/* 14. General Terms */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#e62b1e' }}>{content.generalTerms.heading}</h2>
          {content.generalTerms.paragraphs.map((para, idx) => (
            <p key={idx} style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{para}</p>
          ))}
        </section>
      </div>
    </div>
  );
}
