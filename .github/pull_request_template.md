## What and why

<!-- What does this MR change, and why? -->

MR: MR-NN

## Docs

<!-- Links to the SSDLC docs for this change (docs/README.md). Write "n/a" with a reason if a doc does not apply. -->

- Requirements and abuse cases:
- Threat model:
- Processing register / DPIA:
- ADR:

## How to test

<!-- Steps a reviewer can follow. Include test accounts or seed data if needed. -->

1.

## Screenshots

<!-- UI changes only: phone (360 px) and desktop (1280 px). -->

## Definition of done (docs/ssdlc.md)

Tick each box, or write "n/a" next to it with a short reason.

**Security and privacy**
- [ ] Security and privacy requirements are written and met
- [ ] Abuse cases are written and have controls
- [ ] The threat model is updated
- [ ] Input is validated on the server (Zod)
- [ ] Permissions and ownership are enforced on the server and tested
- [ ] Prices, totals, stock and payment status are decided on the server only
- [ ] Personal data is minimised, in the processing register, and has a retention period
- [ ] Logs contain no passwords, tokens, card data, photos, measurements or unnecessary personal data
- [ ] No secrets in code; new env variables are in `.env.example`
- [ ] New dependencies are checked: needed now, well maintained, no known high or critical issues

**Tests and CI**
- [ ] Unit, integration and access-control tests pass
- [ ] CI security scans pass with no unaccepted critical or high findings

**SEO (public pages)**
- [ ] Server-rendered, with title and description
- [ ] Canonical and hreflang
- [ ] Structured data where it fits (Product, Offer, BreadcrumbList)
- [ ] In the right sitemap, or `noindex` if private
- [ ] Speed: no new large images or scripts on the first view

**UI and UX**
- [ ] Checked at 360 px and 1280 px
- [ ] Clear flow, with loading, empty and error states
- [ ] Accessible: keyboard, visible focus, labels, contrast (WCAG 2.1 AA), screen reader
- [ ] All texts in the locale files, none hard-coded

**Docs**
- [ ] README updated if the plan changed; a short ADR if a big decision was made
