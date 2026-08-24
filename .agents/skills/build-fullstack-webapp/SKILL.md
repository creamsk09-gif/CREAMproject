---
name: build-fullstack-webapp
description: Coordinate end-to-end delivery of a full-stack web application or complete vertical slice across product planning, frontend UI, backend API, data persistence, authorization, and tests. Use when Codex must inspect an existing repository, preserve its conventions, split a feature across layers, sequence work safely, or combine specialized webapp skills into one implementation.
---

# Build Full-Stack Web App

Deliver one coherent vertical slice rather than disconnected frontend, backend,
or database fragments. Preserve the repository's established architecture,
commands, naming, and design language.

## Verify the target workspace

Before inspecting or changing code, confirm that the open workspace matches
the project and stack named in the request. Check repository identity,
framework manifests, and top-level structure. If they do not match:

- Do not borrow entities, routes, schemas, commands, or design tokens from the
  unrelated repository.
- For implementation work, pause and request the correct repository or path.
- For planning-only work, use only the user's supplied facts, label
  undiscovered details, and do not inspect the unrelated repository.

## Workflow

### 1. Establish the project contract

1. Read repository instructions and inspect the smallest set of files that
   reveals the current stack, package manager, scripts, route structure,
   database layer, authentication, testing tools, and deployment target.
2. Treat discovered code and the user's request as authoritative. Do not
   replace working project patterns with a preferred generic stack.
3. Identify the user, job-to-be-done, entry route, success outcome, permission
   boundary, data affected, and failure behavior.
4. If the skill includes app-specific files under `references/`, read
   `project-brief.md` first and confirm it matches the target application. Only
   then read the relevant `routes.md`, `api-contracts.md`, `data-model.md`, or
   `design-system.md`. Never import reference facts into a different app.

### 2. Plan a vertical slice

Use `$webapp-product-planner` when available. Produce a compact plan containing:

- affected user and flow;
- routes/screens and API endpoints;
- records and authorization rules;
- loading, empty, validation, permission, and failure states;
- acceptance criteria observable by a user or test;
- implementation order and known risks.

Prefer the smallest slice that delivers a complete outcome. Separate later
enhancements explicitly.

For an innovative or AI-assisted outcome, include the user hypothesis,
measurable success signal, safety limits, human decision point, and the
cheapest reversible experiment that can disprove the idea.

### 3. Assign layer ownership

- Use `$webapp-architecture-designer` when the change introduces a material
  trust boundary, integration, asynchronous workflow, or costly structural
  decision.
- Use `$webapp-ui-builder` for screens, forms, navigation, accessibility, and
  visible states.
- Use `$webapp-api-builder` for contracts, validation, error mapping,
  filtering, pagination, and server-side boundaries.
- Use `$webapp-data-modeler` for schema, relations, constraints, indexes,
  migrations, retention, and backfills.
- Use `$webapp-auth-rbac` for identity lifecycle, sessions, capabilities,
  resource ownership, tenant isolation, and privileged actions.
- Use `$webapp-ai-feature-builder` for model-assisted behavior, structured
  output, evaluation, privacy, human review, and fallback.
- Use `$webapp-security-reviewer` for sensitive changes, new trust boundaries,
  file handling, AI integrations, administration, or release review.
- Use `$webapp-test-engineer` for the risk-based test matrix and missing
  unit/integration/end-to-end coverage.
- Use `$webapp-deployment-engineer` when configuration, migrations, workers,
  hosting, CI/CD, observability, rollout, or rollback changes.

Do not duplicate business rules independently across layers. Keep the server
authoritative and share schemas/types only when the repository already supports
that pattern.

### 4. Implement in dependency order

Use this default order unless the repository requires another:

1. Confirm the product outcome, trust boundaries, and API/data contracts.
2. Add backward-compatible schema and migration changes.
3. Implement server validation, resource authorization, business logic, and
   audit behavior.
4. Implement the UI, accessibility, and all visible async states.
5. Add unit, permission, integration, and failure-path tests.
6. Add or update critical-path end-to-end coverage.
7. Complete security review and fix confirmed in-scope findings.
8. Prepare configuration, observability, rollout, and recovery only when the
   change requires them.

For AI features, preserve a deterministic mock/fallback path. Never make the
core user flow unusable because an AI provider is unavailable.

### 5. Validate proportionally

Run the repository's existing formatter, type checker, linter, unit tests,
integration tests, production build, and relevant end-to-end tests. Fix
failures caused by the change. Do not hide failures by weakening checks.

Verify manually from code and tests that:

- unauthenticated and unauthorized access fails closed;
- validation errors are actionable;
- data mutations are atomic or safely recoverable;
- loading, empty, success, and failure states exist;
- sensitive values are not logged or committed;
- personal data is minimized, access-scoped, and retained only as required;
- file and AI inputs/outputs remain untrusted until validated;
- provider or dependency failure has a safe, usable fallback;
- the implementation satisfies every acceptance criterion.

### 6. Hand off clearly

Lead with what now works. List material files or modules changed, validations
run, configuration the user must supply, and remaining risks. Distinguish
completed behavior from mock, deferred, or production-only behavior.

## Guardrails

- Do not invent routes, database fields, environment variables, or production
  credentials when repository evidence is absent.
- Do not put project-specific names or routes into generic sub-skills.
- Do not perform broad refactors unless necessary for the requested slice.
- Do not claim a layer is complete until its integration boundary is tested.
- Preserve user changes and unrelated dirty-worktree files.
