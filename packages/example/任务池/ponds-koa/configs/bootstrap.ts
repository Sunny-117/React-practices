import { join } from 'path'
import { print } from './utils'
import dotenv from 'dotenv'

const envConfigPath = {
  development: join(__dirname, '../.env'), // 开发环境配置
  test: join(__dirname, '../.env.test'), // 测试环境配置
  production: join(__dirname, '../.env.production'), // 正式环境配置
};

// "before" will trigger before the app lift.
export const bootstrapBefore = (): object => {
  // solve ncc path link.
  const result = dotenv.config({ path: envConfigPath[process.env.NODE_ENV.trim()] })
  if (result.error) {
    print.danger('Environment variable not loaded: not found ".env" file.')
    return {}
  }
  print.log('.env loaded.')
  return result.parsed
}

// "after" will trigger after the "container" mounted..
export const bootstrapAfter = (): any => {}
