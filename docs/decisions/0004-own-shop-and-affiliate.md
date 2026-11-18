# ADR 0004: Own shop and affiliate from day one, one catalogue

**Status:** Accepted, November 2026.

## Context

The founder wants to sell Trendybass's own products now, with Stripe, and also show partner products through affiliate networks. Dropshipping from China was considered and rejected: under EU law the seller stays fully responsible for withdrawal, returns and defects, and delivery and quality are hard to control.

## Decision

- One `products` catalogue with a `source` field: `own` or `affiliate`.
- **Own products** have SKUs per size and colour, stock, cost price, garment measurements per size, and go through the bag and Stripe Checkout.
- **Affiliate products** come from network feeds, have a tracked outbound link and never enter the bag or create an order.
- Own products are bought in small quantities from EU wholesalers and measured on arrival.
- Payments use Stripe Checkout (hosted page). See ADR 0005.

## Reasons

- Own products give margin and full data for Fit Check and Try-On.
- Affiliate products give range without stock risk.
- One catalogue means search, filters, Try-On, Fit Check and recommendations work for both.

## Costs

- Code must never mix the two: tests check that affiliate products cannot be added to the bag and that clicks are never counted as sales.
- Own stock ties up money and brings returns. Start with 20 to 50 products.
