import { Post, JsonController, BodyParam, UnauthorizedError } from 'routing-controllers'
import { Service } from 'typedi'
import { genAccessToken, genRefreshToken, verifyToken } from '../helpers/jwt'

@JsonController('/token')
@Service()
export class TokenController {
  constructor() {}
  @Post('/refresh')
  async refresh(@BodyParam('refresh_token') old_refresh_token: string) {
    let userId
    try {
      userId = verifyToken(old_refresh_token).data.userId
    } catch (error) {
      throw new UnauthorizedError('Refresh_token expired.\n') //错误信息待优化
    }
    const access_token = genAccessToken({ userId })
    const refresh_token = genRefreshToken({ userId })
    return {
      msg: 'refresh token success!',
      data: { access_token, refresh_token },
    }
  }
}
