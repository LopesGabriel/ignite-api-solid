import { expect, it, describe, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/gyms-repository'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

describe('Check-in Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let gymsRepository: InMemoryGymsRepository
  let sut: CheckInUseCase

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const gym = await gymsRepository.create({
      phone: '5561982352349',
      title: 'Academia Omni',
      latitude: -15.8291367,
      longitude: -48.0412025,
    })

    const { checkIn } = await sut.execute({
      gymId: gym.id,
      userId: 'user-1',
      userLatitude: -15.8291367,
      userLongitude: -48.0412025,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    const gym = await gymsRepository.create({
      phone: '5561982352349',
      title: 'Academia Omni',
      latitude: -15.8242778,
      longitude: -48.0307621,
    })

    vi.setSystemTime(new Date(2022, 0, 13, 3, 0, 0))
    await sut.execute({
      gymId: gym.id,
      userId: 'user-1',
      userLatitude: -15.8242778,
      userLongitude: -48.0307621,
    })

    await expect(() =>
      sut.execute({
        gymId: gym.id,
        userId: 'user-1',
        userLatitude: -15.8242778,
        userLongitude: -48.0307621,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    const gym = await gymsRepository.create({
      phone: '5561982352349',
      title: 'Academia Omni',
      latitude: -15.8242778,
      longitude: -48.0307621,
    })

    vi.setSystemTime(new Date(2022, 0, 13, 3, 0, 0))
    await sut.execute({
      gymId: gym.id,
      userId: 'user-1',
      userLatitude: -15.8242778,
      userLongitude: -48.0307621,
    })

    vi.setSystemTime(new Date(2022, 0, 14, 3, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: gym.id,
      userId: 'user-1',
      userLatitude: -15.8242778,
      userLongitude: -48.0307621,
    })

    expect(checkIn).toEqual(
      expect.objectContaining({
        gym_id: gym.id,
        user_id: 'user-1',
      }),
    )
  })

  it('should not be able to check in far from gym', async () => {
    const gym = await gymsRepository.create({
      phone: '5561982352349',
      title: 'Academia Omni',
      latitude: -15.8283674,
      longitude: -48.0392025,
    })

    await expect(() =>
      sut.execute({
        gymId: gym.id,
        userId: 'user-1',
        userLatitude: -15.8041062,
        userLongitude: -48.0682234,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
