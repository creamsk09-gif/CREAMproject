# KoupreyPlus API contract guidance

The supplied project brief does not define canonical endpoint paths or payload
schemas. Discover them from the Express routers, controllers, frontend API
client, and tests before proposing changes.

## Contract record

For each affected endpoint, record:

| Field | Value |
| --- | --- |
| Method and path | Discovered or explicitly proposed |
| Caller | Citizen, staff, admin, or public |
| Authentication | Existing session/token mechanism |
| Authorization | Role, ownership, tenant, or resource rule |
| Input | Path, query, body, and file schema |
| Success | Status and response shape |
| Errors | Stable status, code, and safe message |
| Side effects | Records, files, jobs, audit events |
| Idempotency | Duplicate/retry behavior |

## Integration rules

- Use the frontend's configured `VITE_API_URL`; do not hard-code port `3000`.
- Preserve the existing response envelope and error middleware.
- Validate requests server-side even when the React form validates them.
- Define bounded pagination and stable sorting for admin lists.
- Return permission-safe `404`/`403` behavior consistent with the project.
- Keep mock and OpenAI modes contract-compatible for AI endpoints.
- Never return provider secrets, stack traces, filesystem paths, or internal
  document content in errors.
