import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    const email = 'john.doe@example.com'
    const password = '123456'
    const name = 'John Doe'

    await request(app.server).post('/users').send({
      name,
      email,
      password,
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email,
      password,
    })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(200)

    expect(profileResponse.body.data).toEqual(
      expect.objectContaining({
        email,
        name,
      }),
    )
  })
})
