# Trendybass docs

Everything the Secure Software Development Lifecycle (SSDLC) asks us to write down lives here. The process itself is in [ssdlc.md](ssdlc.md).

| SSDLC phase | Document | Where |
|---|---|---|
| 1. Requirements | Requirements and abuse cases per feature | [requirements/](requirements/) (copy [_template.md](requirements/_template.md)) |
| 1. Requirements | Abuse cases for the whole platform | [security/abuse-cases.md](security/abuse-cases.md) |
| 2. Design | Architecture decisions (ADRs) | [decisions/](decisions/) |
| 2. Design | Stack and when each package is added | [architecture/stack.md](architecture/stack.md) |
| 2. Design | Data flows and STRIDE threat model | [security/threat-model.md](security/threat-model.md) |
| 2. Design | Who can do what | [security/permissions.md](security/permissions.md) |
| 2. Design | Personal data, purpose, legal basis, retention | [privacy/processing-register.md](privacy/processing-register.md) |
| 2. Design | DPIA for high-risk features | [privacy/dpia-try-on.md](privacy/dpia-try-on.md) |
| 3. Build | Coding rules | [ssdlc.md](ssdlc.md#3-build) |
| 4. Verify | CI checks | [ssdlc.md](ssdlc.md#4-verify) and [.github/workflows/ci.yml](../.github/workflows/ci.yml) |
| 5. Release | Release checklist | [release/release-checklist.md](release/release-checklist.md) |
| 6. Operate | Incident response and breach notification | [security/incident-response.md](security/incident-response.md) |

Rules for these docs:

- Plain, simple English. Short sentences. Honest about limits.
- A doc is updated in the same merge request as the code it describes.
- "Draft" at the top means it is not finished yet. Drafts must be finished before the gate they belong to.
