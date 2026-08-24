# KoupreyPlus data model guidance

Use Prisma as the schema source of truth. Inspect `schema.prisma`, migrations,
seed scripts, services, and tests before naming or changing models.

## Modeling checklist

- Identify the owner and visibility scope of every municipal record.
- Model citizen, staff, and admin roles according to the existing auth design;
  do not create parallel role sources.
- Add explicit relations and deletion behavior.
- Add uniqueness rules for externally meaningful identifiers.
- Add indexes for actual list, lookup, tracking, and dashboard queries.
- Represent workflow status with constrained values and documented transitions.
- Record created/updated times and actor/audit data where accountability matters.
- Store file metadata and access scope separately from file bytes.
- Keep AI draft/output fields distinguishable from confirmed user data.

## Change procedure

1. Inspect current models and query patterns.
2. Design the smallest backward-compatible change.
3. Generate a named Prisma migration.
4. Inspect the SQL before applying it.
5. Update seed/factory data with synthetic values.
6. Test relation, uniqueness, default, authorization, and rollback behavior.

Local SQLite behavior may differ from the production database. Call out
database-specific assumptions before release.
