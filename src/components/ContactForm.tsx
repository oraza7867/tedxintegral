'use client';

import React, { useState } from 'react';
import { submitContactForm } from '../utils/contactApi';
import { CONTACT_PAGE_CONTENT } from '../data/contactData';

// ─── Design Tokens ────────────────────────────────────────────────────────────
const tokens = {
  font: {
    display: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
    body:    "'SF Pro Text',    -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
  },
  color: {
    bg:          '#f5f5f7',
    surface:     '#ffffff',
    surfaceAlt:  '#fafafa',
    border:      'rgba(0,0,0,0.08)',
    borderFocus: 'rgba(0,0,0,0.3)',
    accent:      '#0071e3',
    accentHover: '#0077ed',
    text:        '#1d1d1f',
    textSub:     '#6e6e73',
    textPlaceholder: '#aeaeb2',
    success:     '#28a745',
    successBg:   'rgba(40,167,69,0.06)',
    error:       '#d70015',
    errorBg:     'rgba(215,0,21,0.06)',
  },
  radius: { card: '20px', input: '10px', btn: '980px' },
  shadow: {
    card:  '0 2px 40px rgba(0,0,0,0.07)',
    input: 'none',
    inputFocus: '0 0 0 3px rgba(0,113,227,0.18)',
  },
  transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  wrap: {
    display: 'flex',
    alignItems: 'stretch',
    background: tokens.color.bg,
    borderRadius: tokens.radius.card,
    boxShadow: tokens.shadow.card,
    overflow: 'hidden',
    maxWidth: 900,
    margin: '0 auto',
    fontFamily: tokens.font.body,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    padding: '48px 36px',
    background: tokens.color.text,
    color: '#fff',
    minWidth: 240,
    maxWidth: 280,
  },
  infoHeading: {
    fontFamily: tokens.font.display,
    fontSize: 22,
    fontWeight: 600,
    letterSpacing: '-0.4px',
    marginBottom: 12,
    color: '#f5f5f7',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontSize: 13.5,
    color: 'rgba(255,255,255,0.72)',
    cursor: 'pointer',
    transition: tokens.transition,
    borderRadius: 8,
    padding: '6px 0',
    textDecoration: 'none',
  },
  infoIcon: { fontSize: 16, flexShrink: 0 },
  infoImg: { width: 18, height: 18, borderRadius: 4, flexShrink: 0 },
  divider: { height: 1, background: 'rgba(255,255,255,0.1)', margin: '4px 0' },

  form: {
    flex: 1,
    padding: '48px 44px',
    background: tokens.color.surface,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  heading: {
    fontFamily: tokens.font.display,
    fontSize: 26,
    fontWeight: 600,
    letterSpacing: '-0.5px',
    color: tokens.color.text,
    marginBottom: 2,
  },
  subheading: {
    fontSize: 14,
    color: tokens.color.textSub,
    marginBottom: 18,
  },
  row: { display: 'flex', gap: 12 },
  input: {
    flex: 1,
    padding: '11px 14px',
    fontSize: 14,
    color: tokens.color.text,
    background: tokens.color.surfaceAlt,
    border: `1.5px solid ${tokens.color.border}`,
    borderRadius: tokens.radius.input,
    outline: 'none',
    fontFamily: tokens.font.body,
    transition: tokens.transition,
    '::placeholder': { color: tokens.color.textPlaceholder },
  },
  textarea: {
    width: '100%',
    padding: '11px 14px',
    fontSize: 14,
    color: tokens.color.text,
    background: tokens.color.surfaceAlt,
    border: `1.5px solid ${tokens.color.border}`,
    borderRadius: tokens.radius.input,
    outline: 'none',
    fontFamily: tokens.font.body,
    resize: 'vertical',
    minHeight: 100,
    transition: tokens.transition,
    boxSizing: 'border-box',
  },
  checkRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 13.5,
    color: tokens.color.textSub,
    margin: '4px 0',
  },
  checkbox: { accentColor: tokens.color.accent, width: 15, height: 15, cursor: 'pointer' },
  btn: {
    marginTop: 6,
    padding: '13px 28px',
    background: tokens.color.accent,
    color: '#fff',
    border: 'none',
    borderRadius: tokens.radius.btn,
    fontSize: 15,
    fontWeight: 500,
    fontFamily: tokens.font.display,
    cursor: 'pointer',
    letterSpacing: '-0.1px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    transition: tokens.transition,
    alignSelf: 'flex-start',
  },
  banner: (type) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 16px',
    borderRadius: 10,
    fontSize: 13.5,
    fontWeight: 500,
    marginBottom: 10,
    background: type === 'success' ? tokens.color.successBg : tokens.color.errorBg,
    border: `1px solid ${type === 'success' ? tokens.color.success : tokens.color.error}`,
    color: type === 'success' ? tokens.color.success : tokens.color.error,
  }),
  // ─── Responsive additions ──────────────────────────────────────────────────
  spinnerCss: `
    @keyframes _spin { to { transform: rotate(360deg); } }
    ._spinner { animation: _spin 0.8s linear infinite; }
    ._input:focus { border-color: ${tokens.color.borderFocus} !important; box-shadow: ${tokens.shadow.inputFocus} !important; background: #fff !important; }
    ._btn:hover:not(:disabled) { background: ${tokens.color.accentHover} !important; transform: scale(1.02); }
    ._btn:active:not(:disabled) { transform: scale(0.98); }
    ._info-row:hover { color: rgba(255,255,255,0.95) !important; }

    @media (max-width: 640px) {
      ._contact-wrap {
        flex-direction: column !important;
        border-radius: 16px !important;
        margin: 0 12px !important;
      }
      ._contact-info {
        min-width: unset !important;
        max-width: unset !important;
        padding: 28px 24px !important;
        flex-direction: row !important;
        flex-wrap: wrap !important;
        gap: 12px !important;
        align-items: flex-start !important;
      }
      ._contact-info h2 {
        width: 100% !important;
        margin-bottom: 0 !important;
      }
      ._contact-info ._divider-full {
        display: none !important;
      }
      ._contact-form {
        padding: 28px 24px !important;
      }
      ._form-row {
        flex-direction: column !important;
      }
      ._contact-btn {
        width: 100% !important;
        align-self: stretch !important;
      }
    }
  `,
};

