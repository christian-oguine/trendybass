// npm run audit: dependency check for production packages (SSDLC verify gate).
// Fails on any high or critical advisory, unless it is in .github/audit-allowlist.json with a reason
// and an expiry date that has not passed. Expired entries fail too, so every accepted risk is reviewed again.
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const allowlist = JSON.parse(readFileSync(new URL('../.github/audit-allowlist.json', import.meta.url), 'utf8')).advisories
const today = new Date().toISOString().slice(0, 10)

let raw
try {
  raw = execSync('npm audit --omit=dev --json', { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
}
catch (e) {
  // npm audit exits with 1 when it finds anything; the report is still on stdout.
  raw = e.stdout
}
const report = JSON.parse(raw)

const found = new Map()
for (const v of Object.values(report.vulnerabilities ?? {})) {
  for (const via of v.via) {
    if (typeof via === 'string') continue
    if (via.severity !== 'high' && via.severity !== 'critical') continue
    const id = via.url.split('/').pop()
    found.set(id, `${via.name} (${via.severity}): ${via.title}`)
  }
}

let failed = false
for (const [id, text] of found) {
  const entry = allowlist.find(a => a.id === id)
  if (!entry) {
    console.error(`Not accepted: ${id} ${text}`)
    failed = true
  }
  else if (entry.expires < today) {
    console.error(`Acceptance expired on ${entry.expires}, review again: ${id} ${text}`)
    failed = true
  }
  else {
    console.info(`Accepted until ${entry.expires}: ${id} ${text}`)
  }
}

for (const entry of allowlist) {
  if (!found.has(entry.id)) console.info(`No longer found, remove from the allowlist: ${entry.id} ${entry.package}`)
}

if (failed) process.exit(1)
console.info(`Dependency audit passed (${found.size} high or critical, all accepted).`)
