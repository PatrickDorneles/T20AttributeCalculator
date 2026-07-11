# Changelog
 
## [1.1.0] - 2026-07-11
 
### Added
- **QR Code Export**: Added optional QR codes to exported images that allow importing character configuration directly via URL.
- **Enhanced QR Code**: Improved scannability with High error correction, custom sizing, and branding (logo overlay).
- **Configurable Export**: Added a setting to toggle the QR code visibility in the final image.
- **Image Layout Refinement**: Adjusted export image padding and layout to better accommodate the QR code and branding.
 
## [1.0.0] - 2026-07-11


### Added
- **Attribute Calculator**: Core system for calculating character attributes based on Tormenta 20 rules.
- **Point-Buy System**: Dynamic point distribution with real-time cost calculation and limit validation.
- **Race Integration**: Support for various T20 races with automatic racial bonus application (including choice and mixed types).
- **Character Management**: Ability to create, save, and switch between multiple characters.
- **Export Options**: 
  - Export character data to JSON for portability.
  - Import character data from JSON files.
  - Export a visually styled character sheet image (PNG) including attributes, race, and points.
- **Configuration System**: Customizable settings for point limits and visibility of "Other" points section.
- **Internationalization**: Full support for English and Portuguese.
- **Responsive UI**: Modern interface built with Next.js and Tailwind CSS.

### How it Works
- **Point Distribution**: Players assign points to attributes. The system calculates the cost based on the T20 rulebook and deducts it from the available pool.
- **Racial Bonuses**: Selecting a race automatically applies bonuses. For races with "Choice" or "Mixed" bonuses, the system allows the player to distribute the points manually within the rule limits.
- **Persistence**: Character data is stored locally using Jotai `atomWithStorage`.
- **Image Generation**: The application uses `html-to-image` to render a hidden, styled DOM element into a PNG file.

### Technology Stack
- Next.js 13
- TypeScript
- Tailwind CSS
- Jotai (State Management)
- next-intl (i18n)
- Zod (Validation)
- Heroicons
