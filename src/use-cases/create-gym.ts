import { Gym } from '@prisma/client'
import { IGymsRepository } from '@/repositories/gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

interface ICreateGymCaseRequest {
  title: string
  description: string | null
  phone: string
  latitude: number
  longitude: number
}

interface ICreateGymCaseResponse {
  gym: Gym
}

export class CreateGymCase {
  constructor(private readonly gymsRepository: IGymsRepository) {}

  async handle({
    description,
    latitude,
    longitude,
    phone,
    title,
  }: ICreateGymCaseRequest): Promise<ICreateGymCaseResponse> {
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
