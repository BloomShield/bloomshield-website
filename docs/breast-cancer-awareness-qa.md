# Breast Cancer Awareness Month article implementation

Implemented locally on 2 October 2026. No commit, push or deployment performed.

## Changed files

- `app/insights/series-collections/before-we-talk-about-the-gaps/page.tsx`: approved manuscript, shared article shell, internal CTAs, related Local Lens content, canonical, Open Graph, Twitter and Article JSON-LD.
- `app/insights/series-collections/page.tsx`: new Series & Collections landing page.
- `components/breast-cancer-awareness-collection.tsx`: reusable collection display, selecting published articles by collection label.
- `app/insights/page.tsx`: collection card and overview structured-data entry.
- `lib/insights.ts`: article record, optional reusable collection field, and category route.
- `app/sitemap.ts`: collection and article routes.
- `public/images/insights/breast-cancer-awareness-before-gaps-hero.png`: supplied landscape asset.
- `public/images/insights/breast-cancer-awareness-before-gaps-card.png`: supplied square asset.
- `docs/breast-cancer-awareness-qa.md`: this implementation and validation report.

## Asset mapping

Source `breast-cancer-awareness-before-gaps-hero.png.png` → `/images/insights/breast-cancer-awareness-before-gaps-hero.png` (article hero).

Source `breast-cancer-awareness-before-gaps-card.png.png` → `/images/insights/breast-cancer-awareness-before-gaps-card.png` (overview, collection card, Open Graph and Twitter).

Both copies have identical SHA-256 hashes to their supplied originals. Artwork and logos were not altered. Both use object-contain. The supplied landscape image includes its lower banner; the entire supplied file is retained.

## Validation

- TypeScript: passed.
- ESLint: passed after removal of the temporary implementation script.
- git diff --check: passed (only Git line-ending conversion notices).
- Production build: passed, generating 45 static pages, including both new routes. Initial sandboxed attempt failed to download existing Google Fonts; network-enabled retry passed.
- Browser DOM/layout checks: `/insights`, `/insights/series-collections`, new article, `/insights/local-lens/medway-kent`, and `/insights/local-lens/liverpool` all loaded at 1440px desktop and 390px mobile.
- No horizontal overflow on any of those pages at either width.
- Square card renders square with object-contain; hero loads with object-contain.
- New article has exactly one reaction/share layer, immediately after the final substantive paragraph.
- Both manuscript Local Lens links point to their correct routes; both destination pages load.
- Canonical, Open Graph image, Twitter image and parseable Article JSON-LD confirmed in rendered DOM.
- Existing Local Lens article source files and the shared article shell are unchanged.
- No article-specific LinkedIn discussion CTA added because no discussion URL was supplied.

## Outstanding review

Desktop and mobile screenshot-based visual QA remains unverified. The in-app browser successfully exposes page DOM and rendered dimensions, but repeatedly returns “Unable to capture screenshot”, including after enabling visibility and resetting viewport overrides. Logo fidelity is supported by byte-identical assets; visual appearance still needs human review or a functioning screenshot capture tool before release.
