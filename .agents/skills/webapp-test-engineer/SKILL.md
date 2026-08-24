---
name: webapp-test-engineer
description: Design and implement risk-based automated tests for full-stack web applications. Use when adding or repairing unit, integration, API, component, permission, database, mock-provider, or end-to-end coverage; validating a feature before release; reproducing regressions; or defining a practical test matrix for a vertical slice.
---

# Web App Test Engineer

Test the behavior and risk boundary, not implementation trivia. Preserve the
repository's existing runner, fixtures, factories, selectors, and command
structure.

## Verify the target workspace

Confirm that the open repository matches the project and stack named in the
request before deriving test cases or commands from it. If it does not match,
do not reuse its entities, authorization model, fixtures, runners, selectors,
or scripts. For implementation, request the correct repository or path. For a
planning-only test matrix, use only user-supplied facts and mark unknown
contracts and tooling explicitly.

## Workflow

### 1. Build a risk map

Identify:

- primary user outcome;
- business rules and irreversible mutations;
- trust boundaries and roles;
- validation and parsing;
- persistence and transactions;
- external services, files, and AI providers;
- concurrency, retries, and duplicate actions;
- responsive or accessibility-critical interactions.

Rank scenarios by impact and likelihood. Spend end-to-end coverage on critical
cross-layer flows; keep combinatorial cases in faster layers.

### 2. Choose the lowest effective layer

- **Unit:** pure rules, normalization, calculations, schemas, permission
  predicates, and deterministic adapters.
- **Integration/API:** routing, validation, auth, database behavior,
  transactions, error mapping, and audit events.
- **Component:** visible state transitions, form behavior, keyboard interaction,
  and API error recovery.
- **End-to-end:** one or more business-critical journeys across real layer
  boundaries.

Do not duplicate the same assertion at every layer.

### 3. Create a focused matrix

Cover as applicable:

| Category | Minimum evidence |
| --- | --- |
| Happy path | Intended outcome persists and is visible |
| Validation | Boundary, missing, malformed, and conflicting values |
| Permission | Anonymous, wrong role, wrong owner/tenant, allowed role |
| Failure | Dependency failure, retry, rollback, and useful message |
| State | Loading, empty, success, stale data, duplicate submission |
| Data | Migration/defaults, relations, uniqueness, and indexes |

For AI features, use deterministic mock responses with the same validated shape
as production. Test provider timeout, invalid output, and fallback behavior.

### 4. Write durable tests

- Assert externally observable behavior.
- Use stable roles, labels, test IDs, or routes rather than fragile DOM
  position.
- Control time, randomness, IDs, and provider responses.
- Isolate test data and make cleanup deterministic.
- Avoid arbitrary sleeps; wait for concrete state.
- Keep fixtures synthetic and free of production personal data.
- Make failures explain which contract broke.

### 5. Run and diagnose

Run the narrowest relevant tests first, then the full quality gates requested by
the repository. Confirm a regression test fails before the fix when practical.
Do not weaken assertions, skip tests, or increase timeouts to conceal a defect.

## Completion report

State which risks are covered at each layer, commands run, results, remaining
gaps, and any environment-dependent test that was not executed.
