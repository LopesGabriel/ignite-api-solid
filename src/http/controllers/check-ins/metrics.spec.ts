import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Check-in metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the count of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app, true)
    const user = await prisma.user.findFirstOrThrow()

    const createGymResponse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Lopes Gym',
        description: 'Some description',
        phone: '556134560080',
        latitude: -15.8242778,
        longitude: -48.0307621,
      })

    const { id } = createGymResponse.body.data

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: id,
          user_id: user.id,
        },
        {
          gym_id: id,
          user_id: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get(`/check-ins/metrics`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(response.body.data).toEqual(
      expect.objectContaining({ checkInsCount: 2 }),
    )
  })
})
