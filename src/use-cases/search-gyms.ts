import { Gym } from '@prisma/client'
import { IGymsRepository } from '@/repositories/gyms-repository'

interface ISearchGymsUseCaseRequest {
  query: string
  page?: number
}

interface ISearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private readonly gymsRepository: IGymsRepository) {}

  async handle({
    query,
    page = 1,
  }: ISearchGymsUseCaseRequest): Promise<ISearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
