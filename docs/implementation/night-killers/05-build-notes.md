# Build Notes

## Top-level Structure

- `src/app`
  App Router routes and layout
- `src/components/layout`
  Header, mobile navigation, and footer
- `src/components/ui`
  Shared buttons, headings, reveal wrappers, stat cards, and member cards
- `src/content`
  Static content modules
- `src/types`
  Shared data shapes
- `public`
  Crest/logo assets

## Shared Components

- `ButtonLink`
- `SectionHeading`
- `PageHero`
- `Reveal`
- `StatGrid`
- `FeatureGrid`
- `MemberCard`
- `LogoMark`

## Implementation Order

1. Create docs pack
2. Scaffold Next.js config and content files
3. Build the layout shell and shared UI
4. Implement Home
5. Implement Members, Apply, Contact
6. Replace placeholder content and tune spacing

## Extension Points

- Add Events or History pages by creating new content modules and routes
- Move from static data to MDX later without reworking the component layer
- Add a richer application flow later by replacing the external apply URL with a form route or API-backed flow

