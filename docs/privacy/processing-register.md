# Record of processing (GDPR article 30)

**Status:** Draft. Each feature adds its rows when it is designed. Retention periods are proposals until checked with legal advice.

| Data | Purpose | Legal basis (art. 6) | Retention | Shared with |
|---|---|---|---|---|
| Account: name, email, password hash | Account and sign-in | Contract | While the account is active | Email provider (sending only) |
| Addresses | Delivery | Contract | While the account is active; copy on each order | Shipping carrier (per order) |
| Orders, invoices | Sell, deliver, return, accounting | Contract, legal obligation | As long as accounting law requires, also after account deletion | Stripe, accountant |
| Payment data | Payment | Contract | Card data never stored by us; Stripe keeps it under its own terms | Stripe |
| Body measurements, preferred fit | Fit Check | Consent (explicit, optional) | Until the shopper deletes them or the account | Nobody |
| Try-on photos | Generate the try-on preview | Consent (explicit, per upload) | Deleted after the try-on unless "Save photo"; saved photos deleted after a period of no use (proposal: 90 days) | Try-on provider (processor, DPA required) |
| Try-on results | Show and save the preview | Consent | Unsaved: 24 hours. Saved: until deleted | Nobody |
| Wishlist, recently viewed | Shopping features | Contract | While the account is active | Nobody |
| Affiliate click (product, time, session) | Commission tracking | Legitimate interest | 13 months | Affiliate network (via its tracking link) |
| Analytics (self-hosted, no cookies) | Improve the site | Legitimate interest | 13 months, aggregated | Nobody |
| Newsletter email | Marketing | Consent | Until unsubscribed | Email provider |
| Security logs (IP, user agent) | Security, fraud prevention | Legitimate interest | 90 days | Nobody |
| Admin audit log | Accountability | Legitimate interest | 24 months | Nobody |

## Processors (data processing agreement needed)

| Processor | What | Status |
|---|---|---|
| Hosting (EU VPS) | All data | To choose |
| S3-compatible storage (EU) | Photos | To choose |
| Stripe | Payments | M3 |
| Email provider (Resend, EU region) | Emails | M2 |
| Try-on API provider | Shopper photos | Chosen after the spike. Must not train on our data |
| GPU provider (self-hosted try-on) | Shopper photos in memory during a job | M6 |
