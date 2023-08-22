import { PrismaUsersRepository } from '@/repositories/prisma/users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const userRepo = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(userRepo)

  return useCase
}
