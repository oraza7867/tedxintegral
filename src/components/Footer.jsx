'use client';

import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="footer-outer">
      <div className="row1">
        <Link href="/" onClick={handleLinkClick}>
          <img src="/sa/tedxiitg/images/WhiteTextLogo.png" alt="TEDx Integral" className="footer-logo" />
        </Link>
      </div>
      <div className="footer-row1">
        <div className="footer-col1">
          <h4 className="footer-heading footer-link">What is TEDx?</h4>
          <div className="footer-ted-desc">
            This independent TEDx event is organized under license from TED. In the same spirit of spreading ideas, TED has created a program called TEDx. TEDx is an independently organized program of local events that bring together an audience in a TED-like experience. Our event is TEDx Integral, where x means TED event organized independently. At TEDx Integral, we combine videos of TED talks and live speakers to generate a deep conversation and connection between attendees. TED gives general guidelines for the TEDx program, but each individual TEDx is organized autonomously (subject to certain guidelines). TEDx Integral is a non-profit organization made up of volunteers. Their mission is to spread transformative ideas.
          </div>
        </div>
        <div className="footer-col2">
          <h4 className="footer-heading">Quick Links</h4>
          <div>
            <Link href="/events" onClick={handleLinkClick}>Events</Link>
            <Link href="/about" onClick={handleLinkClick}>About Us</Link>
            <Link href="/store" onClick={handleLinkClick}>Buy Tickets</Link>
            <Link href="/privacy" onClick={handleLinkClick}>Privacy Policies</Link>
            <Link href="/terms" onClick={handleLinkClick}>Terms and Conditions</Link>
          </div>
        </div>
        <div className="footer-col3">
          <div className="row2">
            <h4 className="footer-heading footer-link">Follow Us</h4>
            <div className="footer-social">
              <a href="https://www.instagram.com/tedx_integral/" target="_blank" rel="noopener noreferrer" className="footer-icon igicon">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/company/tedx-integral/" target="_blank" rel="noopener noreferrer" className="footer-icon igicon">
                <FaLinkedin />
              </a>
              
            </div>
          </div>
          <br></br>
          <span className="footer-email">
            Mail us at <a href="mailto:contact@tedxintegral.com" style={{ color: 'red' }}>contact@tedxintegral.com</a>
          </span>
        </div>
      </div>
      <div className="footer-row2">
        <div className="footer-copyright">
          @ Copyright by TEDx Integral. This independent TEDx event is operated under license from TED.
        </div>
      </div>
    </div>
  );
};

export default Footer;
