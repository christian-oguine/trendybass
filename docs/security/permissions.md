# Permissions

**Status:** Draft. Enforced on the server for every request. The website only hides buttons; it never decides.

| Action | Guest | Shopper | Business admin | Super admin |
|---|---|---|---|---|
| Browse catalogue, product pages | ✓ | ✓ | ✓ | ✓ |
| Bag and checkout (own products) | ✓ | ✓ | | |
| See own orders, request a return | by email link | ✓ (own only) | | |
| Save items, measurements, addresses | | ✓ (own only) | | |
| Try-On | | ✓ (own only, within allowance) | | |
| Fit Check | rough estimate only | ✓ | | |
| Download and delete own data | | ✓ | | |
| Products, stock, categories, homepage | | | ✓ | ✓ |
| Orders, shipping, returns | | | ✓ | ✓ |
| Refunds | | | ✓ (up to a set limit) | ✓ |
| Feeds and affiliate partners | | | ✓ | ✓ |
| AI settings, budget, kill switch | | | view | ✓ |
| Roles, admin accounts, integrations | | | | ✓ |
| See shoppers' try-on photos | | | **never** | **never** |
| See card numbers or passwords | | | **never** | **never** |

Admin accounts need 2FA. Every admin action is written to the audit log.
