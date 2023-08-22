import { Gym } from '@prisma/client'
import { IGymsRepository } from '@/repositories/gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

interface ICreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string
  latitude: number
  longitude: number
}

interface ICreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private readonly gymsRepository: IGymsRepository) {}

  async handle({
    description,
    latitude,
    longitude,
    phone,
    title,
  }: ICreateGymUseCaseRequest): Promise<ICreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      latitude: new Decimal(latitude),
      longitude: new Decimal(longitude),
      phone,
      title,
      description,
    })

    return {
      gym,
    }
  }
}
