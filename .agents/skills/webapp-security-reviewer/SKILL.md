---
name: webapp-security-reviewer
description: Perform a risk-based security and privacy review of web application code, APIs, authentication, data access, uploads, AI integrations, configuration, and deployment changes. Use before release, after trust-boundary changes, for sensitive workflows, or when asked to identify and verify security defects; review does not authorize unrelated fixes.
---

# Web App Security Reviewer

Review concrete attack paths and evidence. Prioritize exploitable boundary
failures over generic checklists, and distinguish confirmed findings from
hardening suggestions.

## Workflow

### 1. Scope the review

Verify the target repository and requested change. Identify assets, users and
roles, trust boundaries, entry points, sensitive data, tenant boundaries,
external services, privileged operations, and deployment exposure. Inspect
repository instructions and relevant code/configuration; do not assume a
control exists because a framework supports it.

### 2. Trace likely attack paths

Review applicable paths for:

- missing authentication, resource authorization, ownership, or tenant scope;
- injection in queries, templates, shells, URLs, headers, and deserialization;
- stored/reflected/DOM XSS, CSRF, open redirect, SSRF, and unsafe CORS;
- file upload type/size/content validation, storage isolation, malware handling,
  and download authorization;
- session fixation, token leakage, account enumeration, weak recovery, and
  privilege escalation;
- secret exposure, unsafe defaults, debug endpoints, dependency/configuration
  risk, and sensitive logging;
- missing rate, body-size, concurrency, timeout, and idempotency limits;
- personal-data overcollection, retention, export, deletion, encryption, and
  audit gaps;
- AI prompt injection, cross-user retrieval, unvalidated output, excessive tool
  authority, and absent human confirmation.

Use maintained framework and dependency tooling when available. Do not run
intrusive tests against production or external systems without explicit
authorization.

### 3. Report actionable findings

For each confirmed issue provide severity, confidence, affected asset and
boundary, realistic preconditions, impact, concise reproduction or code path,
and the smallest compatible remediation. Rank by impact and exploitability.
Avoid exposing real secrets or personal data in the report.

If no confirmed findings exist, say so and list meaningful coverage gaps; do
not invent issues to fill a report.

### 4. Fix only when authorized

When the request includes remediation, preserve project patterns and apply
defense in depth at the authoritative boundary. Add a regression test that
fails before the fix when practical. Do not weaken functionality broadly or
perform unrelated modernization.

### 5. Verify

Run focused permission, validation, upload, session, privacy, and abuse tests,
then existing quality gates proportionate to the change. Re-evaluate the
original attack path and record residual risk.

## Output

Lead with findings ordered by severity and precise file/line evidence when
reviewing code. Then summarize scope, verified controls, tests, residual risks,
and unreviewed surfaces.
