<template>
  <div class="edit-page">
    <component-panel />
    <div id="canvaspage-outsidebox" @click="resetChooseNode">
      <canvas-page />
      <div class="zoom-box">
        <ul>
          <li>
            <button id="plusBtn" @click="increaseSize" />
          </li>
          <li>
            <button id="minusBtn" @click="reduceSize" />
          </li>
          <li>
            <el-select v-model="scaleNum">
              <el-option
                v-for="item in options"
                :key="item.scaleNum"
                :label="item.label"
                :value="item.scaleNum"
              />
            </el-select>
          </li>
        </ul>
      </div>
    </div>
    <control-panel />
  </div>
</template>
<script>
import {ref, provide} from 'vue';
import {useStore} from 'vuex';
import ComponentPanel from '@/components/EditPageComponent/ComponentPanel.vue';
import CanvasPage from '@/components/EditPageComponent/CanvasPage.vue';
import ControlPanel from '@/components/EditPageComponent/ControlPanel.vue';
import {RESET_HISTORY_KEY} from '../store/plugins/history';

export default {
  name: 'ProjectEdit',
  components: {
    ComponentPanel,
    CanvasPage,
    ControlPanel,
  },

  unmounted() {
    // 清空 store.editPage 里的所有状态
    this.$store.commit('editPage/clearAllStates');

    this.$store.dispatch(RESET_HISTORY_KEY);
  },

  setup() {
    let scaleNum = ref('100%');
    const options = [
      {
        scaleNum: '200%',
        label: '200%',
      },
      {
        scaleNum: '150%',
        label: '150%',
      },
      {
        scaleNum: '125%',
        label: '125%',
      },
      {
        scaleNum: '100%',
        label: '100%',
      },
      {
        scaleNum: '75%',
        label: '75%',
      },
      {
        scaleNum: '50%',
        label: '50%',
      },
      {
        scaleNum: '25%',
        label: '25%',
      },
    ];

    // 点击事件
    const increaseSize = () => {
      if (parseInt(scaleNum.value) < 200) {
        scaleNum.value = parseInt(scaleNum.value) + 25 + '%';
      }
    };
    const reduceSize = () => {
      if (parseInt(scaleNum.value) > 25) {
        scaleNum.value = parseInt(scaleNum.value) - 25 + '%';
      }
    };

    // 按键事件
    document.onkeydown = (e) => {
      // ctrl +
      if (e.ctrlKey && e.keyCode == 187) {
        increaseSize();
        // 阻止默认事件
        if (e && e.preventDefault) {
          e.preventDefault();
        } else {
          window.event.returnValue = false;
        }
      }
      // ctrl -
      if (e.ctrlKey && e.keyCode == 189) {
        reduceSize();
        // 阻止默认事件
        if (e && e.preventDefault) {
          e.preventDefault();
        } else {
          window.event.returnValue = false;
        }
      }
    };

    provide('scaleNum', scaleNum);

    // 点击空白处取消点击事件
    const store = useStore();
    const resetChooseNode = () => {
      store.commit('editPage/resetActiveComponent');
    };

    return {
      scaleNum,
      options,
      increaseSize,
      reduceSize,
      resetChooseNode,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
.edit-page {
  display: flex;
  height: calc(100vh - 61px);
  justify-content: space-between;
  background-color: #e9ebed;
  overflow: hidden;
}

/* 中间画布缩放处理 */
#canvaspage-outsidebox {
  position: relative;
  display: flex;
  width: calc(100vw - 250px);
  /* min-width: 800px; */
  height: calc(100vh - 63px);
  justify-content: center;
  overflow: scroll;
  direction: ltr;
}

/* ----------- 滚动条 ----------- */
#canvaspage-outsidebox::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #e9ebed;
}

/*定义滚动条轨道 内阴影+圆角*/
#canvaspage-outsidebox::-webkit-scrollbar-track {
  border-radius: 6px;
  background-color: #e9ebed;
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.25); */
}

/*定义滑块 内阴影+圆角*/
#canvaspage-outsidebox::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #888888;
  -webkit-box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
}

/* 画板缩放控件 */
.zoom-box {
  position: absolute;
  right: 2%;
  bottom: 5%;
  width: 166px;
  height: 46px;
  background: #ffffff;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.1607843137254902);
  border-radius: 4px;
  border: 1px solid #dbdfe4;
}

.zoom-box button {
  margin: 10px 0 10px 10px;
  width: 25px;
  height: 25px;
  background: url(/img/EditIcons/zoom_icon.png);
  background-size: auto 25px;
  background-repeat: no-repeat;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
}

#minusBtn {
  background-position: -25px 0;
}

.zoom-box > ul {
  display: flex;
  list-style: none;
}

.zoom-box > ul > li:nth-child(3) {
  margin: 5px 0 0 8px;
  width: 82px;
  height: 36px;
  line-height: 36px;
}

/* .zoom-box > ul > li:nth-child(4) {
  margin-left: 6px;
  width: 32px;
  height: 46px;
  text-align: center;
  background-color: #fafafb;
  border-radius: 0px 4px 4px 0px;
  border-left: 1px solid #dbdfe4;
}

.zoom-box > ul span {
  display: inline-block;
  margin-top: 10px;
  width: 25px;
  height: 25px;
  background: url(/img/EditIcons/zoom_icon.png);
  background-position: -50px 0;
  background-repeat: no-repeat;
  background-size: auto 25px;
  cursor: pointer;
}

.zoom-box > ul span:hover {
  background-position: -75px 0;
} */
</style>
