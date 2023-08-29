import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Academia Omni',
        description: 'Academia e Crossfit Omni',
        phone: '6130536300',
        latitude: -15.8242778,
        longitude: -48.0307621,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Smart Fit',
        description: 'Academia de rede',
        latitude: -15.8343085,
        longitude: -48.0376937,
        phone: '',
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Academia Companhia Aquática',
        description: 'Academia e clube de natação',
        latitude: -15.8097089,
        longitude: -47.8869723,
        phone: '6132253574',
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -15.8271683,
        longitude: -48.0398437,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(200)

    expect(response.body.data).toHaveLength(2)
    expect(response.body.data).toEqual([
      expect.objectContaining({ title: 'Academia Omni', phone: '6130536300' }),
      expect.objectContaining({ title: 'Smart Fit', phone: '' }),
    ])
  })
})
