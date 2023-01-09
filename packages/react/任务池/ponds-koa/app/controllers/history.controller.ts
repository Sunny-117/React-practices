import { Prisma } from '@prisma/client'
import { Body, Ctx, Get, JsonController, Post, UseBefore } from 'routing-controllers'
import { Service } from 'typedi'
import { AuthHeaderMiddleware } from '../helpers/authHeader'
import { HistoryService } from 'app/services'

@JsonController('/history')
@Service()
@UseBefore(AuthHeaderMiddleware)
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get()
  async query(@Ctx() ctx: any) {
    const { userId } = ctx
    const data = (await this.historyService.getHistoryById(
      userId,
    )) as Prisma.HistorySelect[]
    return {
      msg: '获取历史列表成功',
      data: data.map(item => ({
        id: item.id,
        user_id: item.userId,
        task_id: item.taskId,
        date: item.createdAt,
        from_pont: item.fromPont,
        to_pont: item.toPont,
      })),
    }
  }
  @Post()
  async create(@Ctx() ctx: any, @Body() history: Prisma.HistoryCreateInput) {
    const { userId } = ctx
    const { toPont, fromPont, taskId } = history
    const data = {
      userId,
      toPont: Number(toPont),
      fromPont: Number(fromPont),
      taskId: Number(taskId),
    }

    const res = await this.historyService.createHistory(data)

    return {
      msg: '添加历史成功',
      data: {
        id: res.id,
        user_id: res.userId,
        task_id: res.taskId,
        date: res.createdAt,
        from_pont: res.fromPont,
        to_pont: res.toPont,
      },
    }
  }
}
