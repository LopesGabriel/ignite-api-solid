import { SearchGymsUseCase } from '../search-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/gyms-repository'

export function makeSearchGymsUseCase() {
  const gymsRepo = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(gymsRepo)

  return useCase
}
