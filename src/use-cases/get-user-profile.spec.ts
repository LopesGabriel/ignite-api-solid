import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/user-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Get User Profile Use Case', () => {
  let userRepo: InMemoryUserRepository
  let sut: GetUserProfileUseCase

  beforeEach(() => {
    userRepo = new InMemoryUserRepository()
    sut = new GetUserProfileUseCase(userRepo)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await userRepo.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.handle({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    const createdUser = await userRepo.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.handle({
        userId: createdUser.id + '14dgfsg',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
