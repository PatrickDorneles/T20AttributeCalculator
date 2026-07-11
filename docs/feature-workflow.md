# Feature Workflow

To ensure quality and consistency, all new features should follow this workflow:

1. **Checkout to feature branch**: Create a new branch for the feature (except for minor changes/fixes).
2. **Research**: Understand the requirements, explore the codebase, and identify affected areas.
3. **Plan**: Design the implementation and document the approach.
4. **Ask for approval**: Present the plan to the reviewer/owner for approval.
5. **Implement**: Write the code according to the approved plan.
6. **Typecheck and Build**: Run type-checking and build commands to ensure no breaking changes.
7. **Lint and Prettier**: Run linting and formatting tools.
8. **Fix Issues**: If any issues are found in the previous steps, fix them and repeat steps 6 and 7.
9. **Ask for review and approval**: Submit the changes for review.
10. **Finalize**: If approved, commit and push the changes. Otherwise, return to the Implementation step.
11. **Merge**: Ask for merge or continue with other implementations.
