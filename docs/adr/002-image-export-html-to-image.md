# ADR 002: Image Export via html-to-image

## Status
Accepted

## Context
Users need to be able to export their character attributes as a visually styled image (PNG) for sharing on social media or in TTRPG groups.

## Decision
We are using the **`html-to-image`** library to capture a hidden, styled DOM element and convert it into a PNG image on the client side.

## Rationale
1. **CSS Fidelity**: Since the application is built with Tailwind CSS, capturing the actual DOM ensures that the exported image exactly matches the UI styles without needing to rebuild the layout in a separate canvas or SVG engine.
2. **Client-Side Execution**: By generating the image in the browser, we avoid the need for a backend server (like Puppeteer) to render the page, keeping the application lightweight and serverless.
3. **Ease of Implementation**: The library provides a simple API to target a specific `ref` and produce a data URL.

## Consequences
- **DOM Dependency**: The export quality depends on the rendered state of the hidden DOM element.
- **Browser Compatibility**: While widely supported, some browser-specific rendering quirks might affect the output.
- **Performance**: Capturing large DOM trees can be resource-intensive, though our export sheet is relatively small.
