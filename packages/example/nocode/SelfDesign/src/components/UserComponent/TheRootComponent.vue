<template>
  <component-decorator :id="rootNode.id" v-slot="{data}">
    <component
      :is="componentMap.get(content.root.tag)"
      @click.stop
      v-bind="data"
      :component-id="rootNode.id"
      :id="'component' + rootNode.id"
      style="min-height: 527px"
    />
  </component-decorator>
  <active-component-frame />
</template>

<script>
import {reactive} from 'vue-demi';
import {useStore} from 'vuex';
import ActiveComponentFrame from './ActiveComponentFrame/ActiveComponentFrame.vue';
import componentMap from './componentMap';
import useUserComponentTransformer from './transformers';
export default {
  components: {ActiveComponentFrame},
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    useUserComponentTransformer();
    const store = useStore();
    const rootNode = reactive(props.content.root);
    store.commit('editPage/setFileContent', props.content); // 把 除 root 外的其他属性保存到 content 里
    store.commit('editPage/initComponents', {node: rootNode, parentId: 0}); // 初始化组件
    return {
      componentMap,
      rootNode,
    };
  },
};
</script>

<style scoped></style>
