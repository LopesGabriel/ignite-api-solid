import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a new user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    expect(response.status).toBe(201)
    expect(response.body.data).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'john.doe@example.com',
      }),
    )
  })
})
