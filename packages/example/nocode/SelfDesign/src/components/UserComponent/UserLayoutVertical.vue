<template>
  <div class="container" :class="{ active: isActive }">
    <component-decorator
      v-for="child in myChildren"
      :key="child.id"
      :id="child.id"
      v-slot="{ data }"
    >
      <component
        @click.stop
        :is="componentMap.get(child.tag)"
        v-bind="data"
        :id="'component' + child.id"
        :style="[
          child.style,
          child.tempStyle,
          {
            position: 'relative',
            'user-select': 'none',
          },
        ]"
      />
    </component-decorator>
  </div>
</template>

<script>
import { toRefs } from '@vue/reactivity'
import { useStore } from 'vuex'
import { computed } from 'vue'
import componentMap from './componentMap'
export default {
  name: 'UserLayoutVertical',
  // tag
  props: {
    componentId: {
      type: Number,
      required: true,
    },
    myChildren: {
      type: Array,
      default: [],
    },
    width: {
      type: [String, Number, null],
      default: '200px',
    },
    height: {
      type: [String, Number, null],
      default: '400px',
    },
    justifyContent: {
      type: String,
      default: 'flex-start',
    },
    alignItems: {
      type: String,
      default: 'center',
    },
  },

  setup(props) {
    const { componentId } = toRefs(props)
    const store = useStore()
    let isActive = computed(
      () => componentId.value === store.state.editPage.activeContainerId
    )
    return {
      isActive,
      componentMap,
    }
  },
}
</script>

<style scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: v-bind(justifyContent);
  align-items: v-bind(alignItems);
  height: v-bind(height);
  width: v-bind(width);
  outline: dashed #aaa;
}
.active {
  outline: #4a8af4 solid 2px;
}
</style>
