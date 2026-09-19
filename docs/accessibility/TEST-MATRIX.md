# Accessibility test matrix

Representative pages for manual and automated checks after `npm run build`.

| Page type | URL path (local) | Checks |
|-----------|------------------|--------|
| Home | `/index.html` | Skip link, category tabs, load more, live regions |
| Post list | `/posts/index.html` | Filter/sort toggles, `aria-pressed`, grid announcements |
| Post detail | First built post under `/posts/` | TOC (mobile details + desktop), copy code, headings |
| About | `/about/index.html` | Single `h1`, prose links |
| Contact | `/contact/index.html` | Same as About |

Automated: `npm run a11y` runs axe against the rows above in `public/`.

Manual smoke (keyboard only, ~5 minutes):

1. Tab from load → skip link → main → header search → open result with arrows + Enter.
2. Mobile width: menu toggle → search → close with Escape.
3. `/posts/`: change filter and sort; confirm status message in screen reader or `#a11y-status`.

Definition of done for accessibility PRs: axe reports zero **serious** and **critical** violations on matrix paths; manual smoke passes.
