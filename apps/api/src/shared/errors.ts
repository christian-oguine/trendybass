// Errors: every failure answers { error: "<code>" }. The web app turns the code into text.
import type { ErrorRequestHandler, RequestHandler } from 'express'
import type { z } from 'zod'

export class HttpError extends Error {
  readonly status: number
  readonly code: string
  // Safe extra facts for the browser, for example { missing: ['photos'] }.
  readonly details?: Record<string, unknown>
  constructor(status: number, code: string, details?: Record<string, unknown>) {
    super(code)
    this.status = status
    this.code = code
    this.details = details
  }
}

// Status for each service error code.
const STATUS: Record<string, number> = {
  'limited': 429,
  'wrong': 401,
  'verify': 403,
  'blocked': 403,
  'invalid': 400,
  'short': 422,
  'long': 422,
  'leaked': 422,
  'age': 422,
  'not-found': 404,
}

export function fail(code: string): never {
  throw new HttpError(STATUS[code] ?? 400, code)
}

// Reads a request body or query with a Zod schema. Bad input: 400 { error: code, field }.
// field = the first field that failed (for example "price"), so the form can point at it. Never the value itself.
export function parse<T extends z.ZodType>(schema: T, data: unknown, code = 'invalid'): z.infer<T> {
  const r = schema.safeParse(data)
  if (!r.success) {
    const path = r.error.issues[0]?.path ?? []
    const field = path.length ? String(path[0]) : undefined
    throw new HttpError(STATUS[code] ?? 400, code, field ? { field } : undefined)
  }
  return r.data
}

export const notFound: RequestHandler = (_req, res) => {
  res.status(404).json({ error: 'not-found' })
}

// Never sends stack traces or internal messages to the browser.
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ ...err.details, error: err.code })
    return
  }
  // Broken JSON or a body over the size limit.
  const status = typeof err?.status === 'number' && err.status >= 400 && err.status < 500 ? err.status : 500
  if (status === 500) console.error('[api]', err instanceof Error ? err.stack : err)
  res.status(status).json({ error: status === 500 ? 'server' : 'invalid' })
}
