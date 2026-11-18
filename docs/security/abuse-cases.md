# Abuse cases

**Status:** Draft. Each feature adds its own in `docs/requirements/<feature>.md`; platform-wide ones are kept here.

| Abuse case | Main controls | Milestone |
|---|---|---|
| Stolen cards used to test or buy goods | Stripe Checkout with 3-D Secure and Stripe Radar, limits for new accounts, manual review of high-value first orders | M3 |
| Fake "item not received" or empty-box return to get a refund | Tracked shipping, return inspection before refund, refund history per customer | M3 |
| Bots buy up limited stock | Stock reserved only during an active Checkout Session, per-session quantity limits, rate limits | M3 |
| Discount code leaked and abused | Usage limits per code and per customer, end dates, admin can disable at once | M3 |
| Account takeover to see orders and addresses | Strong passwords, breached-password check, rate limits, sign-out everywhere, 2FA for admins | M2 |
| Try-on with photos of other people (deepfake-style misuse) | Account required, "only photos of yourself" terms, one-person check, garments only from our catalogue, report button, daily limits | M5 |
| Try-on spam to drive up AI cost | Per-user allowance, daily budget cap, queue limits, cache, kill switch | M5 |
| Body measurements leaked or used for profiling | Stored only in the account, never in logs or analytics, never shared, deletable | M2 |
| Malicious file upload | Allowed image types and size only, decode and re-encode, metadata removed, private storage | M1 / M5 |
| Scraping of catalogue and prices | Rate limits, caching; catalogue is public by design, so no personal data on public pages | M1 |
| Affiliate fraud: fake clicks to inflate reports | Clicks counted per session with rate limits; commission only from network reports | M4 |
| Access to another shopper's order (IDOR) | Ownership check on every request, random order references, access-control tests | M3 |
| Admin misuses refunds or stock | Role-based permissions, audit log, 2FA, refund limits per role | M3 |
