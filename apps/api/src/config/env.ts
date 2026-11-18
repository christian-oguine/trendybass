// Server settings from the environment. Plain process.env so CLI scripts and tests can use it too.
// Secrets are read only here, never sent to the browser.

function read(name: string): string | undefined {
  const v = process.env[name]
  return v && v.trim() ? v.trim() : undefined
}

export const isProd = process.env.NODE_ENV === 'production'

export const config = {
  apiPort: Number(read('API_PORT') ?? 4001),
  siteUrl: (read('NUXT_PUBLIC_SITE_URL') ?? 'http://localhost:3001').replace(/\/$/, ''),
  databaseUrl: read('DATABASE_URL'),
  redisUrl: read('REDIS_URL'),
  // Only trust X-Forwarded-For behind our own reverse proxy.
  trustProxy: read('TRUST_PROXY') === '1',
}

export const siteOrigin = new URL(config.siteUrl).origin
