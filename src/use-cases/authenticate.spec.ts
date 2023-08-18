import { expect, it, describe } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/user-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const userRepo = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(userRepo)

    await userRepo.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.handle({
      email: 'john.doe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const userRepo = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(userRepo)

    await userRepo.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.handle({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const userRepo = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(userRepo)

    await userRepo.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.handle({
        email: 'john.doe@example.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
