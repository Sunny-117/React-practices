import { KoaMiddlewareInterface, Middleware } from 'routing-controllers'
import { Service } from 'typedi'

@Middleware({ type: 'before' })
@Service()
export class HeaderMiddleware implements KoaMiddlewareInterface {
  async use(context: any, next: (err?: any) => any): Promise<any> {
    context.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH')
    context.set(
      'Access-Control-Allow-Origin',
      // context.request.header.origin || context.request.origin,
      '*',
    )
    context.set('Access-Control-Allow-Headers', ['content-type'])
    context.set('Access-Control-Allow-Credentials', 'true')
    context.set('Content-Type', 'application/json; charset=utf-8')
    return next()
  }
}

@Middleware({ type: 'before' })
@Service()
export class ErrorHandlerMiddleware implements KoaMiddlewareInterface {
  async use(ctx: any, next: (err?: any) => any) {
    return next().catch(err => {
      const ret = {
        code: err.httpCode,
        message: err.message,
      }
      ctx.response.status = 200 //伪装为请求都成功，前端通过data的code判断实际请求status
      ctx.res.end(JSON.stringify(ret))
    })
  }
}
