import jwt from 'jsonwebtoken'
import { UnauthorizedError } from 'routing-controllers'

const SECRET_KEY = 'pondsTokenSecretKey'
const ACCESS_TOKEN_EXPIRS_TIME = 60 * 60 * 24 // 24h
const REFRESH_TOKEN_EXPIRS_TIME = 60 * 60 * 24 * 15 // 24h * 15

interface TokenData {
  userId: number
}

interface DecodeToken {
  data: TokenData
}

export const genAccessToken = (data: TokenData) => {
  return jwt.sign({ data }, SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRS_TIME })
}

export const genRefreshToken = (data: TokenData) => {
  return jwt.sign({ data }, SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRS_TIME })
}

export const decodeToken: (Authorization) => DecodeToken = Authorization => {
  try {
    // Authorization 格式为 Bearer <token>
    const token = Authorization.split(' ')[1]
    return jwt.verify(token, SECRET_KEY)
  } catch (e) {
    throw new UnauthorizedError('Token expired or.\n')
  }
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY)
}

// // 测试函数（把 EXPIRS_TIME 改为 1）
// // 运行 pnpm ts-node-dev ./app/helpers/jwt.ts
// const token = genToken({ id: 1 })
// console.log('token', token)
// console.log(decodeToken(token))
// setTimeout(() => {
//   console.log(decodeToken(token))
// }, 1000 * 61)
