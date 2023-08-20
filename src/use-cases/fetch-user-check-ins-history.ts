import { ICheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface IFetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page?: number
}

interface IFetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private readonly checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
    page = 1,
  }: IFetchUserCheckInsHistoryUseCaseRequest): Promise<IFetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
