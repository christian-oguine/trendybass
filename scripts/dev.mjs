// npm run dev: starts the local services (Docker), then the API (port 4001) and the website (port 3001) together.
// Ctrl+C stops both.
import { spawn, spawnSync } from 'node:child_process'

const run = (cmd, opts = {}) => spawn(cmd, { shell: true, stdio: 'inherit', ...opts })

const db = spawnSync('docker compose up -d', { shell: true, stdio: 'inherit' })
if (db.status !== 0) {
  console.error('\nCould not start the local services. Is Docker Desktop running, and is POSTGRES_PASSWORD set in .env?')
  process.exit(1)
}

const apps = [run('npm run dev -w @trendybass/api'), run('npm run dev -w @trendybass/web')]
const stop = () => apps.forEach(p => p.kill())
process.on('SIGINT', stop)
process.on('SIGTERM', stop)
apps.forEach(p => p.on('exit', (code) => {
  if (code) {
    stop()
    process.exit(code)
  }
}))
