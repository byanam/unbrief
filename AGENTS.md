# Unbrief — Agent Rules & Architecture Guidelines

## Architecture & Tech Stack
- **Core**: Semantic HTML5 & Vanilla JavaScript (ES6+). Zero heavy frameworks.
- **Styling**: Pure Vanilla CSS3 with custom properties and responsive fluid layouts.
- **Aesthetic**: Swiss Modernist editorial design direction (restrained monochrome, subtle border hairines, zero glows, tactile dark mode).
- **Typography**: Google Fonts (`Plus Jakarta Sans` for body/display, `Space Mono` for metrics/code).

## Local Development & Testing
- Serve locally using:
  ```bash
  npm run dev
  # or
  python3 -m http.server 3000
  ```
- Test changes in multiple viewport widths (desktop, tablet, mobile).
- Ensure all interactive elements have valid `type="button"`, `aria-label`, and keyboard focus indicators.

## Git & Version Control
- Commit with concise, conventional commit prefixes (`feat:`, `fix:`, `refactor:`, `perf:`, `style:`, `docs:`, `chore:`).
- Always push verified changes to `origin/main`.
