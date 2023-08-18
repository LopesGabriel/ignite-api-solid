import { IUsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async handle({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const existingUser = await this.usersRepository.findByEmail(email)

    if (existingUser) {
      throw new Error('E-mail already exists')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
