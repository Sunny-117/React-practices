/**
 * 环境配置
 * dev是开发环境,prod是生产环境,如果开启mock他的根路径是mockApi,否则是baseApi
 */
const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
  dev: {
    baseApi: '/api',
    mockApi: 'https://www.fastmock.site/mock/c213efb03a5cad1915f73f29ba1080b0/api'
  },
  prod: {
    baseApi: '/api',
    mockApi: 'https://www.fastmock.site/mock/c213efb03a5cad1915f73f29ba1080b0/api'
  }
};
export default {
  env,
  mock: false,//是否全局开启mock
  namespace: 'selfDesign',
  ...EnvConfig[env]
};