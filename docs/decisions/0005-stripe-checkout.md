# ADR 0005: Stripe Checkout (hosted) and webhook-confirmed orders

**Status:** Accepted, November 2026. Built in M3.

## Context

Own products need payments in several EU countries. Handling card data ourselves would put the whole site in PCI DSS scope.

## Decision

- Use **Stripe Checkout**, Stripe's hosted payment page. Our pages never contain card fields.
- The API creates the Checkout Session from the bag, with prices and totals calculated on the server.
- Stock is reserved in one database transaction when the session is created, and released when it expires.
- An order is marked **paid** only by Stripe's signed webhook (`checkout.session.completed`). The webhook signature is verified, each event is processed once (stored event id), and failures are retried by Stripe.
- Refunds are made from the admin through the Stripe API and recorded on the order.
- Payment methods (cards, Apple Pay, Google Pay, iDEAL, Bancontact, Klarna) are switched on in the Stripe dashboard.

## Reasons

- PCI scope stays at SAQ A: card data never reaches our servers.
- Strong Customer Authentication (3-D Secure) is handled by Stripe.
- Webhook-only confirmation means a shopper cannot fake a paid order from the browser.

## Costs

- Less control over the look of the payment page.
- Stripe fees per payment.
- Webhooks must be monitored: a missed webhook means an unconfirmed order. Alerts on failed webhooks in the Operate phase.
