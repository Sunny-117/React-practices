import { Prisma } from '@prisma/client'
import { Service } from 'typedi'
import prisma from '../helpers/client'

@Service()
export class HistoryService {
  async getHistoryById(userId: number) {
    const historySelect: Prisma.HistorySelect = {
      id: true,
      userId: true,
      taskId: true,
      createdAt: true,
      fromPont: true,
      toPont: true,
    }
    return prisma.history.findMany({
      where: {
        userId,
      },
      select: historySelect,
    })
  }

  async createHistory(historyInfo: Prisma.HistoryCreateInput) {
    return prisma.history.create({
      data: historyInfo,
    })
  }
}
