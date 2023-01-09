<template>
  <div class="management">
    <div class="user_info_container">
      <div class="user_info_bg">
        <div class="ava">
          <img
            src="/img/默认头像.png"
            alt="头像"
            class="ava_img"
            v-if="!store.state.token"
          />
          <div v-else class="ava_text">
            {{ usernameSplit }}
          </div>
        </div>
        <div class="user_info" v-if="store.state.token">
          {{ store.state.username }}
        </div>
        <div
          class="user_info"
          v-else
          @click="store.commit('handleLoginFormClose')"
          style="cursor: pointer"
        >
          登录&nbsp;/&nbsp;注册
        </div>
        <div class="project_info">
          <div class="project_count">
            <span>项目数</span>
            <span>{{ project_count }}</span>
          </div>
          <div class="edited">
            <span>已编辑</span>
            <span>{{ edited || '-' }}</span>
          </div>
          <div class="publiced">
            <span>已发布</span>
            <span>{{ publiced || '-' }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="project_container" v-if="store.state.token">
      <div class="projects">
        <div class="project create_project">
          <img src="/img/添加.png" alt="添加" class="add_img" />
          <div class="create_project-hover">
            <div class="create_project_item" @click="onClickInputProject">
              <img
                src="/img/相关模板.png"
                alt="导入项目"
                class="create_project_item_img"
              />
              <span class="create_project_item_text">导入已有项目</span>
              <input
                type="file"
                id="import-project-input"
                class="visually-hidden"
                ref="importFileInputRef"
                accept="application/json"
                @click.stop
                @change="onFileChange"
              />
            </div>
            <div class="create_project_item" @click="toggleCreateDialog">
              <img src="/img/创建.png" alt="创建项目" class="create_project_item_img" />
              <span class="create_project_item_text">创建空白文档</span>
            </div>
          </div>
          <div class="create_project_dialog" v-show="handleDialogClose">
            <label for="createProject">请输入项目名</label>
            <input type="text" id="createProject" v-model="projectName" />
            <div class="create_project_actions">
              <div @click="createProjectConfirm">确定</div>
              <div @click="createProjectCancel">取消</div>
            </div>
          </div>
        </div>
        <ProjectItem
          v-for="p in projectList"
          :key="p.id"
          :project="p"
          class="project"
          @update-project="updateProject"
        />
      </div>
    </div>
    <div class="not_loginz_img" v-else>
      <img src="/img/404.png" alt="404" />
    </div>
  </div>
</template>
<script setup>
import {useStore} from 'vuex';
import {ref, computed, watch} from 'vue';
import {useRouter} from 'vue-router';
import {ElMessageBox} from 'element-plus';
import 'element-plus/es/components/message-box/style/css'
import api from '@/api';
import Message from '@/components/ShowMessage';
import ProjectItem from '@/components/ProjectItem.vue';

const store = useStore();
const router = useRouter();

const usernameSplit = computed(() => store.state.username?.slice(0, 2));

const projectList = ref([]);
const updateProject = async () => {
  const {data} = await api.getUserProject();
  projectList.value = data?.projectList || [];
};
watch(
  () => store.state.token,
  () => updateProject(),
  {immediate: true}
);

//项目数量信息
const project_count = computed(() => {
  if (store.state.token) return projectList.value.length + '/5';
  else return '-';
});
const edited = computed(() => projectList.value.length - publiced.value);
const publiced = computed(
  () => projectList.value.filter((project) => project.url).length
);

//创建项目对话框
const handleDialogClose = ref(false);
const projectName = ref();
const toggleCreateDialog = () => {
  handleDialogClose.value = !handleDialogClose.value;
};
const createProjectConfirm = async () => {
  const {code, message} = await api.createProject({projectName: projectName.value});
  if (code === 2000) {
    updateProject();
    Message.success('创建成功');
    projectName.value = '';
    toggleCreateDialog();
  } else {
    Message.error(message);
  }
};
const createProjectCancel = () => {
  toggleCreateDialog();
};

const prompt = async () => {
  try {
    const {value} = await ElMessageBox.prompt('请输入项目名称', '导入项目', {
      inputPattern: /^.+$/,
      inputErrorMessage: '项目名称不能为空',
    });
    return value;
  } catch {
    Message.warning('导入取消');
    return null;
  }
};

/** @type {import('vue').Ref<HTMLInputElement>} */
const importFileInputRef = ref(null);

// FIXME: 应该有更好的传递导入项目名的方式
/** @type {import('vue').Ref<string>} */
const importProjectName = ref(null);
const onClickInputProject = async () => {
  importProjectName.value = await prompt();
  if (importProjectName.value) importFileInputRef.value?.click();
};

const isValidType = (/** @type {File} */ file) => file.type == 'application/json';

const onFileChange = async () => {
  const [file] = importFileInputRef.value.files;
  if (!file) {
    Message.warning('没有选择文件，停止导入');
    return;
  }
  if (!isValidType(file)) {
    Message.error('不是有效的JSON文件');
    return;
  }
  const resp = await api.importProject({
    projectName: importProjectName.value,
    file,
  });

  if (resp.flag) {
    Message.success(resp.message);
    updateProject();
  } else {
    Message.error(resp.data.message);
  }
};

</script>
<style lang="scss">
.management {
  height: calc(100vh - 60px);
  background-color: #dce7ea;
  overflow-x: hidden;
  overflow-y: auto;
  .user_info_container {
    display: flex;
    justify-content: center;
    align-items: center;
    .user_info_bg {
      position: relative;
      width: 1200px;
      height: 145px;
      margin-top: 50px;
      background: url(/img/个人信息.png) no-repeat center/contain;
      .ava {
        position: absolute;
        top: -25px;
        left: 50%;
        background-color: #fff;
        border-radius: 100%;
        transform: translateX(-50%);
        .ava_img {
          width: 60px;
        }
        .ava_text {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 60px;
          height: 60px;
          font-size: 28px;
          background-color: rgb(196, 229, 255);
          border: 1px solid rgb(0, 73, 184);
          border-radius: 100%;
        }
      }
      .user_info {
        margin-top: 40px;
        text-align: center;
      }
      .project_info {
        display: flex;
        justify-content: center;
        margin-top: 10px;
        div {
          display: flex;
          padding: 0 30px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-right: 1px solid #d4dbe2;
          white-space: nowrap;
          &:last-child {
            border: none;
          }
          span:first-child {
            margin-bottom: 4px;
            font-family: Microsoft YaHei-Bold, Microsoft YaHei;
            font-weight: bold;
            color: #5b9bc8;
          }
        }
      }
    }
  }
  .project_container {
    display: flex;
    justify-content: center;
    .projects {
      display: flex;
      width: 1200px;
      justify-content: space-between;
      flex-wrap: wrap;
      .project {
        width: 27%;
        height: 206px;
        margin-bottom: 30px;
        box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.16);
        border-radius: 8px 8px 8px 8px;
        opacity: 1;
        border: 1px solid #707070;
        overflow: hidden;
        &:last-child:nth-child(3n-1) {
          margin-right: calc(27% + 19% / 2);
        }
      }
      .create_project {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        background: #ffffff;
        .add_img {
          width: 90px;
          height: 90px;
        }
        &:hover .create_project-hover {
          display: flex;
        }
        &:hover .add_img {
          display: none;
        }
        .create_project-hover {
          display: none;
          flex-direction: column;
          .create_project_item {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 8px 50px;
            border: 1px solid #e9ebed;
            border-radius: 8px 8px 8px 8px;
            cursor: pointer;
            &:hover {
              background: #f6f6f6;
            }
            &:last-child {
              margin-top: 10px;
            }
            .create_project_item_img {
              width: 40px;
              height: 40px;
            }
            .create_project_item_text {
              margin-left: 10px;
              font-size: 20px;
              font-family: Microsoft YaHei-Light, Microsoft YaHei;
              font-weight: 300;
              color: #444444;
              white-space: nowrap;
            }
          }
        }
        .create_project_dialog {
          position: absolute;
          display: flex;
          left: 50%;
          transform: translateX(-50%);
          padding: 20px;
          flex-direction: column;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
            0 9px 28px 8px rgba(0, 0, 0, 0.05);
          input {
            margin: 8px 0;
          }
          .create_project_actions {
            display: flex;
            justify-content: space-around;
            div {
              padding: 4px 8px;
              color: #fff;
              background-color: #0049b8;
              border-radius: 4px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .not_loginz_img {
    img {
      position: relative;
      width: 100%;
      top: 80px;
    }
  }
}

.visually-hidden {
  position: absolute;
  top: -9999px;
  left: -9999px;
  opacity: 0;
}
</style>
