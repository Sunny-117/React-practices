<template>
  <transition name="slide-fade">
    <div 
      class="message_container" 
      v-show="isShow"
    >
      <svg
        class="icon"
        aria-hidden="true"
      >
        <use :xlink:href="icons[type]" />
      </svg>
      <span class="text">{{ text }}</span>
    </div>
  </transition>
</template>
<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'success'
  },
  text: {
    type: String,
    default: ''
  },
  afterRemoveFun: {
    type: Function,
    default: () => { }
  }
});
const icons = reactive({
  success: '#icon-chenggong',
  warning: '#icon-jinggao',
  error: '#icon-cuowu'
});
const isShow = ref(true);
setTimeout(() => {
  isShow.value = false;
  props.afterRemoveFun();
}, 2000);

</script>

<style lang="scss">
.message_box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  z-index: 9999;
  transition: top 0.4s ease;
  pointer-events: none;
}
.message_container {
  display: inline-block;
  padding: 0 25px;
  margin-top: 20px;
  line-height: 46px;
  color: #000;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);;
  .icon {
    width: 1em;
    height: 1em;
    margin-right: 10px;
    vertical-align: middle;
    fill: currentColor;
    overflow: hidden;
  }
  .text {
    vertical-align: middle;
  }
}
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>