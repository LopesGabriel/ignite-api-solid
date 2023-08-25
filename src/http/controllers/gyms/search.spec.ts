import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Lopes Gym',
        description: 'Some description',
        phone: '556134560080',
        latitude: -15.8242778,
        longitude: -48.0307621,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Cascavel Crosfiteiros',
        description: 'Some description',
        phone: '556134560081',
        latitude: -15.8242778,
        longitude: -48.0307621,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({ q: 'Lopes' })
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(200)

    expect(response.body.data).toHaveLength(1)
    expect(response.body.data).toEqual([
      expect.objectContaining({
        title: 'Lopes Gym',
        description: 'Some description',
        phone: '556134560080',
      }),
    ])
  })
})
