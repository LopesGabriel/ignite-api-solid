import { expect, it, describe } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/user-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const userRepo = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(userRepo)

    const { user } = await registerUseCase.handle({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const userRepo = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(userRepo)

    const password = '123456'
    const { user } = await registerUseCase.handle({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password,
    })

    const isPasswordCorrectlyHashed = await compare(
      password,
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  it('should not be able to register with same email twice', async () => {
    const userRepo = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(userRepo)

    const email = 'john.doe@example.com'

    await registerUseCase.handle({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerUseCase.handle({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
