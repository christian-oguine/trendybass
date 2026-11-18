// CSRF guard: requests that change data must come from our own website.
// Browsers always send Origin on POST, PUT, PATCH and DELETE.
// Exceptions (for example the Stripe webhook in M3) are listed here and protected by their own signature check.
import type { RequestHandler } from 'express'
import { siteOrigin } from '../config/env.ts'

const SAFE = new Set(['GET', 'HEAD', 'OPTIONS'])

export const sameSiteOnly: RequestHandler = (req, res, next) => {
  if (SAFE.has(req.method)) return next()
  const origin = req.get('origin')
  const ok = origin ? origin === siteOrigin : req.get('sec-fetch-site') === 'same-origin'
  if (!ok) {
    res.status(403).json({ error: 'origin' })
    return
  }
  next()
}
