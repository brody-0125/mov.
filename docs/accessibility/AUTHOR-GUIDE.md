# Accessibility author guide

Content authors share responsibility for WCAG conformance on published posts.

## Images

- Every meaningful image needs descriptive `alt` text in Markdown: `![Description](url)`.
- Decorative images should use an empty alt: `![](url)`.

## Headings

- Use one logical `h1` per page (the theme sets the post title as `h1`).
- Do not skip heading levels (for example, do not jump from `h2` to `h4`).

## Links

- Link text must describe the destination ("Read the Hugo docs"), not "click here".
- Avoid raw URLs as link text unless the URL itself is the content.

## Math (KaTeX)

- When `math: true`, provide a plain-language summary near complex formulas when possible.
- Test posts with a screen reader if math-heavy.

## Shortcodes

- **Callout:** The `title` parameter becomes the accessible name; always set it for non-obvious types.
- **Comment:** Keep trigger text short; put the full note in the `note` parameter.

## Language

- Site default language is configured in `hugo.toml` (`languageCode`). Match post language to audience; mixed-language posts should use the clearest language for each section.

For automated checks, run `npm run a11y` after building the site (see [TEST-MATRIX.md](./TEST-MATRIX.md)).
