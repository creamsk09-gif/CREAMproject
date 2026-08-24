# KoupreyPlus route responsibilities

Use this map as a starting point. Confirm each route in the repository before
editing or adding it.

| Route | Primary user | Responsibility | Main skill ownership |
| --- | --- | --- | --- |
| `/login` | All users | Authenticate and create a session | auth/RBAC |
| `/register` | New users | Create an allowed account with validation | auth/RBAC + API + UI |
| `/citizen/complaints/new` | Citizen | Submit a complaint and optional AI-assisted draft | UI + API + AI |
| `/citizen/track` | Citizen | Track only complaints the caller may access | UI + API + authorization |
| `/admin` | Authorized staff/admin | Operational dashboard and aggregates | UI + API + role protection |
| `/admin/staff` | Admin | Staff CRUD, roles, and audit history | API + RBAC + audit |
| `/admin/e-office` | Authorized staff | Document processing and AI-assisted work | UI + API + AI + file security |

## Cross-route rules

- Enforce permissions on the backend for every protected resource.
- Do not infer citizen ownership from a client-provided identifier.
- Keep AI output editable and visibly distinguish it from user-confirmed data.
- Implement loading, empty, validation, denied, and provider-failure states.
- Add audit events for staff, role, and sensitive document mutations.
