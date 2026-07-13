# ADR 003: Externalizing Race Data to JSON

## Status
Accepted

## Context
Originally, race definitions and their identifiers were managed via a TypeScript enum (`Race`) and a hardcoded `Map` (`RacialBonusMap`). As the number of races grew and the need for additional metadata (like the source book/magazine) emerged, the enum became unwieldy and the data was split across multiple locations.

## Decision
We have migrated all race-related data, including identifiers, sources, and attribute bonuses, into a single JSON file: `src/resources/races.json`. 

The `Race` type has been changed from an `enum` to a `string` to allow for dynamic loading and extension of the race list without requiring constant TypeScript enum updates.

## Rationale
1. **Single Source of Truth**: Centralizing race data in JSON makes it easier to manage and audit.
2. **Flexibility**: Adding new races or updating sources no longer requires modifying TypeScript enums or complex map definitions.
3. **Extensibility**: JSON allows us to easily add new properties to a race (e.g., racial powers, descriptions) without changing the underlying type system for every race.
4. **Decoupling**: The UI can now dynamically load the list of races from the JSON, allowing for features like grouping races by source without hardcoding those groups in the logic.

## Consequences
- **Type Safety**: We moved from a strict `enum` to a `string` type for `Race`. To maintain safety, we use a `RaceData` type and cast the imported JSON as `RaceData[]` when initializing the `RacialBonusMap`.
- **Resource Loading**: The `RacialBonusMap` is now generated at runtime from the JSON data, though this has negligible impact on performance given the size of the dataset.
