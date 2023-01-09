<template>
  <teleport to=".main">
    <div
      class="mask"
      @click="toggleLoginForm"
    />
    <div class="login_form">
      <div class="tab_change">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tab_button', { active: currentTabId === tab.id }]"
          @click="currentTabId = tab.id"
        >
          {{ tab.zh }}
        </div>
      </div>
      <keep-alive>
        <component
          :is="tabs[currentTabId].name"
          :key="currentTabId"
        />
      </keep-alive>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import LogIn from './LogIn.vue';
import LogOn from './LogOn.vue';

const store=useStore();

const tabs = [{
  id: 0,
  name: LogIn,
  zh: '登录'
}, {
  id: 1,
  name: LogOn,
  zh: '注册'
}];
const currentTabId = ref(0);

const toggleLoginForm = () => store.commit('handleLoginFormClose');
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
}

.login_form {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 75px;
  left: 536px;
  width: 400px;
  background-color: #fff;
  border-radius: 6px;
  .tab_change {
    display: flex;
    justify-content: space-around;
    margin: 30px 30px;
    margin-bottom: 10px;
    font-size: 18px;
    .tab_button {
      &.active {
        color: rgb(0, 73, 184);
        padding-bottom: 5px;
        border-bottom: 3px solid rgb(0, 73, 184);
      }
    }
  }
}


</style>