<template>
  <div class="login">
    <label for="account">账号</label>
    <input 
      type="text" 
      id="account" 
      placeholder="请输入8-20位以内的数字或字母" 
      v-model="account" 
    >
    <div class="form_error">
      {{ accountError }}
    </div>
    <label for="password">密码</label>
    <input 
      type="password" 
      id="password" 
      placeholder="请输入8-20位以内的数字或字母" 
      v-model="pwd"
      @keyup.enter="login"
    >
    <div class="form_error">
      {{ pwdError }}
    </div>
    <div 
      class="login_form_button" 
      @click="login"
    >
      登录
    </div>
  </div>
</template>

<script setup>

import { useStore } from 'vuex';
import { useForm, useField } from 'vee-validate';
import Message from '@/components/ShowMessage';
import api from '@/api';

const store = useStore();

const simpleSchema = {
  account(value) {
    if (!value) return;
    if (!/^\w{8,20}$/.test(value)) return '需要8-20位以内的数字或字母';
    return true;
  },
  pwd(value) {
    if (!value) return;
    if (!/^\w{8,20}$/.test(value)) return '需要8-20位以内的数字或字母';
    return true;
  },
};
useForm({
  validationSchema: simpleSchema,
});

const { value: account, errorMessage: accountError, meta: accountMeta } = useField('account');
const { value: pwd, errorMessage: pwdError, meta: pwdMeta } = useField('pwd');

const login = async () => {
  const valid = accountMeta.valid && pwdMeta.valid;
  if (valid) {
    const res = await api.login({ account: account.value, pwd: pwd.value });
    if (res.code === 2000) {
      Message.success(res.message);
      store.commit('handleLoginFormClose');
      store.commit('setToken',res.data.token);
      localStorage.setItem('token',res.data.token);
      const {data}=await api.getUserInfo();
      store.commit('setUsername',data.username);
    } else {
      Message.error(res.message);
    }
  } else {
    Message.warning('请正确填写信息');
  }
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  label {
    font-size: 18px;
    margin-top: 15px;
  }
  input {
    height: 44px;
    padding-left: 10px;
    margin-top: 15px;
    line-height: 44px;
    border: 1px solid #dddddd;
    border-radius: 2px;
  }
  .form_error {
    height: 14px;
    font-size: 14px;
    color: red;
  }
  .login_form_button {
    margin: 38px 0px;
    font-size: 18px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background-color: rgb(0, 73, 184);
    cursor: pointer;
  }
}
</style>