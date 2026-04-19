# Night Killers V1 Overview

## Goal

Ship a simple, polished public website for the RuneScape clan Night Killers. The site should explain who the clan is, show the roster and tone of the community, and give clear paths to join or make contact.

## V1 Scope

- Public-only site
- Static content managed in source files
- Four routes: Home, Members, Apply, Contact
- Responsive layout with mobile-first behavior
- Light motion only where it improves clarity or feel

## Chosen Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- Motion
- Static content modules in `src/content`

## Deployment

- Target: Vercel
- Rendering mode: static-first
- No database, CMS, or server-side application flow in v1

## Visual Direction

- Dark fantasy / esports hybrid
- Deep obsidian and navy backgrounds
- Electric blue glow as the primary accent
- Small ember-red highlights to keep the page from feeling flat
- Strong shield/crest imagery and uppercase headings
- Glassy cards with soft borders and restrained blur

## Non-goals

- No auth or member dashboard
- No admin interface
- No integrated application backend
- No event system, news system, or achievements archive in v1
- No heavy animation system or scroll-jacking

## Done Means

- The four public routes are implemented
- Navigation works on desktop and mobile
- The site reads well on phone, tablet, and desktop widths
- Placeholder content is easy to replace in the content files
- The visual direction clearly reflects the provided reference

