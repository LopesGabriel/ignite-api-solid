import { ICheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface IFetchUserCheckInsHistoryRequest {
  userId: string
  page?: number
}

interface IFetchUserCheckInsHistoryResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistory {
  constructor(private readonly checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
    page = 1,
  }: IFetchUserCheckInsHistoryRequest): Promise<IFetchUserCheckInsHistoryResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
