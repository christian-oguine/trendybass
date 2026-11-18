# ADR 0001: Separate web and API

**Status:** Accepted, November 2026.

## Context

Trendybass needs server-rendered pages for SEO and a back end that handles payments, stock, AI jobs and personal data. The founder's other project, Kotly, first tried one Nuxt app with the API inside it and then moved to two apps (Kotly ADR 0003), because the line between front end and back end was hard to see.

## Decision

Two apps in one npm workspace:

- `apps/web/`: Nuxt 4 front end only (pages, components, texts, SEO, server rendering). No database, no secrets, no business rules.
- `apps/api/`: Express 5, Zod and Drizzle. Data layer in `src/db`, one folder per module in `src/modules`, shared helpers in `src/shared`.

The browser sees one address. In production Caddy sends `/api/*` to the API and everything else to Nuxt. Locally Nuxt forwards `/api/*` to the API. Cookies stay on one site, so there is no CORS.

## Reasons

- Clear separation: payment, stock and photo handling are easy to find and review.
- Same pattern as Kotly: code, tests and CI can be reused.
- The API can serve a mobile app or a B2B try-on widget later without changes.

## Costs

- Two processes to run and deploy.
- Types are not shared automatically. A small shared package can be added when needed.
