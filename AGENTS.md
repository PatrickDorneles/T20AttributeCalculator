# Agents Guide

This document provides context and guidelines for AI agents working on the T20 Attribute Calculator project.

## Project Context
T20AC is a character attribute calculator for the Tormenta 20 TTRPG. For more details, see [Project Context](docs/context.md).

## Operational Workflow
All development must follow the **Feature Workflow** defined in [docs/feature-workflow.md](docs/feature-workflow.md).

### Summary of Feature Workflow:
1. Checkout feature branch.
2. Research & Plan.
3. Approval.
4. Implementation.
5. Typecheck, Build, Lint, and Prettier.
6. Review & Approval.
7. Commit & Push.
8. Merge.

## Documentation Structure
- `/docs/context.md`: General project overview and technology stack.
- `/docs/feature-workflow.md`: Step-by-step guide for implementing new features.
- `/docs/adr/`: Architectural Decision Records documenting key design choices.
- `/docs/tasks.md`: Tracking of completed and pending tasks.

## Development Guidelines
- Follow existing TypeScript and Tailwind CSS patterns.
- Maintain internationalization support using `next-intl`.
- Ensure all new logic is type-safe and validated using Zod where appropriate.
- Run `npm run lint` and `npm run build` before considering a task complete.
- Avoid stopping work in the middle of a task; ensure a conceptual unit of work is complete before finishing.
- Componentize code whenever styles require it, or when component logic can be separated without hard tradeoffs.
- When stuck or unable to progress, retry the last sequence of steps from the ground up, taking into account what has been accomplished and where previous attempts failed, to find a new path to completion.
