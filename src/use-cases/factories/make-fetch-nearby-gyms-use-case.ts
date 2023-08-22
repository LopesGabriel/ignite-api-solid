import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/gyms-repository'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepo = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(gymsRepo)

  return useCase
}
