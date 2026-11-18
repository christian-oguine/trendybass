# Release checklist

Copy into the merge request or release notes and tick each item. "n/a" needs a reason.

## Configuration

- [ ] Production `.env` complete; no default or test values
- [ ] `NODE_ENV=production`, `TRUST_PROXY=1` behind Caddy, HTTPS site URL
- [ ] Secrets stored only on the server, not in the repository or CI logs
- [ ] Stripe in live mode only on production; webhook secret set and tested

## Security

- [ ] CI green: lint, type check, build, tests, npm audit, gitleaks, Semgrep
- [ ] Security headers checked on the live site (CSP, HSTS, frame protection)
- [ ] Admin accounts have 2FA
- [ ] Container images scanned (Trivy) and ZAP baseline run, no high findings

## Data

- [ ] Database migrations reviewed and tested on a copy
- [ ] Backup taken before release; restore tested in the last month
- [ ] New personal data is in the processing register with a retention period

## Operate

- [ ] Error tracking and uptime monitoring active
- [ ] Alerts for failed webhooks and AI spend
- [ ] Rollback plan written: which version to go back to and how

## Sign-off

- [ ] Founder approves
