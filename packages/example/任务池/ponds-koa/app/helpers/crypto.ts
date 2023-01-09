import crypto from 'crypto'

// 密匙
const SECRET_KEY = 'pondsPasswordSecretKey'

// md5 加密
function md5(content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex') // 把输出编程16进制的格式
}

// 加密函数
export default function genPassword(password) {
  const str = `password=${password}&key=${SECRET_KEY}`
  return md5(str)
}

// console.log(md5('123'))
// console.log(genPassword('123'))
