import { PrismaCheckInsRepository } from '@/repositories/prisma/check-ins-repository'
import { CheckInUseCase } from '../check-in'
import { PrismaGymsRepository } from '@/repositories/prisma/gyms-repository'

export function makeCheckInUseCase() {
  const checkInsRepo = new PrismaCheckInsRepository()
  const gymsRepo = new PrismaGymsRepository()

  const useCase = new CheckInUseCase(checkInsRepo, gymsRepo)

  return useCase
}
