<template>
  <div>
    <teleport :to="activeComponentId">
      <div
        @keydown="deleteComp"
        v-show="isShow"
        class="frame"
        :class="{danger: isDanger}"
        @click.stop
        @mousedown.stop="startDragComponent"
      >
        <delete-component @deleteHover="setDanger" @deleteLeave="setNormal" class='deleteButton'/>
        <component-resizer @mousedown.stop :id="$store.state.editPage.activeComponentId" />
      </div>
    </teleport>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import DeleteComponent from './childComps/DeleteComponent.vue'
import throttle from '@/utils/throttle'
import getActiveContainer from './childComps/getActiveContainer'

export default {
  setup() {
    const store = useStore()
    let activeComponentId = computed(() =>
      store.state.editPage.activeComponentId !== -1
        ? '#component' + store.state.editPage.activeComponentId
        : 'body'
    )
    let isShow = computed(() => store.state.editPage.activeComponentId !== -1);
  
    function startDragComponent(e) {
     
      const clientX = e.clientX
      const clientY = e.clientY
      let isMouseDown = true;
      let activeContainerId = -1;

      // 获取 鼠标在 目标组件的 left 和 top
      const{offsetX: mouseLeft, offsetY: mouseTop} = e;

      const style = {
        'pointer-events':'none'
      }
      store.commit('editPage/setActiveComponentTempStyle', style)
      document.onmousemove = throttle( function (e) {
        if (!isMouseDown) {
          return false
        }
        const changeX = e.clientX - clientX
        const changeY = e.clientY - clientY

        const style = {
          transform: `translate(${changeX}px, ${changeY}px)`,
        }

        const newActiveContainerId = getActiveContainer(e.target);
        // 变化了才提交
        if(newActiveContainerId !== activeContainerId){
          activeContainerId = newActiveContainerId;
          store.commit('editPage/setActiveContainer', newActiveContainerId);
        }

        store.commit('editPage/setActiveComponentTempStyle', style)
      })

      document.onmouseup = function (e) {
        // 放下后，让组件添加到当前鼠标执行容器
        if (!isMouseDown) {
          return false
        }
        isMouseDown = false

        const to = store.state.editPage.activeContainerId;
        const targetId = store.state.editPage.activeComponentId;
        const from = store.state.editPage.components.get(targetId).parentId;

        store.commit('editPage/resetActiveContainer')
        store.commit('editPage/resetActiveComponent')
        store.commit('editPage/clearActiveComponentTempStyle', targetId)

        store.commit('editPage/moveComponent', {to, from, targetId, position: {left: e.offsetX - mouseLeft, top: e.offsetY - mouseTop}})
        document.onmousemove = null;
        document.onmouseup = null;
      }
    }

    return { activeComponentId, isShow,startDragComponent }
  },
  data(){
    return {
      isDanger: false
    }
  },
  components:{ DeleteComponent},
  methods:{
    setDanger(){
      this.isDanger = true;
    },
    setNormal(){
      this.isDanger = false;
    }
  }
}
</script>

<style scoped>
.frame {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
  transition:box-shadow 0.1s ease;
  box-shadow: 0 0 5px 0 #4a8af4;
}

.danger {
  box-shadow: 0 0 5px 0 #e63946;
}

.frame:hover{
  cursor: move;
}

.deleteButton{
  position:absolute;
  top:0;
  right:0;
  transform: translate(50%, -50%);
}
</style>