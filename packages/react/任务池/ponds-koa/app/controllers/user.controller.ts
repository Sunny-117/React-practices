import {
  BadRequestError,
  Post,
  JsonController,
  Get,
  Put,
  Body,
  UseBefore,
  Ctx,
} from 'routing-controllers'
import { UserService } from '../services'
import { Prisma } from '@prisma/client'
import { Service } from 'typedi'
import { genAccessToken, genRefreshToken } from '../helpers/jwt'
import { AuthHeaderMiddleware } from '../helpers/authHeader'
import genPassword from '../helpers/crypto'

@JsonController('/user')
@Service()
export class UserController {
  constructor(private userService: UserService) {}

  // TODO 注册参数使用 class-validator 校验
  @Post('/register')
  async register(@Body() registerParmObj: Prisma.UserCreateInput & { smsCode: String }) {
    const { phone, username, nickname, password, smsCode } = registerParmObj
    const registerParmArr = ['phone', 'username', 'nickname', 'password', 'smsCode']
    registerParmArr.forEach(item => {
      if (!registerParmObj[item]) {
        throw new BadRequestError(`${item} is required`)
      }
    })
    const registerRes = await this.userService.register({
      phone,
      username,
      nickname,
      password: genPassword(password),
    })
    if (registerRes) {
      const access_token = genAccessToken({ userId: registerRes.id })
      const refresh_token = genRefreshToken({ userId: registerRes.id })
      return {
        msg: '注册成功',
        data: Object.assign(registerRes, { access_token, refresh_token }),
      }
    } else {
      throw new BadRequestError('注册失败')
    }
  }

  @Post('/login')
  async login(@Body() loginParmObj: { username: string; password: string }) {
    const { username, password } = loginParmObj
    const loginParmArr = ['username', 'password']
    loginParmArr.forEach(item => {
      if (!loginParmObj[item]) {
        throw new BadRequestError(`${item} is required`)
      }
    })
    const loginRes = await this.userService.login({
      username,
      password: genPassword(password),
    })
    if (loginRes) {
      const access_token = genAccessToken({ userId: loginRes.id })
      const refresh_token = genRefreshToken({ userId: loginRes.id })
      return {
        msg: '登录成功',
        data: Object.assign(loginRes, { access_token, refresh_token }),
      }
    } else {
      throw new BadRequestError('用户名密码不匹配')
    }
  }

  @Get()
  @UseBefore(AuthHeaderMiddleware)
  async getInfo(@Ctx() ctx: any) {
    const { userId } = ctx
    const getInfoRes = await this.userService.getInfoById(userId)
    if (getInfoRes) {
      return { msg: '获取用户信息成功', data: getInfoRes }
    }
  }

  @Put()
  @UseBefore(AuthHeaderMiddleware)
  async update(
    @Ctx() ctx: any,
    @Body()
    updateParmObj: Omit<Prisma.UserUpdateInput, 'username' | 'createAt' | 'updateAt'>,
  ) {
    const { userId } = ctx
    const { nickname, password, phone, avatar } = updateParmObj
    const updateInfoRes = await this.userService.updateInfo({
      where: {
        id: userId,
      },
      data: {
        nickname,
        password,
        phone,
        avatar,
      },
    })
    if (updateInfoRes) {
      return { msg: '修改用户信息成功', data: updateInfoRes }
    } else {
      throw new BadRequestError('修改用户信息失败')
    }
  }

  // 测试使用
  @UseBefore(AuthHeaderMiddleware)
  @Post('/test/delete')
  async delete(@Ctx() ctx: any) {
    const { userId } = ctx
    const deleteRes = await this.userService.deleteById(userId)
    return { msg: '删除用户成功', data: deleteRes }
  }
}
