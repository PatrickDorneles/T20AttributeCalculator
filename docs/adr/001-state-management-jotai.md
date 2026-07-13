# ADR 001: State Management with Jotai

## Status
Accepted

## Context
The application requires a global state to manage the active character, a list of saved characters, and user configuration settings. The state needs to be reactive, easy to update from deeply nested components (like attribute inputs), and persist across browser sessions.

## Decision
We have chosen **Jotai** as the primary state management library.

## Rationale
1. **Atomic State**: Jotai's atomic approach allows us to split state into small, independent pieces (atoms), reducing unnecessary re-renders compared to a single large store.
2. **Simplicity**: The API is minimal and feels like `useState`, making it easy for developers and agents to understand and maintain.
3. **Persistence**: `atomWithStorage` provides a built-in, seamless way to synchronize state with `localStorage`, which is essential for our character management system.
4. **Low Boilerplate**: Unlike Redux, Jotai requires almost no boilerplate to set up a new piece of state.

## Consequences
- **Dependency**: The project now depends on `jotai` and `jotai/utils`.
- **State Locality**: We must be careful not to over-atomize state to the point where managing dependencies between atoms becomes complex.
