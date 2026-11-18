# Incident response

**Status:** Draft. Finished before public launch.

## What counts as an incident

- Personal data seen, changed, lost or deleted by someone who should not (data breach)
- Account takeover of an admin
- Payment fraud pattern or a Stripe alert
- Site or checkout down for more than 30 minutes
- AI spend far above the daily budget
- A vulnerability report through [SECURITY.md](../../SECURITY.md)

## Steps

1. **Contain.** Stop the damage: switch off the affected feature (kill switches for try-on, checkout), revoke sessions or keys, block the source.
2. **Record.** Start an entry in the incident log: time found, what happened, data and people affected, actions taken. Keep evidence (logs) safe.
3. **Assess.** Is personal data involved? How many people? What risk to them?
4. **Notify.**
   - Personal data breach with a risk to people: notify the data protection authority **within 72 hours** of becoming aware (GDPR article 33).
   - High risk to people: tell the affected shoppers without undue delay, in plain language (article 34).
   - Payment-related: inform Stripe.
   - Processors (try-on provider, email, storage) must tell us of their breaches without delay (in each DPA).
5. **Fix.** Fix the cause, add a test, deploy.
6. **Learn.** Short review within one week. Update abuse cases, threat model and checklists.

## Contacts

| Role | Who |
|---|---|
| Incident lead | Founder |
| Data protection authority | Depends on where the company is registered. To be filled in |
| Stripe | Dashboard support |
