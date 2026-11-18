# MR-01 Scaffold

**Status:** Done
**MR:** MR-01
**Milestone:** M0 Foundation

## What and why

The empty repository becomes a working monorepo with the agreed stack, local services, CI security gate and SSDLC documents, so feature work can start in M1.

## Functional requirements

1. `npm run dev` starts Postgres, Valkey and Mailpit in Docker, the API on port 4001 and the website on port 3001.
2. `GET /api/health` answers `{ "status": "ok" }` through the website and directly.
3. The website renders a placeholder home page on the server at `/en`.
4. Ports do not clash with Kotly, so both can run at the same time.

## Security requirements

1. Security headers on the API (helmet) and the website (nuxt-security with CSP nonces).
2. Origin check on every request that changes data (CSRF protection).
3. Errors never return stack traces or internal messages.
4. JSON bodies limited to 100 kB.
5. API listens on 127.0.0.1 only; Docker services bound to localhost.
6. npm install scripts blocked, exact versions, `engine-strict`.
7. CI: lint, type check, build, tests, npm audit, gitleaks, Semgrep. Actions pinned to commit SHAs.
8. Branch protection for `main` stored as code in `.github/rulesets/`.

## Privacy requirements

1. No personal data is collected yet.
2. Fonts are served from our own domain, not loaded from Google at runtime.

## Abuse cases

| Who | What they try | Control |
|---|---|---|
| Attacker | Malicious package version runs code on install | `ignore-scripts=true`, exact versions, Dependabot 7-day cooldown, npm audit |
| Attacker | Secret committed by accident | `.env` ignored, gitleaks in CI |
| Attacker | Cross-site request changes data | Origin check middleware, tested |
| Attacker | Error page leaks internals | Central error handler, tested |

## Open questions

- None.
