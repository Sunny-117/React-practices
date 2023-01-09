<script setup>
import { ref } from 'vue';

const emit = defineEmits(['sizeChange', 'resizeEnd']);

const lastCoord = ref(null);

const isDragging = ref(false);

const onMouseDown = (e) => {
  isDragging.value = true;
  lastCoord.value = { x: e.clientX, y: e.clientY };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', function f(e) {
    onMouseUp(e);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', f);
  });
};

const onMouseMove = (e) => {
  if (!isDragging.value) return;

  const deltaX = e.clientX - lastCoord.value.x;
  const deltaY = e.clientY - lastCoord.value.y;

  lastCoord.value = { x: e.clientX, y: e.clientY };

  emit('sizeChange', { deltaX, deltaY });
};

const onMouseUp = () => {
  isDragging.value = false;

  emit('resizeEnd');
};
</script>

<template>
  <div
    class="resizer"
    @mousedown="onMouseDown"
  />
</template>

<style>
.resizer {
  box-sizing: border-box;
  position: absolute;

  width: 10px;
  height: 10px;

  background-color: white;
  border: 1px solid black;

  cursor: nw-resize;
}
</style>