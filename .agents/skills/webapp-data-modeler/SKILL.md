---
name: webapp-data-modeler
description: Design and implement relational or document data models, constraints, indexes, migrations, retention rules, and safe seed data inside an existing web application. Use for new entities, relation changes, query performance, tenant isolation, audit/history data, or production-safe schema evolution.
---

# Web App Data Modeler

Make invalid states difficult to store, keep access boundaries explicit, and
evolve production data without silent loss.

## Workflow

### 1. Inspect the existing data contract

Verify the target repository and identify the database, ORM/query layer,
migration tool, naming and ID conventions, tenancy model, timestamps,
soft-delete/history approach, transaction patterns, and representative queries.
Treat deployed migrations as append-only unless the project explicitly permits
another workflow.

### 2. Model behavior, ownership, and sensitivity

For each record define its purpose, owner or tenant, lifecycle, cardinality,
required versus optional fields, legal states and transitions, uniqueness,
source of truth, retention/deletion rule, and sensitivity. Collect only fields
needed for a stated outcome. Avoid storing derived or AI-generated values as
facts without provenance and review status.

Use database constraints for durable invariants: primary and foreign keys,
non-null, uniqueness, checks, and appropriate delete behavior. Use transactions
for multi-record invariants. Keep audit or immutable event records append-only
when traceability is required.

### 3. Design from access patterns

List the reads and writes that matter, including filters, ordering, pagination,
joins, tenant/ownership predicates, and expected volume. Add the smallest
indexes justified by those patterns; prefer composite index order that matches
real predicates and sorting. Consider uniqueness scoped to tenant and stable
cursor ordering. Do not claim performance without query-plan or workload
evidence.

### 4. Plan a safe migration

Use an expand/migrate/contract sequence when compatibility or large tables
matter:

1. Add backward-compatible structures and indexes.
2. Deploy code that can tolerate old and new states.
3. Backfill in bounded, restartable batches with progress and error visibility.
4. Verify counts, nulls, invariants, permissions, and representative queries.
5. Enforce constraints or remove obsolete structures only after consumers have
   moved and rollback requirements are satisfied.

Avoid destructive type changes or long blocking operations without a measured
plan, backup/recovery path, and authorization. Never use production personal
data as seed or fixture data.

### 5. Verify

Test defaults, constraints, relations, tenant isolation, cascade behavior,
transactions, rollback, migration from a representative prior schema, and key
query plans where risk warrants it. Confirm data is excluded from logs and
exports unless explicitly required.

## Handoff

Report the model, invariants, access patterns and indexes, migration and
rollback sequence, verification evidence, retention implications, and any
operational backfill step.
