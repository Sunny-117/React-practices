<template>
  <div class="not_found">
    <div class="info">
      <span class="letter">该</span>
      <span class="letter">死</span>
      <span class="letter">，</span>
      <span class="letter">页</span>
      <span class="letter">面</span>
      <span class="letter">找</span>
      <span class="letter">不</span>
      <span class="letter">到</span>
      <span class="letter">了</span>
    </div>
    <img 
      src="/img/404.png" 
      alt="404"
    >
  </div>
</template>
<script>

</script>
<style lang="scss">
.not_found {
  height: 100%;
  .info {
    margin: 110px;
    font-size: 34px;
    text-align: center;
    .letter {
      animation: bounce .5s cubic-bezier(0, 0.43, 0.26, 0.98) infinite
        alternate;
      display: inline-block;
      transform: translate3d(0, 0, 0);
      margin-top: 0.5em;
      padding: 0 10px;
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
      &:nth-child(5) {
        animation-delay: 0.4s;
      }
      &:nth-child(6) {
        animation-delay: 0.5s;
      }
      &:nth-child(7) {
        animation-delay: 0.6s;
      }
      &:nth-child(8) {
        animation-delay: 0.7s;
      }
      &:nth-child(9) {
        animation-delay: 0.8s;
      }
    }
  }
  img {
    width: 100%;
  }
}
@keyframes bounce {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, -1em, 0);
  }
}
</style>