import React from 'react';
import type { Metadata } from 'next';
import ContactForm from '../../components/ContactForm';
import { CONTACT_PAGE_CONTENT } from '../../data/contactData';

export const metadata: Metadata = {
  title: CONTACT_PAGE_CONTENT.metaTitle,
  description: CONTACT_PAGE_CONTENT.metaDescription,
};

export default function ContactPage() {
  return (
    <div className="contactUs_contactWrapper__Lm69b">
      <div className="contactUs_contactContainer__NcgHx">
        <ContactForm />
      </div>
    </div>
  );
}
