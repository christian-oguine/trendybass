// Builds the Express app but does not start it. server.ts starts it; the tests import it directly.
import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'
import { config } from './config/env.ts'
import { errorHandler, notFound } from './shared/errors.ts'
import { sameSiteOnly } from './shared/origin.ts'

export const app = express()

// Behind Caddy in production: trust one proxy hop, so req.ip is the visitor.
if (config.trustProxy) app.set('trust proxy', 1)
// Do not tell visitors which framework runs the API.
app.disable('x-powered-by')

app.use(helmet())
app.use(express.json({ limit: '100kb' }))
app.use(cookieParser())
// Changes (POST and the like) are only accepted from our own website.
app.use(sameSiteOnly)

// Every API address starts with /api. Caddy (production) and Nuxt (local) send /api/* here.
const api = express.Router()
// Used by the reverse proxy and monitoring. Returns no internal details.
api.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api', api)
app.use(notFound)
app.use(errorHandler)
