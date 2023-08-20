import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/gyms-repository'
import { CreateGymCase } from './create-gym'

describe('Create Gym Use Case', () => {
  let repo: InMemoryGymsRepository
  let sut: CreateGymCase

  beforeEach(() => {
    repo = new InMemoryGymsRepository()
    sut = new CreateGymCase(repo)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.handle({
      title: 'Academia Omni',
      description: 'Academia e Crossfit Omni',
      latitude: -15.8242778,
      longitude: -48.0307621,
      phone: '6130536300',
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
