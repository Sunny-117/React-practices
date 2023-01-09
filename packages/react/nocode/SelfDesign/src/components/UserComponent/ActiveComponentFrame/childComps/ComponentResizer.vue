<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import ResizeWidget from './ResizeWidget.vue';

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['sizeChange']);

const store = useStore();

const activeComponent = computed(() => store.state.editPage.components.get(props.id) ?? null);

const idPrefix = 'component';
const activeComponentDOMRef = computed(() => document.getElementById(`${idPrefix}${props.id}`));
const activeComponentStyle = computed(() =>
  activeComponentDOMRef.value ?
    (
      {
        width: `${activeComponentDOMRef.value.offsetWidth}px`,
        height: `${activeComponentDOMRef.value.offsetHeight}px`
      }
    ) :
    null
);

const widthInPx = computed(() => {
  /** @type {string} */
  let tryWidth;
  tryWidth = activeComponent.value?.style.width;
  if ((!tryWidth || tryWidth.endsWith('%')) && activeComponentStyle.value) tryWidth = activeComponentStyle.value.width;
  return tryWidth ?? '0px';
});

const heightInPx = computed(() => {
  /** @type {string} */
  let tryHeight;
  tryHeight = activeComponent.value?.style.height;
  if ((!tryHeight || tryHeight.endsWith('%')) && activeComponentStyle.value) tryHeight = activeComponentStyle.value.height;
  return tryHeight ?? '0px';
});

const changeComponentSizeTo = ({ width, height }) => {
  store.commit('editPage/setActiveComponentSize', { widthInPx: width, heightInPx: height });
};

const onSizeChange = (delta) => {

  const { deltaX, deltaY } = delta;

  let nextWidth = parseInt(widthInPx.value) + deltaX;
  if (nextWidth < 0) nextWidth = 0;
  let nextHeight = parseInt(heightInPx.value) + deltaY;
  if (nextHeight < 0) nextHeight = 0;
  changeComponentSizeTo({
    width: `${nextWidth}px`,
    height: `${nextHeight}px`
  });
};

const onResizeEnd = () => {
  store.commit('editPage/setActiveComponentStyle', {});

  emit('sizeChange');
};

</script>

<template>
  <ResizeWidget
    style="z-index: 1; top: 100%; left: 100%; transform: translate(-50%, -50%);"
    @size-change="onSizeChange"

    @resize-end="onResizeEnd"
  />
</template>