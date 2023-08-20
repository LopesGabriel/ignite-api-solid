import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

describe('Search Gyms Use Case', () => {
  let repository: InMemoryGymsRepository
  let sut: SearchGymsUseCase

  beforeEach(() => {
    repository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(repository)
  })

  it('should be able to search for gyms', async () => {
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

    const { gyms } = await sut.handle({
      query: 'Academia',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia Omni', phone: '6130536300' }),
    ])
  })

  it('should be able to search for paginated gyms', async () => {
    for (let i = 1; i <= 22; i++)
      await repository.create({
        title: 'JavaScript Gym ' + i,
        description: 'Academia e Crossfit Omni',
        latitude: -15.8242778,
        longitude: -48.0307621,
        phone: '6130536300',
      })

    const { gyms } = await sut.handle({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym 21',
        phone: '6130536300',
      }),
      expect.objectContaining({
        title: 'JavaScript Gym 22',
        phone: '6130536300',
      }),
    ])
  })
})
