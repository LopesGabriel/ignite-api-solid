import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { IUsersRepository } from '../users-repository'

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })
    return user
  }

  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    })
  }
}
