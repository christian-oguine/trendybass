# Accepted risks

Risks we know about and accept for now, with the reason and a date to look again. Dependency advisories are also listed in [.github/audit-allowlist.json](../../.github/audit-allowlist.json); CI fails when an entry expires.

| Date | Risk | Why accepted | Review by |
|---|---|---|---|
| 2026-11-18 | picomatch ReDoS (GHSA-fc5q-39xc-vjpf, high), all versions up to 4.0.7 | Only used by build and dev tooling with patterns from our own config. No visitor input reaches it. No fixed version exists yet | 2026-12-18 |
| 2026-11-18 | minimatch DoS (GHSA-g3hv-75wg-m249, moderate) and esbuild dev-server file read on Windows (GHSA-g7r4-m6w7-qqqr, low) | Build and dev tooling only. Below the CI threshold. The dev server listens on localhost only | With Dependabot updates |
