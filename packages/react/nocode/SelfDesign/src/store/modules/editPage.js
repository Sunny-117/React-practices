import deepCopy from '@/utils/deepCopy';


// 从map中删除组件
function deleteComponentFromMap(state, key) {
  const children = state.components.get(key).children;
  state.components.delete(key);
  // 递归删除
  children.forEach(child => {
    deleteComponentFromMap(state, child.id);
  });
}

// 从 json 中删除组件
function deleteComponentFromJson(state, { parentId, targetId }) {
  const children = state.components.get(parentId).children;
  let i = 0;
  for (; i < children.length; i++) {
    if (children[i].id === targetId) {
      break;
    }
  }
  return children.splice(i, 1)[0];
}


// 最新节点 id, 执行完 initialComponents
let newestId = -1;

/**
 * 根据模板 copy 一个节点
 * @param {*} nodeTemplate 节点模板
 * @param {*} parentId 
 * @returns 
 */
function generateNode(nodeTemplate, parentId) {
  // 没有 id 是 添加节点调用
  let id = -1;
  if (!nodeTemplate.id) {
    newestId += 1;
    id = newestId;
  } else {
    // 有 id 是 初始化节点调用
    id = nodeTemplate.id;
    newestId = id > newestId ? id : newestId;
  }

  return {
    id,
    parentId,
    tag: nodeTemplate.tag,
    style: nodeTemplate.style ? deepCopy(nodeTemplate.style) : {},
    values: nodeTemplate.values ? deepCopy(nodeTemplate.values) : {},
    event: nodeTemplate.event ? deepCopy(nodeTemplate.event) : [],
    tempStyle: {}, // 前端操作的时候有用
    children: [],
  };
}




// 重置 activeComponentId
function resetActiveComponent(state) {
  if(state.activeComponentId === -1){
    return;
  }
  state.components.get(state.activeComponentId).tempStyle = {}
  state.activeComponentId = -1;
}

// 添加节点
function addComponent(state, { node, parentId = 1 }) {
  const copyNode = generateNode(node, parentId);
  state.components.set(copyNode.id, copyNode); // 往 map 中添加节点
  if (parentId !== 0) {
    // 非根节点
    state.components.get(parentId).children.push(copyNode); // 构造树状数据
  }
  if (node.children) {
    node.children.forEach(child => addComponent(state, { node: child, parentId: copyNode.id }));
  }
}


// 初始化节点, 需要被加入黑名单
function initComponents(state, { node, parentId = 1 }) {
  const copyNode = generateNode(node, parentId);
  state.components.set(copyNode.id, copyNode); // 往 map 中添加节点
  if (parentId !== 0) {
    // 非根节点
    state.components.get(parentId).children.push(copyNode); // 构造树状数据
  }
  if (node.children) {
    node.children.forEach(child => initComponents(state, { node: child, parentId: copyNode.id }));
  }
}



// 过滤节点
function componentfilter(root){
  const slimNode = {
    id: root.id,
    tag: root.tag,
    style: deepCopy(root.style),
    values: deepCopy(root.values),
    event: deepCopy(root.event)
  };
  if(root.children){
    slimNode.children = [];
    root.children.forEach(child => slimNode.children.push(componentfilter(child)));
  }
  return slimNode;
}


