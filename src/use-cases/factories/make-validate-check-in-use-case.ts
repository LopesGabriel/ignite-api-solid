import { PrismaCheckInsRepository } from '@/repositories/prisma/check-ins-repository'
import { ValidateCheckInUseCase } from '../validate-checkin'

export function makeValidateCheckInUseCase() {
  const checkInsRepo = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(checkInsRepo)

  return useCase
}
