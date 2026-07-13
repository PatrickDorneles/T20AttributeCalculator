# Agents Guide

This document provides context and guidelines for AI agents working on the T20 Attribute Calculator project.

## Project Context
T20AC is a character attribute calculator for the Tormenta 20 TTRPG. For more details, see [Project Context](docs/context.md).

## Operational Workflow
All development MUST strictly follow the **Feature Workflow**. Skipping any step is prohibited unless explicitly authorized by the user.

### Mandatory Sequence:
1. **Research & Plan**: Analyze the requirement and provide a detailed implementation plan using the **Planning Template**.
2. **Approval**: Wait for the user to approve the plan before writing any code.
3. **Implementation**: Execute the approved plan.
4. **Verification**: Run `npm run lint` and `npm run build` to ensure no regressions.
5. **Review**: Present the changes to the user and wait for their review/approval.
6. **Finalize**: Commit and push only after final approval.

**Branching Rule**: 
- Create a feature branch for all non-trivial tasks.
- Small, localized changes (e.g., fixing a typo, updating a single label) may be done on `main` if the user agrees, but MUST still follow steps 1-6.

### Planning Template
Every "Research & Plan" step must include:
- **Goal**: A concise description of what needs to be achieved.
- **Analysis**: Exploration of the current state and why the change is necessary.
- **Proposed Changes**: A specific list of files to be modified and the logic to be implemented.
- **Verification Plan**: How the change will be verified (commands, specific test cases).

### Guardrails
- **NEVER** commit or push changes directly to `main` without explicit user approval after a review.
- **ALWAYS** run `npm run build` after any modification to types or core logic.
- **ALWAYS** ensure new strings are added to both `en.json` and `pt-BR.json`.
- **NEVER** stop work in the middle of a conceptual unit of work.
- **NEVER** use the `any` type. The project must remain fully type-safe. Use generics, union types, or unknown if the type is truly dynamic.

### Discovery-to-Doc Loop
If during the course of a task you discover an architectural pattern, a project quirk, or a hidden dependency that is not documented in `docs/context.md` or `AGENTS.md`, you MUST proactively suggest an update to these documents to help future agents.

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
