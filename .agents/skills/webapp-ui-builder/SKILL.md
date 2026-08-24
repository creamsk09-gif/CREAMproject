---
name: webapp-ui-builder
description: Build and refine production-quality web application interfaces within an existing frontend stack and design system. Use for responsive screens, forms, dashboards, navigation, tables, detail views, loading/error/empty states, accessibility, frontend validation, or wiring UI to an existing API while preserving repository conventions.
---

# Web App UI Builder

Implement the requested user outcome inside the project's existing component,
styling, routing, state, form, and data-fetching patterns.

## Verify the target workspace

Confirm that the open repository matches the project and frontend stack named
in the request. If it does not match, do not reuse its components, routes,
tokens, entities, or commands. For implementation, request the correct
repository or path. For planning-only work, rely on user-supplied facts, mark
unknown design-system details, and avoid inspecting the unrelated repository.

## Workflow

### 1. Discover before designing

Inspect the target route, nearby screens, reusable components, tokens, layout,
form conventions, API client, and tests. Reuse established patterns and
dependencies. Do not replace the design system or add a UI library for one
screen.

### 2. Define the screen contract

Confirm the user, task, required information hierarchy, primary action,
secondary actions, permission state, and responsive behavior. Identify every
state before implementation:

- initial/loading;
- ready with data;
- empty;
- field validation;
- request failure and retry;
- success/confirmation;
- disabled or read-only;
- unauthorized/not found when applicable.

### 3. Build for real content

- Use realistic copy and data lengths.
- Keep forms semantically labeled and show Thai or project-locale errors close
  to the relevant field.
- Prevent duplicate submissions and preserve safe user input on failure.
- Make the primary action obvious and destructive actions distinct.
- Keep dashboards scannable; avoid decorative metrics without decisions.
- Make tables usable at narrow widths through prioritization, wrapping, or a
  deliberate alternate layout.

### 4. Meet accessibility and interaction requirements

- Use semantic HTML before ARIA.
- Provide visible keyboard focus and logical tab order.
- Associate labels, descriptions, and errors with controls.
- Expose async status through appropriate live regions.
- Maintain accessible contrast and touch target sizes.
- Respect reduced motion.
- Do not rely on color alone for status.

### 5. Integrate safely

Treat server validation and authorization as authoritative. Map API errors to
stable UI states without exposing stack traces. Abort or ignore stale requests
where race conditions are possible. Do not place secrets or privileged logic in
the client.

### 6. Validate

Run the frontend type checker, linter, component/unit tests, and production
build. Add focused tests for the primary interaction, validation, and failure
recovery. Use browser testing when requested or when repository instructions
require it.

## Completion checklist

- Match the existing visual language.
- Support phone, tablet, and desktop breakpoints relevant to the project.
- Implement loading, empty, error, and success states.
- Support keyboard and screen-reader use.
- Preserve server-side security boundaries.
- Avoid unrelated redesigns and speculative state.
