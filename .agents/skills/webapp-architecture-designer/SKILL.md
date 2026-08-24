---
name: webapp-architecture-designer
description: Inspect an existing web application and design secure, maintainable frontend, backend, API, data, integration, and operational boundaries that fit its current stack. Use for architecture decisions, new vertical slices, major integrations, modernization, scalability work, or architecture decision records; do not use to replace working project conventions without evidence.
---

# Web App Architecture Designer

Choose the smallest architecture that satisfies the product outcome, trust
boundaries, expected load, operability, and change rate. Preserve the
repository's established patterns unless a documented constraint justifies a
change.

## Workflow

### 1. Establish evidence and constraints

Verify the target repository, then inspect manifests, entry points, routes,
module boundaries, API style, persistence, authentication, jobs, integrations,
tests, deployment configuration, and observability. Separate discovered facts
from assumptions and proposed changes.

Capture the user outcome, sensitive data, roles and tenants, availability and
latency expectations, compliance needs, team constraints, budget, migration
limits, and failure tolerance. Do not invent scale requirements.

### 2. Map responsibilities and trust boundaries

Describe the current and proposed request/data flow. Identify:

- browser, server, worker, database, file/object storage, AI provider, and
  third-party boundaries;
- which component is authoritative for each business rule;
- authentication, resource authorization, tenant isolation, validation,
  encryption, audit, and retention boundaries;
- synchronous versus asynchronous work, retry ownership, idempotency, and
  backpressure;
- failure modes, degraded operation, recovery, and user-visible behavior.

Keep privileged decisions and secrets server-side. Minimize sensitive data
collection and movement.

### 3. Compare viable options

When a material choice exists, compare two or three realistic options using
fit with the existing system, delivery risk, security, accessibility impact,
operability, cost, reversibility, and migration complexity. Recommend one and
state why. Prefer a modular monolith or existing deployment shape until
measured constraints justify additional distributed components.

For innovative features, define the user hypothesis and success signal first.
Use a reversible pilot with explicit safety limits before committing to
expensive or irreversible infrastructure.

### 4. Produce an implementation contract

Specify affected modules, public interfaces, records and ownership, key API
contracts, authorization rules, consistency and transaction boundaries,
external dependencies, observability, rollout, rollback, and test seams.
Record important decisions and rejected alternatives in a concise ADR when the
repository uses ADRs or the decision is costly to reverse.

### 5. Validate the design

Walk through the main flow plus unauthenticated, unauthorized, invalid-input,
dependency-failure, duplicate, timeout, concurrency, data-recovery, and
rollback cases. Confirm that every new component has a clear owner and a
testable reason to exist.

## Output

Return discovered constraints, a current/proposed boundary map, the recommended
design, alternatives and tradeoffs, trust boundaries, migration phases,
validation strategy, risks, and unresolved decisions. Do not present a
proposal as repository fact.
