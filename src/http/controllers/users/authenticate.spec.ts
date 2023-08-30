import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate the user', async () => {
    const email = 'john.doe@example.com'
    const password = '123456'

    await request(app.server).post('/users').send({
      name: 'John Doe',
      email,
      password,
    })

    const response = await request(app.server).post('/auth').send({
      email,
      password,
    })

    expect(response.status).toBe(200)
    expect(response.body.token).toEqual(expect.any(String))
  })
})
