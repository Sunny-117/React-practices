<template>
  <div id="outsidebox">
    <div id="canvas-page">
      <!-- 比例系数：{{ parseInt(scaleCoefficient) * 0.01 }} -->
      <the-root-component v-if="!loading" :content="root" />
    </div>
  </div>
</template>

<script>
import {ref, watch, inject} from 'vue';
import TheRootComponent from '@/components/UserComponent/TheRootComponent.vue';
import {useRoute} from 'vue-router';
import api from '@/api';

export default {
  name: 'CanvasPage',
  components: {
    TheRootComponent,
  },
  setup() {
    // 比例系数
    let scaleCoefficient = inject('scaleNum');
    const modifyCoefficient = () => {
      // let canvasPage = document.getElementById('canvas-page');
      let canvasPage = document.getElementById('outsidebox');
      canvasPage.style.transform = `scale(${parseInt(scaleCoefficient.value) * 0.01})`;
    };

    // 监听修改
    watch(scaleCoefficient, () => {
      modifyCoefficient();
    });

    // 画布根组件的数据传递：初始时不加载，数据传入后加载
    let loading = ref(true);
    let root = ref({});
    const route = useRoute();
    api.getProjectContent({id: route.params.id}).then((res) => {
      console.log('渲染');
      console.log(res);
      root.value = res.data.content;
      loading.value = false;
    });

    return {
      root,
      loading,
      scaleCoefficient,
      modifyCoefficient,
    };
  },
};
</script>

<style scoped>
/* 画布比值为：0.5625，1280*960 */
#outsidebox {
  padding: 50px 50px 0;
  transform-origin: 0 0;
  transform: scale(1);
}

#canvas-page {
  width: 786px;
  /* min-height: 432px; */
  background: #ffffff;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.25098039215686274);
  transition: all ease-in-out 0.4s;
  border: 1px solid #aaaaaa;
}
</style>
