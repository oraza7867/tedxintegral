// ─────────────────────────────────────────────────────────────────────────────
// sponsorsData.js
// Edit this file to update all content on the Sponsors page.
// No logic lives here — just data.
// ─────────────────────────────────────────────────────────────────────────────

// ── BENEFITS ─────────────────────────────────────────────────────────────────
// Cards shown in the "Why Partner" grid.
// Add/remove objects freely. icon = any emoji.
export const BENEFITS = [
  {
    id: "ben-audience",
    icon: "🎯",
    title: "Influential Audience",
    description: "Connect your brand with dreamers, doers, and key decision-makers in our community."
  },
  {
    id: "ben-alignment",
    icon: "✨",
    title: "Brand Alignment",
    description: "Align with TEDx Integral's mission to spread ideas, build community, and change lives."
  },
  {
    id: "ben-objectives",
    icon: "📈",
    title: "Corporate Objectives",
    description: "Achieve specific corporate goals with our customised, integrated approach to partnerships."
  },
  {
    id: "ben-leadership",
    icon: "💡",
    title: "Thought Leadership",
    description: "Lead the conversation that brings corporations, start-ups, and inspired individuals together."
  }
];

// ── CURRENT SPONSORS ──────────────────────────────────────────────────────────
// Displayed in tiered rows. Tiers (in display order): "title" | "gold" | "silver" | "community"
// url is optional — omit it and the logo renders without a link.
// Empty array = section hides itself automatically.
export const CURRENT_SPONSORS = [
  {
    id: "cur-title-01",
    name: "Title Sponsor",
    logo: "/images/sponsors/sponsor-title.png",
    tier: "title",
    url: "https://example.com"
  },
  {
    id: "cur-gold-01",
    name: "Gold Partner One",
    logo: "/images/sponsors/sponsor-gold-01.png",
    tier: "gold",
    url: "https://example.com"
  },
  {
    id: "cur-gold-02",
    name: "Gold Partner Two",
    logo: "/images/sponsors/sponsor-gold-02.png",
    tier: "gold",
    url: "https://example.com"
  },
  {
    id: "cur-silver-01",
    name: "Silver Partner One",
    logo: "/images/sponsors/sponsor-silver-01.png",
    tier: "silver",
    url: "https://example.com"
  },
  {
    id: "cur-silver-02",
    name: "Silver Partner Two",
    logo: "/images/sponsors/sponsor-silver-02.png",
    tier: "silver",
    url: "https://example.com"
  },
  {
    id: "cur-silver-03",
    name: "Silver Partner Three",
    logo: "/images/sponsors/sponsor-silver-03.png",
    tier: "silver",
    url: "https://example.com"
  },
  {
    id: "cur-community-01",
    name: "Community Partner One",
    logo: "/images/sponsors/sponsor-comm-01.png",
    tier: "community",
    url: "https://example.com"
  },
  {
    id: "cur-community-02",
    name: "Community Partner Two",
    logo: "/images/sponsors/sponsor-comm-02.png",
    tier: "community",
    url: "https://example.com"
  }
];

// ── PAST SPONSORS ─────────────────────────────────────────────────────────────
// Greyscale logo grid. Reveal colour on hover.
// Replace placeholder paths with real logo paths as sponsors are confirmed.
export const PAST_SPONSORS = [
  { id: "spon-01", name: "Past Partner One",   logo: "/images/placeholders/sponsor.png" },
  { id: "spon-02", name: "Past Partner Two",   logo: "/images/placeholders/sponsor.png" },
  { id: "spon-03", name: "Past Partner Three", logo: "/images/placeholders/sponsor.png" },
  { id: "spon-04", name: "Past Partner Four",  logo: "/images/placeholders/sponsor.png" }
];

// ── PAGE COPY ─────────────────────────────────────────────────────────────────
// All visible text on the page. Edit values here — do not touch SponsorsPage.jsx
// for copy changes.
export const SPONSORS_PAGE_CONTENT = {
  // <head>
  metaTitle:                  "Partner with Us | TEDx Integral",
  metaDescription:            "TEDx Integral is made possible by our strategic partners who believe in spreading ideas. Explore partnership opportunities and past sponsors.",

  // Hero
  eyebrow:                    "TEDx Integral Partners",
  subtitle:                   "TEDx Integral is made possible by the generous support of partners who believe in ideas worth spreading. Join us in bringing inspiration to our community.",

  // CTA strip
  ctaTitle:                   "Build a Legacy with Us",
  ctaDescription:             "We're looking for a select group of strategic partners to help us grow the impact of TEDx Integral — reaching dynamic local and global audiences through live events and virtual broadcasts.",
  ctaButtonText:              "Sponsor TEDx Integral",
  contactEmail:               "partnerships@tedxintegral.com",

  // Current sponsors section
  currentSponsorsHeading:     "This Year's Partners",

  // Benefits section
  benefitsHeading:            "Why Partner with Us?",

  // Past sponsors section
  pastSponsorsHeading:        "Previous Partners",
  pastSponsorsSubtitle:       "We're thankful for the support of our past sponsors who made previous editions a great success."
};

// ── FALLBACK (past sponsors empty state) ──────────────────────────────────────
export const FALLBACK_TEXTS = {
  sponsors: {
    heading:    "Partnerships coming soon",
    subheading: "Details will be announced shortly."
  }
};