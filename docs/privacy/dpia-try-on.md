# DPIA: AI Try-On and Fit Check

**Status:** Draft. Must be finished and signed off before the Try-On beta (M5). Fit Check is included because body measurements are sensitive personal data in practice, even if not a special category under GDPR article 9.

## 1. Description

Shoppers upload a photo of themselves. The photo and a garment image are sent to a try-on model (outside API or our own GPU worker), which returns an image of the shopper wearing the garment. Shoppers can also save body measurements to get size advice.

## 2. Why a DPIA

- New technology (generative AI) applied to images of people
- Possible processing by a third party, possibly outside the EU
- Body images and measurements can reveal sensitive information (body shape, possibly health or pregnancy) and could be misused

## 3. Necessity and proportionality

| Question | Answer |
|---|---|
| Is the photo needed? | Yes, the feature cannot work without it |
| Is less data possible? | One photo per try-on. Original deleted after use unless the shopper saves it |
| Legal basis | Explicit consent per upload, withdrawable at any time |
| Transparency | Short notice on the upload screen, link to the privacy notice |
| Retention | See [processing-register.md](processing-register.md) |
| Training | Photos are never used to train any model, ours or the provider's |

## 4. Risks to shoppers

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Photo leaks from storage | Low | High | Private bucket, encryption, signed links, short retention |
| Provider keeps or trains on photos | Medium | High | DPA with no-training and deletion terms; prefer EU processing; self-hosted option |
| Photo of another person used without consent | Medium | High | Terms, one-person check, report button, limits, no free garment upload |
| Generated image used to embarrass someone | Low | High | Only catalogue garments, AI label and metadata on every image |
| Measurements reveal body information | Low | Medium | Optional, never shared, not in logs or analytics, deletable |
| Minors upload photos | Low | High | Try-on for 16+ only, age confirmation at sign-up |

## 5. Open items

- Choose provider and check its terms and data location (Sprint 0 spike)
- Legal review of consent wording
- Sign-off
