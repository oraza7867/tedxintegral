'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaInfoCircle, FaCalendarAlt, FaHandshake, FaStore, FaImages, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  const pathname = usePathname();

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  const navItems = [
    { to: '/', label: 'Home', icon: FaHome },
    { to: '/about', label: 'About Us', icon: FaInfoCircle },
    { to: '/events', label: 'Events', icon: FaCalendarAlt },
    { to: '/sponsors', label: 'Sponsors', icon: FaHandshake },
    { to: '/store', label: 'Store', icon: FaStore },
    { to: '/gallery', label: 'Gallery', icon: FaImages },
    { to: '/contact', label: 'Contact Us', icon: FaEnvelope },
  ];

  return (
    <div className="navbardesktop_sidebar__wvkNt">
      <div className="navbardesktop_logo__r0-tE">
        <img src="/sa/tedxiul/images/TEDx26 Logo.png" alt="TEDx Integral Logo" />
      </div>
      <div className="navbardesktop_menu__MRhxn">
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = pathname === item.to || (item.to !== '/' && pathname.startsWith(item.to));
          
          return (
            <Link
              key={index}
              href={item.to}
              onClick={handleLinkClick}
              className={`navbardesktop_navlink__P2CmU ${isActive ? 'navbardesktop_active__FouMk' : ''}`}
            >
              <div className="navbardesktop_item__h9ADK">
                <IconComponent className="navbardesktop_icon__FkP8-" />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;