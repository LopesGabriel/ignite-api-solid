import { PrismaCheckInsRepository } from '@/repositories/prisma/check-ins-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const checkInsRepo = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(checkInsRepo)

  return useCase
}
