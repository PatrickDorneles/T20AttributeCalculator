# Changelog
 
## [1.2.0] - 2026-07-13
 
### Added
- **Advanced Race Selector**: Replaced the race dropdown with a searchable, grouped modal.
- **Sourcebook Grouping**: Races are now organized by their respective sourcebooks.
- **Natural Language Search**: Search now filters races by name and by their bonus descriptions (e.g., searching "Distribute" finds races with point-buy bonuses).
- **Racial Bonus Info Card**: Added a persistent card that describes the selected race's bonuses in a natural language format, adapting its position for mobile and desktop.
- **Race Icons**: Added unique emojis to each race for better visual identification.
- **Custom Race Naming**: When selecting the "Other" race, users can now specify a custom name for their race.
- **Default Race**: Changed the default starting race to "Human".
 
### Fixed
- **Mixed Racial Bonuses**: Fixed a bug in the distribution logic for races with mixed bonuses (e.g., Half-Orc), ensuring fixed bonuses don't block the distribution of optional points.
 
### Refactored
- **Data Externalization**: Moved race definitions to `races.json` for easier maintenance.
- **Bonus Formatting**: Implemented a centralized `useFormatRaceBonus` hook to ensure consistent natural language descriptions across the app.
 
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

