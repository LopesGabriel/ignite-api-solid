import { ICheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface ICheckinUseCaseRequest {
  userId: string
  gymId: string
}

interface ICheckinUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private readonly checkInsRepository: ICheckInsRepository) {}

  async execute({
    gymId,
    userId,
  }: ICheckinUseCaseRequest): Promise<ICheckinUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
