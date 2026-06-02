import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { EVENTS_DATA } from '../../../data/eventsData';
import EventDetailClient from '../../../components/EventDetailClient';

interface PageProps {
  params: Promise<{ year: string }>;
}

// Generate dynamic metadata based on the route parameter!
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year } = await params;
  const data = (EVENTS_DATA as any)[year];
  if (!data) {
    return {
      title: 'Event Not Found | TEDx Integral',
    };
  }

  const themeTitle = data.themeTitle || "Upcoming Event";

  return {
    title: `TEDx Integral ${year} | Theme: ${themeTitle}`,
    description: data.themeDescription || `Relive the talks, experiences, and organizing team of the TEDx Integral ${year} edition themed around ${themeTitle}.`,
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { year } = await params;
  
  // Cast EVENTS_DATA to any to access dynamic index reliably
  const data = (EVENTS_DATA as any)[year];

  // If the year is invalid, render the friendly fallback inline
  if (!data) {
    return (
      <div style={{ padding: '120px 24px', color: '#fff', textAlign: 'center', minHeight: '80vh', backgroundColor: '#000' }}>
        <h2>Event Not Found</h2>
        <p>Sorry, the event for the year {year} was not found.</p>
        <Link href="/events">
          <button
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              backgroundColor: '#e62b1e',
              border: 'none',
              color: '#fff',
              borderRadius: '999px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Back to Events
          </button>
        </Link>
      </div>
    );
  }

  // Resolve theme info dynamically from the dataset
  const themeTitle = data.themeTitle || "Upcoming Event";
  const themeTagline = data.themeTagline || "";
  const themeDate = data.themeDate || "Date to be announced";
  const themeDescription = data.themeDescription || "Event details will be published shortly.";
  const heroImage = data.heroImage || "";

  // Filter actual speakers (description is populated) vs team members listed in speakers field
  const speakers = (data.speakers || []).filter((s: any) => s.description !== "");
  const team = data.team || [];
  const sponsors = data.sponsors || [];
  const memories = data.memories || [];

  return (
    <EventDetailClient
      year={year}
      themeTitle={themeTitle}
      themeTagline={themeTagline}
      themeDate={themeDate}
      themeDescription={themeDescription}
      heroImage={heroImage}
      speakers={speakers}
      team={team}
      sponsors={sponsors}
      memories={memories}
    />
  );
}

