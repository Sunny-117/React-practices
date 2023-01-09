import * as controllers from 'app/controllers'
import { RoutingControllersOptions } from 'routing-controllers'
import * as interceptors from './interceptors'
import * as middlewares from './routing.middlewares'
import { dictToArray } from './utils'

export const routingConfigs: RoutingControllersOptions = {
  controllers: dictToArray(controllers),

  middlewares: dictToArray(middlewares),

  interceptors: dictToArray(interceptors),

  // router prefix
  // e.g. api => http://hostname:port/{routePrefix}/{controller.method}
  routePrefix: '/api',

  // auto validate entity item
  // learn more: https://github.com/typestack/class-validator
  validation: true,
  // 禁用默认错误处理
  defaultErrorHandler: false,
}
