---
name: webapp-ai-feature-builder
description: Build AI-assisted web application features such as drafting, extraction, summarization, classification, matching, or validation with structured outputs, privacy controls, evaluation, human oversight, and deterministic fallback. Use when model behavior participates in a product workflow; not for ordinary deterministic features.
---

# Web App AI Feature Builder

Use AI only where uncertain model behavior creates measurable user value.
Keep business authorization, durable validation, and final high-impact
decisions outside the model.

## Workflow

### 1. Define the AI contract

Verify the target repository and identify the user task, input source, expected
structured output, confidence or uncertainty representation, prohibited
actions, latency/cost budget, supported languages, success metric, and manual or
deterministic fallback. State what happens when the provider is slow, wrong,
unavailable, or returns invalid output.

For innovative ideas, begin with a narrow hypothesis and an evaluation set.
Prefer assistive recommendations that the user can inspect and edit before
automating irreversible decisions.

### 2. Minimize and protect data

Classify inputs before sending them to a provider. Remove unnecessary personal,
secret, authentication, tenant, and document metadata. Confirm provider,
region, retention, training-use, and logging requirements from project
configuration rather than assumptions. Do not send data across a new external
boundary without user authorization and an explicit product requirement.

Treat user files, retrieved text, and model output as untrusted. Isolate prompt
instructions from data, limit tools and retrieval scope, and require normal
authorization on every referenced resource.

### 3. Build a bounded pipeline

Separate input validation, redaction, prompt/version selection, provider call,
schema parsing, semantic validation, policy checks, business validation, human
confirmation, and persistence. Constrain output with the provider's structured
format when available, but still validate it server-side. Record provenance
needed for review without logging sensitive prompt content by default.

Use timeouts, cancellation, bounded retries with jitter, concurrency limits,
cost caps, and idempotency where retries can duplicate work. Never silently
substitute fabricated content for a provider failure.

### 4. Design user trust and fallback

Label generated or extracted content, preserve the original source, show
uncertainty and source locations when available, allow correction, and require
confirmation before submission or high-impact mutation. Provide a manual flow,
saved draft, queued retry, or deterministic alternative so provider failure
does not block the core task.

### 5. Evaluate and test

Create a representative, privacy-safe evaluation set covering languages,
format variation, ambiguous cases, unsafe instructions, prompt injection,
provider timeout, malformed output, and fallback. Measure task-appropriate
quality plus false-positive/negative cost, latency, and cost. Use deterministic
provider mocks in automated tests and keep production rollout observable and
reversible.

## Handoff

Report the AI contract, data sent externally, validation and human-review
boundary, fallback, evaluation results, provider configuration, monitoring,
and known failure modes. Do not claim that a prompt alone makes a feature safe.
