import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

export class InMemoryUserRepository implements IUsersRepository {
  private items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      created_at: new Date(),
      email: data.email,
      id: randomUUID(),
      name: data.name,
      password_hash: data.password_hash,
      updated_at: new Date(),
    }

    this.items.push(user)
    return user
  }

  async findById(id: string) {
    const user = this.items.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
