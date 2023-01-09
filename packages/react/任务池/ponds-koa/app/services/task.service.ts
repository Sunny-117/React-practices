import { Prisma } from '@prisma/client'
import { Service } from 'typedi'
import prisma from '../helpers/client'

@Service()
export class TaskService {
  static taskSelect: Prisma.TaskSelect = {
    id: true,
    title: true,
    description: true,
    startDate: true,
    endDate: true,
    pond: true,
    importance: true,
    urgency: true,
    sort: true,
  }
  async findById(userId) {
    return prisma.task.findMany({
      where: {
        userId
      },
      select: TaskService.taskSelect
    })
  }
  async create(task: Prisma.TaskCreateInput) {
    const count = await prisma.task.count({
      where: {
        userId: task.userId,
      }
    })
    return prisma.task.create({
      data: {
        ...task,
        sort: count + 1
      },
    })
  }
  async deleteById(userId: number, taskId: number) {
    return prisma.task.deleteMany({
      where: {
        userId,
        id: taskId
      }
    })
  }
  async editTask(data: Prisma.TaskUpdateInput, taskId: number) {
    return prisma.task.update({
      data,
      where: {
        id: taskId
      },
      select: TaskService.taskSelect
    })
  }
}
