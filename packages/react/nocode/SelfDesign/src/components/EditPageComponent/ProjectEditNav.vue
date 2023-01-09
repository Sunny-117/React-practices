<template>
  <div class="edit-nav-box">
    <div class="edit-nav">
      <div class="left-part">
        <div id="user-msg">
          <div id="user-icon">
            {{ userIcon }}
          </div>
          <ul id="to-manage-page">
            <li @click="$router.push('/tutorial')"><i /><span>新手教程</span></li>
            <li @click="$router.push('/project')"><i /><span>项目管理</span></li>
            <li @click="$router.push('/template')"><i /><span>相关模板</span></li>
          </ul>
        </div>
        <div class="file-name">
          <input type="text" v-model="fileName" @keyup.enter="changeFileName" />
        </div>
        <div class="edit-operation">
          <button id="undo" @click="undo" :disabled="!canUndo" />
          <button id="redo" @click="redo" :disabled="!canRedo" />
          <button id="edit-save" @click="saveProject" />
          <p v-if="!isSaveProject" id="edit-save-time">保存于 {{ saveTime }}</p>
        </div>
      </div>
      <div class="right-part">
        <button id="preview" @click="displaylDialog(false)">预览</button>
        <button id="publish" @click="displaylDialog(true)">发 &nbsp; 布</button>
      </div>
    </div>
  </div>
  <dialog-box v-if="dialogVisible" @dialog-visible="childData" />
</template>

<script>
import {computed, ref, provide, watch} from 'vue';
import {useStore} from 'vuex';
import {useRoute, useRouter} from 'vue-router';
import DialogBox from '@/components/EditPageComponent/DialogBox.vue';
import {
  CAN_REDO_KEY,
  CAN_UNDO_KEY,
  REDO_KEY,
  UNDO_KEY,
} from '../../store/plugins/history';
import api from '@/api';
import Message from '@/components/ShowMessage';

export default {
  name: 'ProjectEditNav',
  components: {
    DialogBox,
  },
  setup() {
    // 父传子的数据：修改子
    let dialogVisible = ref(false);
    // 子传父的数据：修改父
    const childData = (val) => {
      dialogVisible.value = val;
    };

    // 头像
    const store = useStore();
    const userIcon = computed(() => store.state.username?.slice(0, 2));

    const route = useRoute();
    const router = useRouter();
    // 保存
    let isSaveProject = ref(true);
    let saveTime = ref(''); // 此次保存时间
    const saveProject = () => {
      store.commit('editPage/slimComponents');
      const canvasPageContent = store.state.editPage.fileContent;
      return api
        .modifyContent({id: route.params.id, content: JSON.stringify(canvasPageContent)})
        .then((res) => {
          if (res.code === 2000) {
            router.replace({
              // 修改路由参数，主修改时间
              query: {
                modifyTime: res.data.modifyTime,
                name: router.currentRoute.value.query.name,
              },
            });
            saveTime.value = new Date(res.data.modifyTime)
              .toLocaleString()
              .replace(/年|月/g, '-')
              .replace(/日/g, ' ');
            isSaveProject.value = false;
          }
        });
    };

    // 自动保存
    let s = ref(0);
    const TimeCount = () => {
      if (s.value > 5 * 60) {
        console.log('5min');
        s.value = 0;
        saveProject();
      }
      s.value++;
      setTimeout(TimeCount, 1000);
    };

    TimeCount();

    // 动态监听
    watch(
      () => [router.currentRoute.value.query.modifyTime, saveTime.value],
      ([time]) => {
        saveTime.value = new Date(Number(time))
          .toLocaleString()
          .replace(/年|月/g, '-')
          .replace(/日/g, ' ');
        isSaveProject.value = false;
      },
      {
        deep: false,
        immediate: true, // 首次加载时执行
      }
    );

    // 预览 & 发布
    let isPublishBtn = ref(true);
    let onlineUrl = ref('');
    const displaylDialog = (isPublish) => {
      // 发布
      if (isPublish) {
        if (confirm('是否确定将本项目发布？')) {
          isPublishBtn.value = isPublish;
          // 先保存后发布
          saveProject().then(() => {
            api.release({id: route.params.id, temp: false}).then((res) => {
              onlineUrl.value = res.data.url;
            });
            dialogVisible.value = !dialogVisible.value;
          });
        }
      } else {
        // 预览
        isPublishBtn.value = isPublish;
        saveProject().then(() => {
          api.release({id: route.params.id, temp: true}).then((res) => {
            onlineUrl.value = res.data.url;
          });
          dialogVisible.value = !dialogVisible.value;
        });
      }
    };

    provide('isPublishBtn', isPublishBtn); // 是否为发布的按钮
    provide('onlineUrl', onlineUrl); // 预览和发布的链接

    const publishMessage = () => {};

    const undo = () => {
      store.dispatch(UNDO_KEY);
    };

    const redo = () => {
      store.dispatch(REDO_KEY);
    };

    /** @type {import('vue').ComputedRef<boolean>} */
    const canUndo = computed(() => store.getters[CAN_UNDO_KEY]);
    /** @type {import('vue').ComputedRef<boolean>} */
    const canRedo = computed(() => store.getters[CAN_REDO_KEY]);

    const fileName = ref(route.query.name);
    const changeFileName = async () => {
      const {code, message} = await api.modifyName({
        id: route.params.id,
        name: fileName.value,
      });
      if (code === 2000) Message.success(message);
      else Message.error(message);
    };

    return {
      userIcon,
      childData,
      dialogVisible,
      saveTime,
      isSaveProject,
      saveProject,
      displaylDialog,
      publishMessage,

      undo,
      redo,
      canRedo,
      canUndo,

      fileName,
      changeFileName,
    };
  },
};
</script>
<style scoped>
.edit-nav-box {
  position: relative;
  width: 100%;
  border-bottom: 1px solid #bfbfbf;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.1607843137254902);
  box-sizing: border-box;
}

