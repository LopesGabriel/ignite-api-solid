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
}