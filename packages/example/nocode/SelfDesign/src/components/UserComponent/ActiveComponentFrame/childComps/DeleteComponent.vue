<template>
  <span class="circleClose" @mouseenter="enter" @mouseleave="leave" @click.stop="deleteNode" @mousedown.stop>×</span>
</template>

<script>
export default {
  setup() {
    return {}
  },
  emits: ['deleteHover', 'deleteLeave'],
  methods: {
    deleteNode() {
      this.$store.commit('editPage/deleteComponent');
    },
    enter(){
      this.$emit("deleteHover")
    },
    leave(){
      this.$emit('deleteLeave')
    }
  },
}
</script>

<style scoped>
.circleClose {
  display: inline-block;
  width:18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  font-size:16px;
  font-weight: 200;
  outline:2px dotted #4a8af4;
  background-color: #fff;
  color: #4a8af4;
  cursor: pointer;
  border-radius: 50%;
}
.circleClose:hover{
  outline:2px dotted #e63946;
  color: #e63946;
}
</style>