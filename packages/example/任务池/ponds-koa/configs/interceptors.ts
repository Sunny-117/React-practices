import { Action, Interceptor, InterceptorInterface } from 'routing-controllers'
import { Service } from 'typedi'

@Interceptor()
@Service()
export class AutoAssignJSONInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any): any {
    if (typeof content === 'object')
      // console.log(content)
      return JSON.stringify(Object.assign(content, { code: 200 }))
    // return JSON.stringify({ message: content })
  }
}
