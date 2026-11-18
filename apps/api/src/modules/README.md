One folder per module: `routes.ts` (HTTP), `schemas.ts` (Zod), service files (business rules). Tests go in `tests/<module>/`.

Planned: `catalogue` (M1), `auth` and `account` (M2), `cart`, `orders`, `payments` (M3), `feeds` (M4), `fit` and `tryon` (M5), `recs` (M6). Admin routes live in the module they manage.
