'use client';

import React from 'react';
import dynamic from 'next/dynamic';

export const CanvasHero = dynamic(() => import('./CanvasHero'), {
  ssr: false,
  loading: () => <div style={{ height: '100vh', background: '#000' }} />
});

export const SpeakerCylinder = dynamic(() => import('./SpeakerCylinder'), {
  ssr: false,
  loading: () => <div style={{ height: '500px', background: '#000' }} />
});
