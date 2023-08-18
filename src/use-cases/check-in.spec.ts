import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/check-ins-repository'
import { CheckInUseCase } from './check-in'

describe('Check-in Use Case', () => {
  let repository: InMemoryCheckInsRepository
  let sut: CheckInUseCase

  beforeEach(() => {
    repository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(repository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