const Spinner = () => (
  <svg className="_spinner" width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".25"/>
    <path fill="currentColor" opacity=".75" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"/>
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', message: '', newsletter: false,
  });
  const [loading, setLoading]           = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);   // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) { alert('First Name is required.'); return false; }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) { alert('Please enter a valid email address.'); return false; }
    if (!formData.phone.trim() || formData.phone.length < 8) { alert('Please enter a valid phone number (at least 8 digits).'); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true); setSubmitStatus(null); setErrorMessage('');
    try {
      await submitContactForm(formData);
      setSubmitStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '', newsletter: false });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputProps = (name, placeholder, type = 'text') => ({
    className: '_input', name, type, placeholder, value: formData[name],
    onChange: handleChange, disabled: loading,
    style: S.input,
  });

  return (
    <div style={S.wrap} className="_contact-wrap">
      <style>{S.spinnerCss}</style>

      {/* ── Info Panel ─────────────────────────────────────────── */}
      <aside style={S.info} className="_contact-info">
        <h2 style={S.infoHeading}>Contact Us</h2>
        <div style={S.divider} className="_divider-full" />

        <a href={`tel:${CONTACT_PAGE_CONTENT.phone}`} style={S.infoRow} className="_info-row">
          <span style={S.infoIcon}>📞</span> {CONTACT_PAGE_CONTENT.phone}
        </a>
        <a href={`mailto:${CONTACT_PAGE_CONTENT.email}`} style={S.infoRow} className="_info-row">
          <span style={S.infoIcon}>✉</span> {CONTACT_PAGE_CONTENT.email}
        </a>
        <a href={CONTACT_PAGE_CONTENT.instagramUrl} target="_blank" rel="noreferrer" style={S.infoRow} className="_info-row">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" style={S.infoImg} />
          {CONTACT_PAGE_CONTENT.instagram}
        </a>

        <div style={S.divider} className="_divider-full" />
        <span style={{ ...S.infoRow, cursor: 'default', fontSize: 13 }}>
          <span style={S.infoIcon}>📍</span> {CONTACT_PAGE_CONTENT.address}
        </span>
      </aside>

      {/* ── Form Panel ─────────────────────────────────────────── */}
      <section style={S.form} className="_contact-form">
        <h1 style={S.heading}>Leave a Message</h1>
        <p style={S.subheading}>We'd love to hear from you.</p>

        {submitStatus && (
          <div style={S.banner(submitStatus)}>
            {submitStatus === 'success' ? '✓ Message sent successfully!' : `⚠ ${errorMessage}`}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'contents' }}>
          <div style={S.row} className="_form-row">
            <input {...inputProps('firstName', 'First Name *')} required />
            <input {...inputProps('lastName',  'Last Name')} />
          </div>
          <div style={S.row} className="_form-row">
            <input {...inputProps('email', 'Email Address *', 'email')} required />
            <input {...inputProps('phone', 'Phone Number *')} required />
          </div>
          <textarea
            className="_input" name="message" rows={5} placeholder="Your message…"
            value={formData.message} onChange={handleChange} disabled={loading}
            style={S.textarea}
          />
          <label style={S.checkRow}>
            <input type="checkbox" name="newsletter" checked={formData.newsletter}
              onChange={handleChange} disabled={loading} style={S.checkbox} />
            Subscribe to newsletter
          </label>
          <button type="submit" className="_btn _contact-btn" disabled={loading} style={S.btn}>
            {loading ? <><Spinner /> Sending…</> : 'Send Message'}
          </button>
        </form>
      </section>
    </div>
  );
}