import React from 'react';
import type { Metadata } from 'next';
import StoreClient from '../../components/StoreClient';
import { STORE_PAGE_CONTENT } from '../../data/passesData';

export const metadata: Metadata = {
  title: STORE_PAGE_CONTENT.metaTitle,
  description: STORE_PAGE_CONTENT.metaDescription,
};

export default function StorePage() {
  return (
    <StoreClient />
  );
}
