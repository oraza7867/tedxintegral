import React from 'react';
import HomeTimeline from '../components/HomeTimeline';
import ReviewsCarousel from '../components/ReviewsCarousel';
import LocationVenue from '../components/LocationVenue';
import { CanvasHero, SpeakerCylinder } from '../components/InteractiveHero';


export default function Home() {
  return (
    <div>
      {/* 1. Canvas particles + parallax hero video reveal */}
      <CanvasHero />

      {/* 2. 3D Cylinder speaker cards display */}
      <SpeakerCylinder />

      {/* 4. Timeline schedule list with red growing line */}
      <HomeTimeline />

      {/* 6. Venue map and Google Maps redirection */}
      <LocationVenue />
    </div>
  );
}
