<script setup>
import 'normalize.css/normalize.css';
import {useStore} from 'vuex';
import {onMounted} from 'vue';
import LoginForm from '@/components/LoginForm/LoginForm.vue';
import NavBar from './components/NavBar.vue';
import Message from './components/ShowMessage';
import api from './api';
import ProjectEditNav from '@/components/EditPageComponent/ProjectEditNav.vue';

const store = useStore();
onMounted(async () => {
  const token = localStorage.getItem('token');
  if (token) {
    store.commit('setToken', token);
    const {data} = await api.getUserInfo();
    if (data) {
      store.commit('setUsername', data.username);
    } else {
      Message.error('登录过期了，请重新登录');
      store.commit('setToken', null);
      store.commit('handleLoginFormClose');
    }
  }
});

Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
};

import {ref, watch} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
let isprojectEditPage = ref(false);

watch(
  () => router.currentRoute.value.path, // 当前页面的path
  (path) => {
    isprojectEditPage.value = path.search('projectEdit') == 1 ? true : false;
  },
  {
    deep: false, // 是否采用深度监听
    immediate: false, // 首次加载是否执行
  }
);
</script>

<template>
  <div class="container">
    <NavBar v-if="!isprojectEditPage" />
    <ProjectEditNav v-if="isprojectEditPage" />
    <LoginForm v-if="store.state.loginFormClose" />
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
</style>