.edit-nav {
  display: flex;
  margin: 0 auto;
  width: 100%;
  max-width: 1920px;
  /* min-width: 1200px; */
  height: 60px;
  background: #ffffff;
  justify-content: space-between;
}

.left-part {
  display: flex;
}

/* 用户头像和二级导航 */
#user-msg {
  margin: 0 50px 0 15px;
  width: 50px;
}

#user-msg > #user-icon {
  position: absolute;
  margin: 7px 0;
  width: 48px;
  height: 48px;
  line-height: 45px;
  text-align: center;
  background: #c4e5ff;
  border-radius: 50%;
  border: 1.5px solid #5b9bc8;
  box-sizing: border-box;
  transition: ease-in-out all 0.5s;
  z-index: 1;
  cursor: pointer;
}

/* 二级导航 */
#user-msg:hover #user-icon {
  /* transform-origin: 0% 0%; */
  /* transform: scale(1.8); */
  width: 80px;
  height: 80px;
  line-height: 75px;
  font-size: 32px;
}

#user-msg:hover #to-manage-page {
  left: 0;
}

#to-manage-page {
  position: absolute;
  padding: 30px 16px 16px 16px;
  width: 162px;
  height: 138px;
  top: 68px;
  left: -200px;
  list-style: none;
  background: #ffffff;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.25098039215686274);
  border-radius: 2px;
  border: 1px solid #f5f5f5;
  transition: ease-in-out all 0.4s;
}

#to-manage-page li {
  display: flex;
  margin-bottom: 8px;
  padding: 9px 19px 9px 17px;
  color: #666666;
  font-size: 16px;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  transition: ease-in-out all 0.3s;
  cursor: pointer;
}
#to-manage-page li:hover {
  background: #f1f2f4;
}

#to-manage-page li i {
  width: 30px;
  height: 20px;
  background: url(/img/新手教程.png);
  background-size: auto 20px;
  background-repeat: no-repeat;
}

#to-manage-page li:nth-child(2) i {
  background: url(/img/项目管理.png);
  background-size: auto 20px;
  background-repeat: no-repeat;
}
#to-manage-page li:nth-child(3) i {
  background: url(/img/相关模板.png);
  background-size: auto 20px;
  background-repeat: no-repeat;
}
/* 项目名称修改 */
.file-name > input {
  margin: 5px 0;
  padding: 0 10px;
  width: 220px;
  height: 50px;
  background: #ffffff;
  font-size: 18px;
  font-weight: bold;
  color: #444444;
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid #eeeeee;
}

.file-name > input:focus {
  background: #f8f8f8;
  color: #333333;
  outline: none;
}

/* 编辑操作 */
.edit-operation {
  margin-left: 72px;
}

.edit-operation > button {
  margin: 14px 25px 0 0;
  width: 32px;
  height: 32px;
  background-color: #ffffff;
  background: url(/img/EditIcons/nav_icon.png);
  background-size: 128px 64px;
  background-repeat: no-repeat;
  outline: none;
  border: none;
  cursor: pointer;
}

#undo {
  background-position: -32px 0;
}
#undo:hover {
  background-position: -32px -32px;
}
#undo:disabled {
  background-position: -32px 0;
  cursor: not-allowed;
}

#redo {
  background-position: -64px 0;
}
#redo:hover {
  background-position: -64px -32px;
}
#redo:disabled {
  background-position: -64px 0;
  cursor: not-allowed;
}

/* 保存和保存时间 */
#edit-save {
  margin-right: 12px;
}
#edit-save:hover {
  background-position: 0 -32px;
}

#edit-save-time {
  float: right;
  margin: 21px 0;
  font-size: 16px;
  color: #888888;
}

/* 右边的预览和发布按钮 */
.right-part {
  margin: 8px 20px 8px 0;
}

.right-part > button {
  outline: none;
  border: none;
  background: none;
  transition: ease-in-out all 0.2s;
  cursor: pointer;
}

#preview {
  margin-right: 40px;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  letter-spacing: 1px;
}
#preview:hover {
  color: #4a8af4;
}

#publish {
  display: inline-block;
  text-align: cent;
  width: 120px;
  height: 45px;
  background: #4a8af4;
  border-radius: 6px;
  color: #ffffff;
}
#publish:hover {
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.1607843137254902);
}

/* 弹框 */
</style>
