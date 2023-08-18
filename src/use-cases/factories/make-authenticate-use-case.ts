import { PrismaUsersRepository } from '@/repositories/prisma/users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const userRepo = new PrismaUsersRepository()
  const useCase = new AuthenticateUseCase(userRepo)

  return useCase
}
