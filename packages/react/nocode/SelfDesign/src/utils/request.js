/**
 * axiox二次封装
 */
import axios from 'axios';
import config from '../config';
import router from '@/router';
import store from '@/store';

//axiox实例
const service = axios.create({
  baseUrl: config.baseApi,
  timeout: 8000
});

//请求拦截
service.interceptors.request.use((req) => {
  const headers = req.headers;
  const token = localStorage.getItem('token') || '';
  if (!['/user/login', '/user/register'].includes(req.url))
    headers.token = token;
  return req;
});

//响应拦截
service.interceptors.response.use((res) => {
  const { code } = res.data;
  if (code === 4002) {
    store.commit('setLoginFormClose',true);
    store.commit('setToken',undefined);
    store.commit('setUsername',undefined);
    localStorage.removeItem('token');
    router.push('/project');
  }
  return res.data;
});

const  request = (options) => {
  options.method = options.method || 'get';
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data;
  }
  let isMock = config.mock;
  if (typeof options.mock != 'undefined') {
    isMock = options.mock;
  }
  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi;
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
  }
  return service(options);
};

['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
  request[item] = (url, data, options) => {
    return request({
      url,
      data,
      method: item,
      ...options
    });
  };
});

export default request;