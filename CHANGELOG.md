# Changelog

All notable changes to this project will be documented in this file.

## [2.2.0] - 2026-07-16
### Added
- Implemented language switcher and fixed racial bonus max check.
- Added natural language search for races, bonus info card, and improved `RaceSelectorModal` with grouping.
- Refactored `RaceOption` into a separate component.
- Refactored mixed attribute distribution logic.
- Optimized QR Code.
- Refactored Moreau races.

## [2.0.0] - 2026-07-15
### Changed
- Project version bumped to 2.0.0.

### Fixed
- Fixed various hydration issues and icon animations.
- Improved QR code scannability and layout.
- Resolved styling issues on iOS (transparency, input sizing, background rendering).
- Improved image export styling and padding.
- Ensured all config options are displayed in `ConfigModal`.

### Refactored
- Extracted `ApplicationLayout` logic into separate components.
- Separated `ConfigModal` logic.

## [1.2.0] - 2026-06
### Added
- Implemented character management with left-side menu.
- Added QR code export for character configuration with optional toggling.
- Added support for image export with logo.

## [1.1.0] - 2026-05
### Added
- Implemented language switcher.
- Added natural language search for races.
- Added bonus info card to race selection.
- Implemented `RaceSelectorModal` with grouping.
- Migrated race data to external `races.json`.

### Fixed
- Fixed racial bonus maximum check.
- Internationalized image export labels and filenames.

### Refactored
- Refactored `RaceOption` into a separate component.
