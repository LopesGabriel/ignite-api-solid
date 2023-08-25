import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Lopes Gym',
        description: 'Some description',
        phone: '556134560080',
        latitude: -15.8242778,
        longitude: -48.0307621,
      })
      .expect(201)

    expect(response.body.data).toEqual(
      expect.objectContaining({
        title: 'Lopes Gym',
        description: 'Some description',
        phone: '556134560080',
      }),
    )
  })
})
