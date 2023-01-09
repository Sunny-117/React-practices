<template>
  <div class="project_item">
    <div class="info">
      <div class="title">
        <span
          class="project-name"
          @click="changeProjectName(project.id)"
        >
          {{ project.name }}
        </span>
      </div>
      <div 
        class="url" 
        v-if="project.url"
      >
        {{ project.url }}
      </div>
      <div class="actions">
        <div 
          style="background-color: rgb(91,155,200);" 
          @click="editProject(project.id,project.modifyTime,project.name)"
        >
          <img 
            src="/img/编辑.png" 
            alt="编辑"
          >
          <span>编辑</span>
        </div>
        <div 
          style="background-color: rgb(102,185,145);" 
          @click="saveProject(project.id)"
        >
          <img 
            src="/img/另存.png" 
            alt="另存"
          >
          <span>另存</span>
        </div>
        <div
          style="background-color: rgb(199,171,209);"
          @click="copyUrl(project.url)"
          v-if="project.url"
        >
          <img 
            src="/img/复制.png" 
            alt="复制"
          >
          <span>复制</span>
        </div>
        <div 
          style="background-color: rgb(233,99,59);" 
          @click="deleteProject(project.id)"
        >
          <img 
            src="/img/删除.png" 
            alt="删除"
          >
          <span>删除</span>
        </div>
      </div>
    </div>
    <div class="date">
      {{ changeDate(project.createTime) }}
    </div>
  </div>
</template>
<script setup>
import api from '@/api';
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import Message from '@/components/ShowMessage';
const router = useRouter();
defineProps({
  project: {
    type: Object,
    default: () => {}
  }
});
const emit = defineEmits(['update-project']);

const editProject = (id,time,name) => {
  router.push({ 
    name: 'ProjectEdit', 
    params: { id: id },
    query: { 
      modifyTime: time,
      name: name
    } 
  });
};
const saveProject = async (id) => {
  await api.download(id);
};
const copyUrl = (url) => {
  const aux = document.createElement('input');
  aux.setAttribute('value', url);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand('copy');
  Message.success('复制成功');
  document.body.removeChild(aux);
};
const deleteProject = async (id) => {
  const { code , message } = await api.deleteProject({ id: id });
  if (code === 2000) {
    Message.success('删除成功');
    emit('update-project');
  } else {
    Message.error(message);
  }
};

const changeDate = (d) => {
  const date = new Date(+d).format('yyyy-MM-dd hh:mm:ss');
  return date;
};

const changeProjectName = async (id) => {
  let newName;
  try {
    const { value } = await ElMessageBox.prompt(
      '请输入新名称',
      '修改项目名称',
      {
        inputPattern: /^.+$/,
        inputErrorMessage: '名称不能为空'
      }
    );
    newName = value;
  } catch {
    Message.warning('取消修改项目名称');
    return;
  }

  const resp = await api.modifyName({ id, name: newName });

  if (resp.flag) {
    Message.success('修改项目名称成功');
    emit('update-project');
  } else {
    Message.error(resp.message);
  }
};

</script>
<style lang="scss" scoped>
.project_item {
  position: relative;
  background-image: linear-gradient(
    to right,
    rgb(244, 239, 247),
    rgb(149, 187, 217)
  );
  &:hover .info {
    top: 0;
  }
  &:hover .date {
    display: none;
  }
  .info {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 140px;
    background-color: #fff;
    transition: top 0.3s ease;
    .title {
      padding: 18px 20px 25px;
      text-align: center;
      font-size: 22px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .url {
      padding: 10px 20px;
    }
    .actions {
      display: flex;
      margin: 0 8px;
      padding-top: 8px;
      justify-content: space-around;
      border-top: 1px solid #333333;
      div {
        display: flex;
        padding: 8px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        border-radius: 8px;
        cursor: pointer;
        img {
          width: 25px;
          height: 25px;
        }
      }
    }
  }
  .date {
    display: inline-block;
    position: absolute;
    bottom: 0px;
    padding: 2px 8px;
    font-size: 14px;
    background: #5b9bc8;
    color: #fff;
    border-top-right-radius: 8px;
  }
}

.project-name:hover {
  text-decoration: underline;

  cursor: pointer;
}
</style>