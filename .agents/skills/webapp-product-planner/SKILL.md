---
name: webapp-product-planner
description: Turn web application requirements into an implementation-ready product plan covering users, jobs, user flows, routes, permissions, data, failure states, acceptance criteria, milestones, and dependencies. Use before building a new web app, adding a multi-layer feature, clarifying an ambiguous request, or breaking a large web project into safe vertical slices.
---

# Web App Product Planner

Convert a request into observable outcomes and a build sequence. Inspect the
existing repository before proposing structures that may already exist.

## Verify the target workspace

Confirm that the open repository matches the project and stack named in the
request before using it as evidence. If it does not match, do not import its
routes, domain names, architecture, or commands. For a planning-only request,
plan from user-supplied facts and mark unknowns explicitly; for implementation,
request the correct repository or path.

## Planning workflow

### 1. Extract the product contract

Identify:

- primary and secondary users;
- the problem and desired outcome;
- entry point and successful completion;
- data read, created, changed, or exported;
- permission and privacy boundaries;
- integrations and external dependencies;
- the riskiest assumption and measurable success signal;
- explicit non-goals and constraints.

Ask only for information that cannot be discovered and would materially change
the result. Otherwise state a reversible assumption.

For innovation work, distinguish the underlying user problem from a proposed
technology. Define a small, reversible experiment and evidence threshold before
committing to a costly architecture. Include safety, privacy, accessibility,
and human-oversight constraints as product requirements, not later polish.

### 2. Map the user flow

Write the main flow as numbered user actions with corresponding system
responses. Add alternate flows for:

- first use or empty data;
- invalid input;
- unauthenticated and unauthorized users;
- partial or external-service failure;
- retries, cancellation, and duplicate submission;
- slow processing and background work.

### 3. Define implementation surfaces

Create a compact matrix:

| Surface | Purpose | Inputs | Outputs | Permission | Failure state |
| --- | --- | --- | --- | --- | --- |

Include only affected screens/routes, API endpoints, jobs, records, and
integrations. Mark discovered existing surfaces separately from proposed ones.

### 4. Write testable acceptance criteria

Use observable Given/When/Then statements or concise equivalent checks. Cover:

- happy path;
- field and business-rule validation;
- role/ownership boundaries;
- loading, empty, success, and failure states;
- persistence and refresh behavior;
- responsive and keyboard behavior for UI work;
- audit or trace requirements for sensitive mutations.
- data minimization, retention, and recovery behavior where personal or
  sensitive information is involved;
- AI uncertainty, user correction, human confirmation, and deterministic or
  manual fallback where model output affects the flow.

Avoid criteria such as "works correctly" or "looks good."

### 5. Slice and sequence

Divide work by complete user outcome, not by technical layer. For each slice,
state dependencies, risk, validation, and what can be demonstrated. Put
foundational contract or schema changes before consumers.

## Output format

Return:

1. Goal and non-goals
2. Users and permission assumptions
3. Main and alternate flows
4. Surface matrix
5. Acceptance criteria
6. Vertical-slice implementation order
7. Open questions and risks

Keep the plan compact enough that an engineer can implement directly.
