import { KoaMiddlewareInterface, Middleware, UnauthorizedError } from 'routing-controllers';
import { Service } from 'typedi';
import { decodeToken } from './jwt';

@Middleware({ type: 'before' })
@Service()
export class AuthHeaderMiddleware implements KoaMiddlewareInterface {
  async use(ctx: any, next: (err?: any) => any) {
    if (!ctx.header || !ctx.header.authorization) {
      throw new UnauthorizedError('Protected resource. use Authorization header to get access\n')
    } else {
      const parts = ctx.header.authorization.split(' ')
      if (parts.length === 2) {
        const schema = parts[0]
        if (/^Bearer$/i.test(schema)) {
          try {
            const { userId } = decodeToken(ctx.header.authorization).data
            ctx.userId = userId
          } catch (error) {
            throw new UnauthorizedError('Token expired or.\n') //错误信息待优化
          }
        } else {
          throw new UnauthorizedError('Bad Authorization header format.\n')
        }
      }
    }
    return next()
  }
}