export default {
  namespaced: true,
  state: {
    components: new Map(),
    activeComponentId: -1,
    activeContainerId: -1,
    fileContent: {}, // 保存后端返回的 content 
    slimComponents: null
  },
  getters: {
    // 获取活动节点
    activeComponent(state) {
      if (state.activeComponentId === -1) {
        return null;
      }
      const activeComponent = state.components.get(state.activeComponentId);
      return Object.assign({}, activeComponent, {
        parentTag: state.components.get(activeComponent.parentId).tag
      });
    },

    // 全部节点 id
    componnetsId(state){
      return Array.from(state.components.keys()).filter((item) => item !== 1 && item !== state.activeComponentId);
    }
  },

  mutations: {
    // 初始化节点
    initComponents,

    // 添加组件
    addComponent,

    // 删除组件
    deleteComponent(state) {
      const activeComponentId = state.activeComponentId;
      if (activeComponentId === -1) {
        return;
      }
      const parentId = state.components.get(activeComponentId).parentId;
      resetActiveComponent(state); // 必须先置 -1
      deleteComponentFromMap(state, activeComponentId);
      deleteComponentFromJson(state, { parentId, targetId: activeComponentId });
    },

    // 移动组件
    moveComponent(state, { to, from, targetId, position }) {
      if (to === -1) { return; }

      // 如果是position容器就移动位置
      if(state.components.get(to).tag === 'PositionLayout'){
        state.components.get(targetId).style.left = position.left + 'px';
        state.components.get(targetId).style.top = position.top + 'px';
      }else{
        delete state.components.get(targetId).style.left;
        delete state.components.get(targetId).style.top;
      }

      // 替换容器
      if (to !== from) {
        const comp = deleteComponentFromJson(state, { parentId: from, targetId });
        comp.parentId = to;
        state.components.get(to).children.push(comp);
      }
    },

    // 修改当前活动组件
    setActiveComponent(state, id) {
      if (id === -1 || id === 1) { // 不能选中根组件
        return;
      }
      resetActiveComponent(state); // 设置之前先重置
      state.activeComponentId = id;
      // 设置临时样式 z-index 置于顶层
      state.components.get(id).tempStyle['z-index'] = 1000;
    },

    // 重置活动组件
    resetActiveComponent,

    // 修改活动组件样式
    setActiveComponentStyle(state, style) {
      if (state.activeComponentId === -1) {
        return;
      }
      const componentStyle = state.components.get(state.activeComponentId).style;
      // 覆盖 style 原有属性值
      for (let key in style) {
        componentStyle[key] = style[key];
      }
    },

    // 修改活动组件临时样式
    setActiveComponentTempStyle(state, style) {
      if (state.activeComponentId === -1) {
        return;
      }
      const componentStyle = state.components.get(state.activeComponentId).tempStyle;
      // 覆盖 style 原有属性值
      for (let key in style) {
        componentStyle[key] = style[key];
      }
    },

    // 清空临时样式
    clearActiveComponentTempStyle(state, activeComponentId) {
      if (activeComponentId === -1) {
        return;
      }
      state.components.get(activeComponentId).tempStyle = {};
    },


    // 设置激活容器
    setActiveContainer(state, id) {
      state.activeContainerId = id;
    },

    // 重置激活容器
    resetActiveContainer(state) {
      state.activeContainerId = -1;
    },

    // 修改活动组件 values
    setActiveComponentValues(state, values) {
      if (state.activeComponentId === -1) {
        return;
      }
      const componentValues = state.components.get(state.activeComponentId).values;
      // 覆盖 style 原有属性值
      for (let key in values) {
        componentValues[key] = values[key];
      }
    },

    // 修改活动组件 event， 传入 event 数组直接覆盖原来的就行
    setActiveComponentEvents(state, { event }) {
      if (state.activeComponentId === -1) {
        return;
      }
      if(Array.isArray(event)){
        state.components.get(state.activeComponentId).event = deepCopy(event);
      }
    },

    // 清空 state 的所有状态
    clearAllStates(state) {
      state.components = new Map();
      state.activeComponentId = -1;
      state.activeContainerId = -1;
      state.fileContent = {};
      state.slimComponents = null;
    },

    // 获取提交给后端的节点 json 数组，不写 getter 的原因是 getter 消耗性能，每个更新 components 都会更新
    // 执行该操作值，最好执行用户发起其他行为
    slimComponents(state){
      if(state.components.size === 0){
        return false;
      }
      state.fileContent.root = componentfilter(state.components.get(1));
    },

    setActiveComponentSize(state, { widthInPx, heightInPx }) {
      const id = state.activeComponentId;
      state.components.get(id).style.width = widthInPx;
      state.components.get(id).style.height = heightInPx;
    },

    setFileContent(state, content){
      for(let key in content){
        if(key !== 'root'){
          state.fileContent[key] = content[key];
        }
      }
    }
  }
};