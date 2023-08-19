import { expect, it, describe, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/check-ins-repository'
import { CheckInUseCase } from './check-in'

describe('Check-in Use Case', () => {
  let repository: InMemoryCheckInsRepository
  let sut: CheckInUseCase

  beforeEach(() => {
    repository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(repository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 13, 3, 0, 0))
    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-1',
        userId: 'user-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 13, 3, 0, 0))
    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
    })

    vi.setSystemTime(new Date(2022, 0, 14, 3, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
    })

    expect(checkIn).toEqual(
      expect.objectContaining({
        gym_id: 'gym-1',
        user_id: 'user-1',
      }),
    )
  })
})
