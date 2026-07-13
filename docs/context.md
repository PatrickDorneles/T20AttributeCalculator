# Project Context

## Overview
T20AC (Tormenta 20 Attribute Calculator) is a web application designed for the Brazilian TTRPG **Tormenta 20 - Edição Jogo do Ano**. Its primary purpose is to assist players in character creation by calculating attributes and managing the point-buy system for attribute distribution.

## Technology Stack
- **Framework**: [Next.js](https://nextjs.org/) (version 13)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Jotai](https://jotai.org/)
- **Internationalization**: [next-intl](https://next-intl.org/)
- **Validation**: [Zod](https://zod.dev/)

## Principles
- **Accuracy**: Ensure attribute calculations align strictly with the Tormenta 20 rulebook.
- **Usability**: Provide a clear and intuitive interface for character attribute management.
- **Internationalization**: Support multiple languages (English and Portuguese) to reach a broader audience.
- **Type Safety**: Leverage TypeScript and Zod to minimize runtime errors and ensure data integrity.
- **Modularity**: Componentize code whenever styles require it, or when component logic can be separated without hard tradeoffs.

## Project Structure
- `src/atoms`: Global state definitions using Jotai.
- `src/components`: React components, divided into:
    - `calculator/`: Logic and UI specifically for the attribute calculation process.
    - `layout/`: High-level wrappers and layout-related components (e.g., Modals, Navigation).
    - `flowbite/`: Custom UI primitives.
    - `svg/`: Static SVG icons and logos.
- `src/functions`: Pure utility functions and business logic (e.g., attribute cost calculations).
- `src/messages`: i18n translation files.
- `src/pages`: Next.js page definitions.
- `src/resources`: Static data maps (e.g., racial bonuses).
- `src/types`: TypeScript type and interface definitions.
- `src/styles`: Global CSS and Tailwind configurations.

## Testing Strategy
Currently, the project relies on:
- **Type Checking**: TypeScript ensures internal consistency.
- **Build Verification**: `npm run build` is used to verify that the application compiles and that Next.js static generation succeeds.
- **Linting**: `npm run lint` ensures code style and basic correctness.
- **Manual Testing**: Verification of calculations against the rulebook.

Future improvements include introducing unit tests for the `src/functions` logic using a testing framework.
