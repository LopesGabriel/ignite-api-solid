import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce
      .number()
      .refine(
        (val) => Math.abs(val) <= 90,
        'Latitude must be between -90 and 90',
      ),
    longitude: z.coerce
      .number()
      .refine(
        (val) => Math.abs(val) <= 180,
        'Longitude must be between -180 and 180',
      ),
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await fetchNearbyGymsUseCase.handle({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({ data: gyms })
}
