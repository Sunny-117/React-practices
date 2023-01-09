<script setup>
import {computed} from 'vue';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
});

const value = computed(() => props.value);
</script>

<script>
export default {
  name: 'UserText',
};
</script>

<template>
  <p><slot>{{ value }}</slot></p>
</template>

<style scoped>
p {
  width: 100px;
  height: 30px;
	text-align: center;
  outline: 1px dashed #aaaaaa;
}
</style>
