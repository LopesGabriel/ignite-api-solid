import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInBodySchema = z.object({
    latitude: z
      .number()
      .refine(
        (val) => Math.abs(val) <= 90,
        'Latitude must be between -90 and 90',
      ),
    longitude: z
      .number()
      .refine(
        (val) => Math.abs(val) <= 180,
        'Longitude must be between -180 and 180',
      ),
  })

  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { sub } = request.user
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const checkInUseCase = makeCheckInUseCase()

  const { checkIn } = await checkInUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
    gymId,
    userId: sub,
  })

  return reply.status(201).send({ data: checkIn })
}
