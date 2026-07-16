# Tormenta 20 Attribute Calculator (T20AC) - Project Instructions

This document serves as the foundational mandate for all AI agents and developers working on the Tormenta 20 Attribute Calculator (T20AC). The rules, workflows, and conventions described here take absolute precedence over general defaults.

---

## 1. Project Context & Technology Stack

T20AC is a web-based character attribute calculator for the Brazilian TTRPG **Tormenta 20 - Edição Jogo do Ano**. It manages attribute point-buy distribution, validates constraints against the Tormenta 20 rulebook, and facilitates character sharing and saving.

### Tech Stack
- **Framework**: Next.js 13 (Page Router)
- **Language**: TypeScript (strict mode, high type safety)
- **Styling**: Tailwind CSS & Flowbite-inspired utility classes
- **State Management**: Jotai (atomic state)
- **Internationalization (i18n)**: next-intl (English and Portuguese support)
- **Validation**: Zod

---

## 2. Directory Structure Conventions

Developers and agents must place code strictly according to these folder patterns:
* **`src/atoms/`**: Global atomic state definitions using Jotai (e.g., character info, configuration, versioning).
* **`src/components/`**: React components subdivided by domain:
  * **`calculator/`**: Core calculator logic, point trackers, attribute sections, and export elements.
  * **`layout/`**: Application shells, wrappers, page layout, configuration modals, and modals (e.g., race selector).
  * **`flowbite/`**: Generic, primitive interactive UI components (e.g., `Toggle`).
  * **`svg/`**: Static SVG components/icons.
* **`src/functions/`**: Pure utility functions and business logic (e.g., calculations, sorting, serialization).
* **`src/messages/`**: Localized translation maps (`en.json`, `pt-BR.json`).
* **`src/pages/`**: Next.js route/page entrypoints.
* **`src/resources/`**: Static data assets and mappings (specifically `races.json` and generated runtime maps).
* **`src/types/`**: Strongly-typed TypeScript interfaces and type definitions.
* **`src/styles/`**: Global stylesheet imports (`globals.css`) and Tailwind configurations.

---

## 3. Core Architecture Decisions (ADRs)

Be strictly aligned with the following architectural choices:
1. **Jotai Atomic State (ADR 001)**: Use atomic state for reactive, nested-friendly, and lightweight updates. Synchronize character state with `localStorage` via `atomWithStorage` for browser persistence. Avoid over-atomizing state beyond manageability.
2. **Client-Side Export (ADR 002)**: Use the `html-to-image` library to capture hidden, stylized DOM elements to generate shareable PNG sheets. Maintain exact fidelity with existing CSS styles. Do not introduce server-side rendering or external canvas engines for this feature.
3. **Externalized Race Data (ADR 003)**: All race-related definitions (bonus attributes, source reference books, unique rules) reside in `src/resources/races.json`. The `Race` type is defined as a `string` (not an `enum`) to enable dynamic loading and ease extension. The `RacialBonusMap` is constructed at runtime by parsing `races.json`.

---

## 4. Mandatory Development Workflow

All non-trivial changes MUST follow this step-by-step feature workflow. No steps may be bypassed.

```
[Create Branch] ➔ [Research & Plan] ➔ [Request Approval] ➔ [Implement] ➔ [Verify Build] ➔ [Format & Lint] ➔ [Final Review] ➔ [Commit/Merge]
```

### Detailed Sequence
1. **Checkout Feature Branch**: Create a feature branch off `main` or `v2` (depending on the release target). Avoid direct edits on `main` without permission.
2. **Research**: Thoroughly analyze the requirements, explore dependencies, and identify affected files.
3. **Plan**: Formulate a comprehensive implementation plan using the **Planning Template** below.
4. **Ask for Approval**: Present your plan and proposed files to the reviewer/user before implementing.
5. **Implement**: Write surgical, precise code according to the approved plan.
6. **Typecheck & Build**: Execute `npm run build` to ensure the application compiles cleanly.
7. **Lint & Format**: Run `npm run lint` and verify styling. Fix any warnings or issues immediately.
8. **Final Review**: Present a clean summary of completed implementation to the reviewer.
9. **Finalize & Push**: Commit and push changes only after explicit final review approval.

### Planning Template
Each plan must outline:
* **Goal**: A concise statement of what is being achieved.
* **Analysis**: Deep dive into current behavior, files affected, and system dependencies.
* **Proposed Changes**: Specific files to modify, new files to create, and exact logic adjustments.
* **Verification Plan**: Commands to execute, manual verification steps, and specific target values to test against the rulebook.

---

## 5. Development Guardrails & Coding Standards

* **Zero `any` Usage**: The codebase is 100% type-safe. Avoid using `any` under all circumstances. Use generics, concrete union types, or `unknown` when working with dynamic structures.
* **Strict i18n Coherence**: When adding or modifying text/labels in the UI, you **MUST** update both localization files:
  - `src/messages/en.json`
  - `src/messages/pt-BR.json`
* **Build Verification Requirement**: You **MUST** run `npm run build` after making modifications to TypeScript types, core calculations, or Jotai atoms to catch static compiling/rendering regressions.
* **Pure Logical Functions**: Business logic, rule validation, and mathematical calculations should reside as pure, easily-testable modules in `src/functions/`. Keep React components focused purely on UI orchestration.
* **Componentization Guideline**: Break out complex layouts or heavy inline styles into reusable components when component state can be isolated cleanly, avoiding hard tradeoffs or excessive prop drilling.
* **Discovery-to-Doc Loop**: If you discover a hidden architectural dependency, a local quirk, or an undocumented rule, proactively suggest an update to the project docs or this `GEMINI.md` file.

---

## 6. Agent Editing and Troubleshooting Guidelines

To ensure maximum efficiency and minimal token overhead, follow these instructions for codebase manipulation:
* **Surgical Code Editing**: When performing file replacements, make the `oldString` as short and contextually unique as possible to avoid whitespace/indentation mismatches.
* **Edit Failures Fallback**: If a targeted edit fails multiple times due to indentation or complex structure, fall back to replacing the entire containing function/class rather than risking half-broken replacements.
* **State Recovery**: If stuck or facing multiple unexpected build/typescript failures, stop, verify your assumptions, discard broken changes, and retry the sequence from the ground up with a fresh approach.
* **Verify Commands**:
  - Run local development: `npm run dev`
  - Run linting: `npm run lint`
  - Run full compilation verification: `npm run build`
