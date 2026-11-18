// Starts the API. Local: npm run dev (port 4001). The website forwards /api/* here.
import { app } from './app.ts'
import { config } from './config/env.ts'
import { closeDb } from './db/connection.ts'

// Listens on localhost only. In production Caddy, on the same machine, is the only way in.
const server = app.listen(config.apiPort, '127.0.0.1', () => {
  console.info(`Trendybass API on http://127.0.0.1:${config.apiPort}`)
})

// Finish open requests, then close the database, on stop or restart.
for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    server.close(() => {
      void closeDb().finally(() => process.exit(0))
    })
  })
}
