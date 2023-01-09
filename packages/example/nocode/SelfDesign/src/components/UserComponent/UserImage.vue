<script setup>
import {computed, ref, watch} from 'vue';
import EMPTY_IMAGE from '@/assets/image_empty.png';
import ERROR_IMAGE from '@/assets/image_error.png';
import LOADING_IMAGE from '@/assets/image_loading.png';

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 120;

const props = defineProps({
  alt: {
    type: String,
    default: '',
  },
  src: {
    type: [String, null],
    default: null,
  },
  width: {
    type: [Number, String, null],
    default: null,
  },
  height: {
    type: [Number, String, null],
    default: null,
  },
  onLoad: {
    type: [Function, null],
    default: null,
  },
  onError: {
    type: [Function, null],
    default: null,
  },
});

const width = computed(() => {
  if (typeof props.width == 'number') return `${props.width}`;
  if (typeof props.width == 'string') {
    let tryParse = +props.width;
    if (Number.isFinite(tryParse)) return tryParse;
  }
  return props.width ?? DEFAULT_WIDTH;
});

const height = computed(() => {
  if (typeof props.height == 'number') return `${props.height}`;
  if (typeof props.height == 'string') {
    let tryParse = +props.height;
    if (Number.isFinite(tryParse)) return tryParse;
  }
  return props.height ?? DEFAULT_HEIGHT;
});

/** @type {import('vue').Ref<boolean>} */
const hasError = ref(false);

const src = computed(() => {
  if (hasError.value) return ERROR_IMAGE;
  if (!props.src || props.src === '') return EMPTY_IMAGE;
  return props.src;
});

/** @type {import('vue').Ref<boolean>} */
const loading = ref(true);

const mergedErrorHandler = (e) => {
  loading.value = false;
  hasError.value = true;
  props.onError && props.onError(e);
};

watch(
  () => props.src,
  () => {
    hasError.value = false;
    loading.value = true;
  }
);

const mergedLoadHandler = (e) => {
  loading.value = false;
  props.onLoad && props.onLoad(e);
};
</script>

<script>
export default {
  name: 'UserImage',
};
</script>

<template>
  <div :style="{display: 'inline-block'}">
    <img
      :src="src"
      :alt="props.alt"
      :width="width"
      :height="height"
      :onload="mergedLoadHandler"
      :onerror="mergedErrorHandler"
      :class="{loading, error: hasError, empty: !props.src}"
    />
  </div>
</template>

<style scoped>
img {
  width: v-bind(width);
  height: v-bind(height);

  display: inline-block;
  background: #ffffff;
  border-radius: 2px 2px 2px 2px;
  border: 1px solid #bbbbbb;

  object-fit: cover;
  cursor: auto;
}

.empty,
.error {
  object-fit: scale-down;
}

.loading {
  background-image: v-bind(LOADING_IMAGE);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
</style>
