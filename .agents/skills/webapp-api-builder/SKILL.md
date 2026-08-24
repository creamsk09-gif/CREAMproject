---
name: webapp-api-builder
description: Design, implement, and test secure web API endpoints inside an existing backend. Use for REST resources, request/response contracts, validation, authentication and authorization, error handling, pagination, filtering, idempotency, audit events, database integration, or frontend-backend contract changes.
---

# Web App API Builder

Implement APIs using the repository's established router, controller/service,
validation, ORM, error, authentication, and testing patterns.

## Verify the target workspace

Confirm that the open repository matches the project and backend stack named
in the request before treating its code as evidence. If it does not match, do
not import its entities, route conventions, authentication model, database
technology, or test commands. For implementation, request the correct
repository or path. For planning-only work, use user-supplied facts and label
all undiscovered contract details.

## Workflow

### 1. Inspect the existing contract

Read nearby endpoints and determine:

- route and versioning conventions;
- authentication/session mechanism;
- authorization helpers and ownership rules;
- request validation library;
- service/repository boundaries;
- response envelope and error shape;
- pagination/filter syntax;
- transaction and audit patterns;
- test harness and fixtures.

Do not introduce a second convention without a concrete need.

### 2. Specify before coding

Define method, path, caller, permission, path/query/body schema, success status,
response shape, error cases, side effects, idempotency behavior, and audit
event. Reconcile the contract with its UI consumer.

For list endpoints, define stable ordering, maximum page size, filtering rules,
and pagination metadata. For file or AI endpoints, define size/time limits and
safe failure behavior.

### 3. Implement defense in depth

- Authenticate first and authorize the specific resource server-side.
- Validate and normalize all untrusted path, query, header, and body values.
- Reject unknown or ambiguous values where the project convention permits.
- Keep controllers thin; place business rules in the existing service layer.
- Use parameterized ORM/query APIs.
- Use transactions for multi-record invariants.
- Avoid mass assignment and client-controlled ownership or role fields.
- Return stable safe errors; log request identifiers rather than secrets or
  personal content.
- Add rate limiting or idempotency protection where abuse or retries matter.

### 4. Preserve data and integration guarantees

Add migrations for schema changes; do not rely on development-only schema push
in production. Add indexes justified by query patterns. Preserve backward
compatibility unless the user authorizes a breaking change.

For AI-backed routes, validate provider output, provide deterministic mock or
manual fallback behavior, and never let provider output bypass normal business
validation.

### 5. Test the boundary

Add focused integration tests for:

- success and response contract;
- missing/invalid fields and query parameters;
- unauthenticated request;
- wrong role, ownership, or tenant;
- not found without resource-existence leakage;
- duplicate/retry behavior;
- database rollback on failure;
- pagination/filter limits;
- dependency or provider failure.

Run the backend's type checker, linter, tests, and production build.

## Handoff

Report the contract, authorization rule, migration, tests, and any new
environment variable. Never claim an endpoint is secure solely because the UI
hides it.
