import { CheckIn, Prisma } from '@prisma/client'
import { ICheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'crypto'

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  private items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      created_at: new Date(),
      gym_id: data.gym_id,
      id: randomUUID(),
      user_id: data.user_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }

    this.items.push(checkIn)
    return checkIn
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const checkinOnSameDate = this.items.find(
      (checkin) =>
        checkin.user_id === userId &&
        checkin.created_at.toISOString().substring(0, '2022-03-01'.length) ===
          date.toISOString().substring(0, '2022-03-01'.length),
    )

    if (!checkinOnSameDate) return null
    return checkinOnSameDate
  }

  async findById(id: string) {
    const checkIn = this.items.find((item) => item.id === id)
    if (!checkIn) return null
    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string) {
    return this.items.filter((item) => item.user_id === userId).length
  }
}
