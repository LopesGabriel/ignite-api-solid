import { IUsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IGetUserProfileUseCaseRequest {
  userId: string
}

interface IGetUserProfileUseCaseResponse {
  user: Omit<User, 'password_hash'>
}

export class GetUserProfileUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async handle({
    userId,
  }: IGetUserProfileUseCaseRequest): Promise<IGetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (user as any).password_hash

    return {
      user,
    }
  }
}
