import { PrismaUsersRepository } from '@/repositories/prisma/users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const userRepo = new PrismaUsersRepository()
  const useCase = new RegisterUseCase(userRepo)

  return useCase
}
