# Threat model

**Status:** Draft. System level. Each feature adds its own rows when it is designed.
**Method:** data flow diagram plus STRIDE (Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege).

## Data flow

```
Shopper's browser ──HTTPS──► Caddy ──┬── /*      ──► Nuxt (apps/web) ──► API for page data
                                     └── /api/*  ──► Express (apps/api)
                                                        │
                       ┌────────────────────────────────┼─────────────────────────────┐
                       ▼                ▼               ▼              ▼              ▼
                  PostgreSQL         Valkey        S3 storage      Stripe         Try-on provider
                  (orders, users,   (sessions,    (product photos  (Checkout,     (paid API or own
                  products,         rate limits,   public; shopper  webhooks)      GPU worker)
                  measurements)     queues)        photos private)
                                                                        ▲
                                     Affiliate networks ── feeds ──► API (daily import)
```

**Trust boundaries:** browser ↔ Caddy; Caddy ↔ apps; API ↔ each outside service (Stripe, try-on provider, affiliate networks, email); admin ↔ API.

## STRIDE: system level

| Threat | Example | Control | Status |
|---|---|---|---|
| **S**poofing | Someone signs in as a shopper or admin | Session auth (ADR 0002), Argon2id, rate limits, TOTP for admins | M2 |
| **S**poofing | Fake Stripe webhook marks an order paid | Webhook signature check, event processed once | M3 |
| **T**ampering | Shopper changes the price in the request | Prices and totals computed on the server only | M3 |
| **T**ampering | Cross-site request changes account data | Origin check on all changes, SameSite cookies | Done (MR-01) |
| **T**ampering | Poisoned affiliate feed (script in title, bad links) | Zod validation on import, output escaping, links only to the network's tracking domain | M4 |
| **R**epudiation | Admin denies issuing a refund or changing stock | Audit log of every admin action with who and when | M3 |
| **I**nformation disclosure | Another shopper's order or photo by changing an id (IDOR) | Ownership checks on every request, 404 for others' resources, access-control tests | M2 onward |
| **I**nformation disclosure | Shopper photos leak from storage | Private bucket, short-lived signed links, deletion after use | M5 |
| **I**nformation disclosure | Stack traces or secrets in errors and logs | Central error handler, log rules | Done (MR-01) |
| **D**enial of service | Bot floods try-on and runs up the AI bill | Account required, per-user limits, daily budget cap, queue concurrency limit, kill switch | M5 |
| **D**enial of service | Bots hold stock in checkout | Reservation expires with the Checkout Session, limits per session | M3 |
| **E**levation of privilege | Shopper reaches admin routes | Role checks on the server for every admin route, tested | M2 |
| **E**levation of privilege | Malicious package in the supply chain | Install scripts blocked, exact versions, Dependabot cooldown, npm audit, Semgrep | Done (MR-01) |

## Open risks

- Try-on provider data processing location and terms: checked in the Sprint 0 spike.
- Licence of the human parser used by FASHN VTON v1.5: checked in the spike.
