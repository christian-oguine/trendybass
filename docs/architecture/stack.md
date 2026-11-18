# Stack and when each package arrives

Packages are added in the sprint that first uses them. A package that is not used yet is only attack surface. Versions are exact (`save-exact=true`) and install scripts are blocked (`ignore-scripts=true`).

## Installed in MR-01

| Where | Package | Use |
|---|---|---|
| web | nuxt, vue, vue-router | Front end with server rendering |
| web | @nuxt/ui, tailwindcss, @iconify-json/lucide | Components, styling, icons (bundled, no Iconify API calls) |
| web | @nuxtjs/i18n | Language folders in URLs (`/en/...`) |
| web | @nuxtjs/seo | Sitemaps, robots, schema.org, canonical URLs |
| web | nuxt-security | CSP with nonces, HSTS, security headers |
| web | @nuxt/image | Responsive images |
| api | express, helmet, cookie-parser | HTTP server and security headers |
| api | zod | Input validation |
| api | drizzle-orm, postgres, drizzle-kit | Database access and migrations |
| api (dev) | vitest, supertest | Tests |
| both (dev) | eslint, typescript, vue-tsc and plugins | Lint and type checks |

## Added later

| Milestone | Package or service | Use |
|---|---|---|
| M1 Catalogue | sharp, multer | Product photo upload, resize and clean-up |
| M1 Catalogue | S3 client (EU storage) | Product photos |
| M1 Catalogue | @playwright/test | End-to-end tests |
| M2 Accounts | @node-rs/argon2, iovalkey | Passwords, sessions cache, rate limits |
| M2 Accounts | Resend (EU) | Account and order emails |
| M3 Checkout | stripe | Checkout Sessions, webhooks, refunds |
| M4 Affiliate | bullmq | Daily feed imports |
| M5 Try-On | bullmq, provider adapters | Try-on queue |
| M6 Recommendations | Marqo-FashionSigLIP (Python, in `workers/`) | Image embeddings into pgvector |
| M6 Self-hosted try-on | FASHN VTON v1.5 (Python, `workers/tryon/`) | Self-hosted try-on provider |

## Local services (docker compose)

| Service | Image | Port on localhost |
|---|---|---|
| PostgreSQL 17 + pgvector | `pgvector/pgvector:pg17-bookworm` | 5436 |
| Valkey 8 | `valkey/valkey:8-alpine` | 6381 |
| Mailpit (local inbox) | `axllent/mailpit:v1.27` | 8026 |

Website 3001, API 4001. Kotly uses 3000, 4000, 5435, 6380 and 8025, so both projects can run at once.
