import { Gym, Prisma } from '@prisma/client'
import { IGymsRepository } from '../gyms-repository'
import { randomUUID } from 'crypto'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryGymsRepository implements IGymsRepository {
  private items: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym: Gym = {
      id: randomUUID(),
      description: data.description ?? null,
      latitude: new Decimal(data.latitude as number),
      longitude: new Decimal(data.longitude as number),
      phone: data.phone,
      title: data.title,
    }

    this.items.push(gym)
    return gym
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
