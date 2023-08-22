import { Gym, Prisma } from '@prisma/client'
import { IFindManyNearbyParams, IGymsRepository } from '../gyms-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements IGymsRepository {
  create(data: Prisma.GymCreateInput) {
    return prisma.gym.create({
      data,
    })
  }

  findById(id: string) {
    return prisma.gym.findUnique({
      where: {
        id,
      },
    })
  }

  findManyNearby({ latitude, longitude }: IFindManyNearbyParams) {
    return prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `
  }

  searchMany(query: string, page: number) {
    return prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
  }
}
