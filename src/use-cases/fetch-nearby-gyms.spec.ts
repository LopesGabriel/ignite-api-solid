import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

describe('Fetch Nearby Gyms Use Case', () => {
  let repository: InMemoryGymsRepository
  let sut: FetchNearbyGymsUseCase

  beforeEach(() => {
    repository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(repository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await repository.create({
      title: 'Academia Omni',
      description: 'Academia e Crossfit Omni',
      latitude: -15.8242778,
      longitude: -48.0307621,
      phone: '6130536300',
    })

    await repository.create({
      title: 'Smart Fit',
      description: 'Academia de rede',
      latitude: -15.8343085,
      longitude: -48.0376937,
      phone: '',
    })

    await repository.create({
      title: 'Academia Companhia Aquática',
      description: 'Academia e clube de natação',
      latitude: -15.8097089,
      longitude: -47.8869723,
      phone: '6132253574',
    })

    const { gyms } = await sut.handle({
      userLatitude: -15.8271683,
      userLongitude: -48.0398437,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia Omni', phone: '6130536300' }),
      expect.objectContaining({ title: 'Smart Fit', phone: '' }),
    ])
  })
})
