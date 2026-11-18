# ADR 0003: One try-on interface, swappable providers

**Status:** Accepted, November 2026. The provider for the beta is chosen after the Sprint 0 spike.

## Context

AI try-on is the most expensive part of Trendybass. Paid APIs cost about $0.07 to $0.08 per image (November 2026). A self-hosted open model (FASHN VTON v1.5, Apache-2.0) could cost under $0.01 per image on a serverless GPU, but needs operating and its full licence chain must be checked. Many open models (CatVTON, IDM-VTON, OOTDiffusion, FitDiT) are non-commercial and cannot be used.

## Decision

The API has one `TryOnProvider` interface:

```ts
interface TryOnProvider {
  name: string
  // Returns a finished image or a clear failure. Never throws raw provider errors to the caller.
  run(input: { personImage: Buffer, garmentImage: Buffer, category: 'tops' | 'bottoms' | 'one-pieces' }): Promise<TryOnResult>
  // Cost of one run in US dollar cents, for budgets and the admin overview.
  costCents(): number
}
```

Implementations: `fashn-api`, `fal`, `self-hosted`. The active provider and a fallback are chosen with environment settings and can be switched off in the admin. Jobs run through a queue (BullMQ), with per-user limits and a daily budget cap.

The self-hosted model runs as a separate Python service in `workers/tryon/`, packaged as a container for a serverless GPU provider.

## Reasons

- Start with a paid API (known quality, nothing to operate), move to self-hosted when cost justifies it, without touching the rest of the app.
- Fallback when one provider is down.
- Same idea as the `AI_PROVIDER` switch in Stipwire.

## Costs

- Each provider needs its own adapter and tests.
- Results differ slightly between providers. The spike scores this.
- Every provider that receives shoppers' photos needs a data processing agreement and a check of where it processes data.
