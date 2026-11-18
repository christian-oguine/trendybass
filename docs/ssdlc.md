# SSDLC: how we build Trendybass

Trendybass uses a Secure Software Development Lifecycle. Security and privacy are part of every phase of every feature, not a test at the end. A feature does not move to the next phase until it passes that phase's gate.

**Baseline standards:** OWASP ASVS 4.0 Level 2, OWASP Top 10, OWASP API Security Top 10, PCI DSS SAQ A (payments through Stripe Checkout), GDPR, EU AI Act Article 50 (labelling AI images), EU consumer law (14-day withdrawal).

```
 1. Requirements ─► 2. Design ─► 3. Build ─► 4. Verify ─► 5. Release ─► 6. Operate
       │               │            │            │             │              │
   requirements,   data flow,    secure      CI scans,     release       monitoring,
   abuse cases     STRIDE,       coding,     security      checklist     incidents,
                   permissions,  review      tests                       lessons learned
                   DPIA                                                       │
       ▲                                                                      │
       └──────────────────── feedback into the next feature ◄─────────────────┘
```

## 1. Requirements

- Copy [requirements/_template.md](requirements/_template.md) to `requirements/<feature>.md`.
- Write what the feature does, and the security and privacy requirements (map to ASVS where it helps).
- Write **abuse cases**: how would a fraudster, spammer, scraper or curious user misuse it?
- **Gate:** every abuse case has a planned control.

## 2. Design

- Update the data flow and STRIDE table in [security/threat-model.md](security/threat-model.md).
- Update [security/permissions.md](security/permissions.md) if a new action or role appears.
- Add new personal data to [privacy/processing-register.md](privacy/processing-register.md): what, why, legal basis, how long.
- High-risk processing (photos of people, body measurements, payments, profiling) needs a DPIA in [privacy/](privacy/).
- Big or hard-to-undo decisions get an ADR in [decisions/](decisions/).
- **Gate:** every high risk has a mitigation in the design.

## 3. Build

Coding rules:

- `apps/web` is the front end only. No database, no secrets, no business rules. `apps/api` is the back end.
- Every input is validated on the server with Zod. Bad input gets `400 { error: code }`, never a stack trace.
- Every action checks permission and ownership on the server. Another user's resource answers `404`, not `403`.
- Prices, totals, stock and payment status are decided on the server only.
- Changes (POST, PUT, PATCH, DELETE) are only accepted from our own site (origin check).
- No secrets in code. New settings go in `.env.example` with a comment.
- Logs never contain passwords, tokens, card data, photos, body measurements or full addresses.
- New packages: needed now, well maintained, no known high or critical issues, exact version. Install scripts stay blocked.
- Small commits. Before each commit: `npm run lint`, `npm run typecheck`, `npm test`.
- **Gate:** review done with the PR template checklist.

## 4. Verify

Runs in CI on every push and merge request ([.github/workflows/ci.yml](../.github/workflows/ci.yml)):

| Check | Tool | When |
|---|---|---|
| Lint, type check, build | ESLint, tsc, vue-tsc, Nuxt | Now |
| Unit and API tests | Vitest, Supertest | Now |
| Dependency audit | npm audit (production packages, high and above) | Now |
| Dependency updates | Dependabot, 7-day cooldown | Now |
| Secret scanning | gitleaks | Now |
| Static analysis | Semgrep (JavaScript, TypeScript, Node.js, secrets, Docker, GitHub Actions) | Now |
| End-to-end tests | Playwright | From M1 |
| Container scanning | Trivy | With deployment |
| Dynamic scan | OWASP ZAP baseline | With deployment |

Feature-specific security tests (access control, payment webhooks, upload checks) are written with the feature.

- **Gate:** no open critical or high findings.

## 5. Release

- Work through [release/release-checklist.md](release/release-checklist.md).
- **Gate:** checklist complete and signed in the merge request.

## 6. Operate

- Monitoring and alerts (errors, uptime, AI spend, failed webhooks).
- Security updates on a fixed weekly schedule, critical ones at once.
- Incidents follow [security/incident-response.md](security/incident-response.md), including GDPR breach notification within 72 hours.
- Lessons learned go back into requirements and abuse cases.

## Definition of done

A merge request is done when every box in [.github/pull_request_template.md](../.github/pull_request_template.md) is ticked or marked "n/a" with a reason.
