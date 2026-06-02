# CMS Migration Notes for TEDx Integral

This document provides guidelines and recommended schema mappings for migrating the dynamic frontend data layers of the **TEDx Integral** website to **Sanity CMS**.

---

## Data-to-Schema Mapping Overview

The website's current static data models reside in the `src/data/` directory. When migrating to Sanity CMS, these datasets should be mapped to the following schemas.

| Local Data File | Recommended Sanity Document Type (Schema Name) | Document / Object Structure |
| :--- | :--- | :--- |
| `aboutTabs.js` | `aboutSection` (Singleton or Document) | Custom tabs (TED, TEDx, TEDx Integral) and core values |
| `blogsData.js` | `blog` (Document) | Articles written by the organizing team |
| `speakersData.js` | `speaker` (Document) | Profiles of flagship & upcoming speakers |
| `teamData.js` | `teamMember` (Document) | Organizing committee leads and heads |
| `eventsData.js` / `eventsList.js` | `event` (Document) | Annual conferences, themes, speakers list, memories |
| `sponsorsData.js` | `sponsor` (Document) & `sponsorConfig` | Strategic partners, audience stats, opportunities config |
| `passesData.js` | `ticketingPass` (Document) | early bird & general admission pass details |
| `fallbackTexts.js` | `emptyStateConfig` (Singleton) | Empty/fallback state headings and subheadings |

---

## Recommended Schemas & Fields

### 1. Speaker Schema (`speaker`)
* **Schema Name:** `speaker`
* **Type:** Document
* **Fields:**
  * `id` (`string`, required) - Unique slug/stable ID.
  * `name` (`string`, required) - Speaker's full name.
  * `title` (`string`, required) - Professional title or tagline (e.g., "Change Maker & Leader").
  * `bio` (`text`, required) - Biography of the speaker.
  * `img` (`image`, required) - Speaker profile photo.

### 2. Sponsor Schema (`sponsor`)
* **Schema Name:** `sponsor`
* **Type:** Document
* **Fields:**
  * `id` (`string`, required) - Unique stable ID.
  * `name` (`string`, required) - Partner name.
  * `logo` (`image`, required) - Monochrome sponsor logo.
  * `order` (`number`) - For sorting display order.

### 3. Team Member Schema (`teamMember`)
* **Schema Name:** `teamMember`
* **Type:** Document
* **Fields:**
  * `id` (`string`, required) - Unique identifier.
  * `name` (`string`, required) - Member's name.
  * `role` (`string`, required) - Committee role (e.g., "Design & Creatives Head").
  * `image` (`image`, required) - Avatar photo.
  * `linkedin` (`url`) - LinkedIn profile link (optional).

### 4. Blog Schema (`blog`)
* **Schema Name:** `blog`
* **Type:** Document
* **Fields:**
  * `id` (`string`, required) - URL Slug.
  * `category` (`string`, required) - Topic category (e.g., "Innovation").
  * `title` (`string`, required) - Blog post title.
  * `shortDesc` (`text`, required) - Short summary displayed on grid cards.
  * `longDesc` (`text`, required) - Full description displayed on hover/details.
  * `image` (`image`, required) - Cover image.
  * `link` (`url`) - External medium or content link.

### 5. Event Schema (`event`)
* **Schema Name:** `event`
* **Type:** Document
* **Fields:**
  * `year` (`string`, required) - Year of the event (e.g., "2026").
  * `themeTitle` (`string`, required) - Dynamic conference theme.
  * `themeDate` (`string`, required) - Date string (e.g., "February 08, 2026").
  * `themeDescription` (`text`, required) - Paradox or thematic write-up.
  * `speakers` (`array` of references to `speaker`) - Flagged list of speakers for this year.
  * `team` (`array` of references to `teamMember`) - Organizing committee members for this year.
  * `memories` (`array` of `image`) - Photos captured during the event.
  * `image` (`image`) - Banner image for the timeline grid.

### 6. Ticketing Pass Schema (`ticketingPass`)
* **Schema Name:** `ticketingPass`
* **Type:** Document
* **Fields:**
  * `id` (`string`, required) - Unique ID.
  * `name` (`string`, required) - Ticket name (e.g., "General Pass").
  * `price` (`number`, required) - Price in native currency.
  * `code` (`string`) - Ticket SKU/identifier.
  * `deck` (`string`) - Brief tag line (e.g., "Main Hall Access").
  * `link` (`url`, required) - Registration or forms form link.
  * `discount` (`number`) - Active discount if applicable.
  * `features` (`array` of `string`) - Ticketing benefits.
  * `noteTitle` (`string`) - Note section title.
  * `noteText` (`string`) - Eligibility note copy.

### 7. Empty State Config Schema (`emptyStateConfig`)
* **Schema Name:** `emptyStateConfig`
* **Type:** Singleton / Document
* **Fields:**
  * `speakersHeading` / `speakersSubheading` (`string`)
  * `sponsorsHeading` / `sponsorsSubheading` (`string`)
  * `galleryHeading` / `gallerySubheading` (`string`)
  * `eventsHeading` / `eventsSubheading` (`string`)
  * `teamHeading` / `teamSubheading` (`string`)
  * `blogsHeading` / `blogsSubheading` (`string`)

---

## Migration Steps Checklist

1. **Install Sanity Dependencies:**
   Run `npm install next-sanity @sanity/image-url` in the web application root directory.
2. **Configure Studio:**
   Define the document types above inside the schemas folder of the Sanity Studio project.
3. **Set Up Client API Wrapper:**
   Create a Sanity client query config (`src/utils/sanity.ts`) that fetches these documents via GROQ queries.
4. **Replace Data Imports:**
   Remove static imports (e.g., `import { SPEAKERS_DATA } from '../data/speakersData'`) in React pages/components, replacing them with dynamic API fetches (e.g., `await sanityClient.fetch(speakersQuery)`).
5. **Set Up Image URLs:**
   Use Sanity's `@sanity/image-url` builder helper to resolve the dynamic asset paths for images.
