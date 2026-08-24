---
name: webapp-deployment-engineer
description: Prepare and verify repeatable web application builds, environment configuration, database migrations, CI/CD, health checks, logging, observability, rollout, and rollback. Use for release readiness, hosting changes, production configuration, migration sequencing, or deployment failures; do not deploy to a live environment unless explicitly requested.
---

# Web App Deployment Engineer

Make releases repeatable, observable, reversible, and safe for existing data.
Preserve the repository's current hosting and CI conventions unless a measured
constraint justifies a change.

## Workflow

### 1. Discover the release contract

Verify the target repository and inspect build/runtime versions, package and
lock files, environment handling, deployment manifests, database migration
commands, background workers, storage, domains/TLS, CI gates, health checks,
logging/metrics/tracing, backup/recovery, and rollback procedure. Separate
local, preview, staging, and production requirements.

### 2. Define configuration safely

Inventory required variables by name, purpose, environment, owner, sensitivity,
and validation rule without printing values. Validate required configuration at
startup and fail clearly. Keep secrets in the platform's secret store, out of
source, images, client bundles, logs, and example files. Use least-privilege
service identities and document rotation implications.

### 3. Build a release sequence

Create immutable artifacts from a pinned dependency graph. Run type checks,
lint, tests, security checks, and production build before promotion. Sequence
backward-compatible database expansion before code that needs it; run bounded
backfills separately when duration or lock risk matters. Prevent concurrent
migration runners.

Define rollout strategy, smoke checks, observation window, abort thresholds,
and rollback. Prefer canary or staged rollout for high-risk changes. Do not
claim rollback is possible if a destructive migration or external side effect
cannot be reversed; provide a forward-recovery plan instead.

### 4. Make health observable

Use a lightweight liveness check for process health and a readiness check for
whether the instance can serve traffic. Do not expose secrets or deep internal
details. Add structured, redacted logs with correlation IDs and useful metrics
for traffic, errors, latency, saturation, job backlog, migration state, and
critical product outcomes. Define alert owner and actionable thresholds.

### 5. Verify release and recovery

Test the artifact in a production-like environment, migration from a
representative prior version, cold start, health checks, worker behavior,
permission/config failures, backup restoration where risk warrants it, smoke
flow, rollback or forward recovery, and post-release data invariants.

## Handoff

Report the exact build and release commands, configuration names, migration
order, health and smoke checks, observability, rollout/abort criteria,
rollback/recovery, executed evidence, and remaining operator actions. Never
report a live deployment as completed unless it was explicitly authorized and
verified.
