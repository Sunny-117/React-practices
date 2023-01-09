<template>
  <div>
    <span>敬</span>
    <span>请</span>
    <span>期</span>
    <span>待</span>
  </div>
</template>
<script setup>

</script>
<style scoped lang="scss">
div {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 70vh;

  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}


@keyframes bounce {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, -1em, 0);
  }
}

span {
  font-size: 48px;
}
span {

  animation: bounce .5s cubic-bezier(0, 0.43, 0.26, 0.98) infinite alternate;

  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.1s;
  }
  &:nth-child(3) {
    animation-delay: 0.2s;
  }
  &:nth-child(4) {
    animation-delay: 0.3s;
  }
}
</style>