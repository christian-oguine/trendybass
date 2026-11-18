# ADR 0002: Server-side sessions, no JWT

**Status:** Accepted, November 2026.

## Context

Shoppers and admins sign in. The admin can refund money and see orders, so sessions must be easy to end at once (stolen phone, staff leaving, password change).

## Decision

Custom session auth, the same design as Kotly (Kotly ADR 0002), copied in M2:

- Random 32-byte token in a `__Host-` cookie: HttpOnly, Secure, SameSite=Lax. Only a hash of the token is stored.
- Argon2id password hashing, breached-password check, email verification, single-use reset links.
- Rate limits on sign-in and sign-up (Valkey).
- Two-factor authentication (TOTP) required for admins. Short admin sessions.
- "Sign out of all devices".

## Reasons

- A session can be deleted instantly. A JWT stays valid until it expires.
- The cookie cannot be read by JavaScript, so an XSS bug cannot steal it.
- Already built and tested in Kotly.

## Costs

- One database or Valkey lookup per request. Cheap at our scale.
- We own the code, so we own its security. It is covered by tests and the SSDLC review.
