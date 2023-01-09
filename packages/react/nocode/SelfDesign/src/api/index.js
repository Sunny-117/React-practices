/**
 * 例如
 * login(params) {
        return request({
            url: '/users/login',
            method: 'POST',
            data: params,         //传输的数据
            mock: true            //是否开启mock,默认(没有写)是不开启
        })
    },
 */
import request from '../utils/request';
import fileDownload from 'js-file-download';

export default {
  async login(params) {
    return request({
      url: '/user/login',
      method: 'POST',
      data: params
    });
  },
  async register(params) {
    return request({
      url: '/user/register',
      method: 'POST',
      data: params
    });
  },
  async getUserProject(){
    return request({
      url:'/project/getUserProject',
      method:'GET'
    });
  },
  async getUserInfo(){
    return request({
      url:'/user/getUserInfo',
      method:'GET'
    });
  },
  async modifyUsername(params){
    return request({
      url:'/user/modifyUsername',
      method:'POST',
      data: params
    });
  },
  async download(params){
    return request({
      url:'/project/export',
      method:'GET',
      data:{ id:params },
      responseType: 'blob'
    }).then(res=>{
      fileDownload(res, params + '.json');
    });
  },
  async deleteProject(params){
    return request({
      url:'/project/deleteProject',
      method:'POST',
      data: params
    });
  },
  async createProject(params){
    return request({
      url:'/project/createProject',
      method:'POST',
      data:params
    });
  },
  async modifyName(params){
    return request({
      url:'/project/modifyName',
      method:'POST',
      data:params
    });
  },
  async getProjectContent(params){
    return request({
      url:'/project/getProjectContent',
      method:'GET',
      data:params
    });
  },
  async release(params){
    return request({
      url:'/project/release',
      method:'POST',
      data:params
    });
  },
  async modifyContent(params){
    return request({
      url:'/project/modifyContent',
      method:'POST',
      data:params
    });
  },
  importProject({ projectName, file }) {
    const form=new FormData();
    form.append('projectName',projectName);
    form.append('file',file);
    return request({
      url: '/project/import',
      method: 'post',
      data: form
    });
  },
  uploadImg(file){     //file就是图片文件
    const form=new FormData();
    form.append('file',file);
    return request({
      url:'/other/uploadImg',
      method:'POST',
      data:form
    });
  },
};