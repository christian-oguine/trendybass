import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from '../src/app.ts'
import { siteOrigin } from '../src/config/env.ts'

describe('health', () => {
  it('answers ok with no internal details', async () => {
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ status: 'ok' })
  })
})

describe('security basics', () => {
  it('sends security headers and hides the framework', async () => {
    const res = await request(app).get('/api/health')
    expect(res.headers['x-content-type-options']).toBe('nosniff')
    expect(res.headers['content-security-policy']).toBeDefined()
    expect(res.headers['x-powered-by']).toBeUndefined()
  })

  it('answers unknown addresses with a plain 404', async () => {
    const res = await request(app).get('/api/does-not-exist')
    expect(res.status).toBe(404)
    expect(res.body).toEqual({ error: 'not-found' })
  })

  it('refuses changes from another website', async () => {
    const res = await request(app).post('/api/health').set('Origin', 'https://evil.example').send({})
    expect(res.status).toBe(403)
    expect(res.body).toEqual({ error: 'origin' })
  })

  it('refuses changes without an origin', async () => {
    const res = await request(app).post('/api/health').send({})
    expect(res.status).toBe(403)
  })

  it('lets changes from our own website past the origin check', async () => {
    // No POST route exists yet, so the request passes the check and ends at 404.
    const res = await request(app).post('/api/health').set('Origin', siteOrigin).send({})
    expect(res.status).toBe(404)
  })

  it('answers broken JSON with 400 and no stack trace', async () => {
    const res = await request(app)
      .post('/api/health')
      .set('Origin', siteOrigin)
      .set('Content-Type', 'application/json')
      .send('{"broken":')
    expect(res.status).toBe(400)
    expect(res.body).toEqual({ error: 'invalid' })
  })

  it('refuses bodies over 100 kB', async () => {
    const res = await request(app)
      .post('/api/health')
      .set('Origin', siteOrigin)
      .send({ big: 'x'.repeat(110_000) })
    expect(res.status).toBe(413)
  })
})
