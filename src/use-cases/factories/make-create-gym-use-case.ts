import { CreateGymUseCase } from '../create-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/gyms-repository'

export function makeCreateGymUseCase() {
  const gymsRepo = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(gymsRepo)

  return useCase
}
