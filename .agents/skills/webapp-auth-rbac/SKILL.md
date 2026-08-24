---
name: webapp-auth-rbac
description: Design, implement, and test web authentication, registration, sessions or tokens, account recovery, role and permission models, resource ownership, and tenant isolation. Use when identity or authorization changes affect routes, APIs, records, administration, or sensitive actions.
---

# Web App Auth and RBAC

Authentication establishes identity; authorization decides whether that
identity may perform a specific action on a specific resource. Enforce both on
the server and fail closed.

## Workflow

### 1. Discover the identity system

Verify the target repository and inspect its auth provider, session or token
storage, middleware, password policy, email/phone verification, recovery,
role/permission representation, tenant and ownership rules, privileged admin
flows, audit events, and tests. Extend existing mechanisms instead of adding a
parallel auth stack.

### 2. Define an authorization matrix

For each action record the actor, authentication state, role or capability,
resource relationship, tenant boundary, allowed fields, decision point, denial
behavior, and required audit event. Prefer explicit capabilities and
resource-level predicates over scattered role-name checks. Treat client-side
route guards as UX only.

Prevent users from assigning their own role, owner, tenant, verification, or
approval fields. Require stronger re-authentication or multi-factor controls
for high-impact actions when supported by the product requirements.

### 3. Implement secure lifecycle behavior

- Use the established provider and vetted password hashing; never invent
  cryptography.
- Prefer secure, HttpOnly, SameSite cookies for browser sessions when compatible
  with the stack; protect state-changing cookie requests against CSRF.
- Rotate session identifiers at sign-in and privilege changes; revoke or bound
  sessions after password reset, account disablement, or role removal.
- Use short-lived, single-purpose, single-use recovery or verification tokens;
  store recoverable secrets safely and avoid account enumeration.
- Rate-limit sign-in, registration, recovery, and verification without creating
  an easy denial-of-service path.
- Return safe, consistent errors and never log credentials, tokens, or session
  values.

### 4. Enforce at every server boundary

Authorize the requested action after authentication and before revealing or
mutating resource data. Scope queries by owner/tenant so missing and forbidden
records cannot leak existence. Recheck authorization in jobs, file downloads,
server actions, APIs, and admin tools; do not trust claims or roles supplied by
the client.

### 5. Test the matrix

Cover anonymous, inactive/unverified, allowed role, wrong role, wrong owner,
wrong tenant, stale/revoked session, privilege change, recovery-token replay,
CSRF where applicable, and audit evidence. Include at least one direct API test
that bypasses the UI.

## Handoff

State the identity flow, authorization matrix, session/token lifecycle,
protected surfaces, audit events, tests run, and any provider configuration the
operator must supply.
