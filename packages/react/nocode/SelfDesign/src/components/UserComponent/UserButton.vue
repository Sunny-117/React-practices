<script setup>
import {computed} from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
});

const text = computed(() => props.text);
</script>

<script>
export default {
  name: 'UserButton',
};
</script>

<template>
  <button type="button">
    <slot>{{ text }}</slot>
  </button>
</template>

<style scoped>
button {
  color: #666666;
  font-size: 16px;

  background-color: #f5f5f5;
  border-radius: 6px 6px 6px 6px;
  border: 1px solid #dcdfe6;
  padding: 0.75em 1em;

  cursor: pointer;

  transition: background-color 66ms ease-in;
}

button:hover {
  color: white;

  background-color: #999999;
  border: 1px solid #666666;
}
</style>
