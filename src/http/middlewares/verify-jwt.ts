import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(401).send({
        message: 'Unauthorized.',
        detail: err.message,
      })
    }

    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
