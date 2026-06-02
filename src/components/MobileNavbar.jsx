'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // Close menu automatically after route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { to: '/', label: 'Home', className: 'navbarmobile_div1__MI+kS' },
    { to: '/about', label: 'About Us', className: 'navbarmobile_div2__MI+kS' },
    { to: '/events', label: 'Events', className: 'navbarmobile_div3__MI+kS' },
    { to: '/sponsors', label: 'Sponsors', className: 'navbarmobile_div4__MI+kS' },
    { to: '/store', label: 'Shop', className: 'navbarmobile_div5__MI+kS' },
    { to: '/gallery', label: 'Gallery', className: 'navbarmobile_div7__MI+kS' },
    { to: '/contact', label: 'Contact Us', className: 'navbarmobile_div8__MI+kS' },
  ];

  return (
    <div className="navbarmobile_navbar__pGyZX">
      <div className="navbarmobile_frustation__KE71W" ref={menuRef}>
        <div className="navbarmobile_navtop__hHg30">
          <Link href="/">
            <img
              src="/sa/tedxiitg/images/WhiteTextLogo.png"
              alt="TEDx Integral Logo"
            />
          </Link>
        </div>

        <button
          className="navbarmobile_menubutton__+Di-l"
          onClick={toggleMenu}
          type="button"
        >
          {isOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '24px', height: '24px' }}
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '24px', height: '24px' }}
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      <div
        className={
          isOpen
            ? 'navbarmobile_navbarmobileopen__laDU8'
            : 'navbarmobile_navbarmobile__pGyZX'
        }
      >
        {isOpen && (
          <div className="navbarmobile_div__8zq2P">
            {navItems.map((item, index) => {
              const isActive =
                pathname === item.to ||
                (item.to !== '/' && pathname.startsWith(item.to));

              return (
                <div key={index} className={item.className}>
                  <Link
                    href={item.to}
                    style={{
                      color: isActive ? 'red' : '',
                    }}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNavbar;