import { cloneDeep, cloneDeepWith, isMap } from 'lodash-es';

const onlyCloneRootComponent = (value) => {
  if (isMap(value)) {
    const clonedRoot = cloneDeep(value.get(1));
    return new Map([
      [1, clonedRoot]
    ]);
  }
};

/** @typedef {import('vuex').Store<any>['subscribe']} Subscribe */

const REPLACE_STATE_MUTATION_KEY = 'replaceEditPage';

/**
 * Action: 撤销，返回上一个状态
 * @type {import('vuex').Action<any, any>}
 */
const undo = ({ state, dispatch, commit }) => {
  /** @type {{ i: number; history: unknown[] }} */
  const historyModule = state;

  if (historyModule.i <= 0) {
    return;
  }

  const prev = historyModule.history[historyModule.i - 1];
  dispatch(REPLACE_STATE_MUTATION_KEY, { editPage: prev }, { root: true });

  commit('updateI', historyModule.i - 1);
};

/**
 * Action: 重做，回到下一个状态
 * @type {import('vuex').Action<any, any>}
 */
const redo = ({ state, dispatch, commit }) => {
  /** @type {{ i: number; history: unknown[] }} */
  const historyModule = state;

  if (historyModule.i >= historyModule.history.length - 1) {
    return;
  }
  
  const future = historyModule.history[historyModule.i + 1];
  dispatch(REPLACE_STATE_MUTATION_KEY, { editPage: future }, { root: true });

  commit('updateI', historyModule.i + 1);
};


/**
 * Action: 清空历史记录
 * @type {import('vuex').Action<any, any>}
 */
const resetHistory = ({ commit }) => {
  commit('truncateHistory', 0);
};

const INTERNAL_FLAG_KEY = Symbol('isInternal');

const MODULE_KEY = 'history';

const BLOCK_LIST = new Set([
  'setActiveContainer',
  'resetActiveContainer',
  'setActiveComponentTempStyle',
  'clearActiveComponentTempStyle',
  'setActiveComponent',
  'resetActiveComponent',
  'setActiveComponentSize',
  'clearAllStates',
  'initComponents',
  'setFileContent',
  'slimComponents'
]);

const shouldPushInHistory = (type) => !BLOCK_LIST.has(type);

/** @typedef {Parameters<Subscribe>[0]} SubscribeHandler */

const ADD_ITEM_TO_HISTORY_KEY = `${MODULE_KEY}/addItemToHistory`;
const TRUNCATE_HISTORY_KEY = `${MODULE_KEY}/truncateHistory`;
const UPDATE_I_KEY = `${MODULE_KEY}/updateI`;

/**
 * 创建一个订阅`editPage` Mutation的函数
 * @param {import('vuex').Store} store Store实例
 * @return {SubscribeHandler}
 */
const createEditPageMutationHandler = (store) => {
  /** @type {SubscribeHandler} */
  const onEditPageMutation = (mutation, state) => {
    if (state[MODULE_KEY][INTERNAL_FLAG_KEY]) return; // 插件内部调用`editPage`，不做操作
  
    const prefixedMutationType = mutation.type;
  
    if (!prefixedMutationType.startsWith('editPage/')) return;
  
    const mutationType = prefixedMutationType.split('/')[1];

    if (!shouldPushInHistory(mutationType)) return;
  
    /** @type {{ i: number; history: unknown[] }} */
    const historyModule = state.history;
  
    if (historyModule.i !== historyModule.history.length - 1) {
      // 指针后面有历史记录，指针之后的全部丢弃
      store.commit(TRUNCATE_HISTORY_KEY, historyModule.i + 1);
    }
  
    const clonedWithRootOnly = cloneDeepWith(state.editPage, onlyCloneRootComponent);
  
    store.commit(ADD_ITEM_TO_HISTORY_KEY, clonedWithRootOnly);
    store.commit(UPDATE_I_KEY, historyModule.i + 1);
  };

  return onEditPageMutation;
};

/**
 * 实现撤消重做的历史记录插件
 * @param {import('vuex').Store} store Store实例
 */
const historyPlugin = (store) => {
  store.registerModule(MODULE_KEY, {
    
    namespaced: true,
  
    state: () => (
      {
        [INTERNAL_FLAG_KEY]: false,

        history: [],
        i: -1
      }
    ),

    getters: {
      canRedo: (state) => !(state.i >= state.history.length - 1),
      canUndo: (state) => !(state.i <= 0)
    },

    mutations: {
      /**
       * 用于标记是否是插件内部调用`editPage`
       * 不重复调用`onEditPageMutation`
       */
      setInternalFlag(state, payload) {
        state[INTERNAL_FLAG_KEY] = payload;
      },

      addItemToHistory(state, newItem) {
        state.history.push(newItem);
      },
      truncateHistory(state, to) {
        state.history.length = to;
      },
      updateI(state, newI) {
        state.i = newI;
      }
    },

    actions: {
      undo,
      redo,

      resetHistory
    }
  });

  const onEditPageMutation = createEditPageMutationHandler(store);
  store.subscribe(onEditPageMutation);
};

/** 
 * 用于重置`editPage`中的`components`，
 * 因为`editPage`中没有提供这样的 Mutation
 * @type {import('vuex').Mutation<any>}
 */
const __resetEditPageComponentsMap = (state) => {
  state.editPage.components = new Map();
};

const historyGlobalMutations = {
  __resetEditPageComponentsMap
};

/**
 * 用于替换`editPage`的状态
 * @type {import('vuex').Action<any, any>}
 */
const replaceState = ({ commit }, { editPage }) => {
  // 标记是插件在调用`editPage`的 Mutation
  commit(SET_INTERNAL_FLAG_KEY, true);

  commit('editPage/resetActiveComponent');
  commit('editPage/resetActiveContainer');

  const root = editPage.components.get(1);

  commit('__resetEditPageComponentsMap');

  // 从根组件开始重建
  commit('editPage/addComponent', { node: root, parentId: 0 });

  commit(SET_INTERNAL_FLAG_KEY, false);
};

const historyGlobalActions = {
  [REPLACE_STATE_MUTATION_KEY]: replaceState
};

const REDO_KEY = `${MODULE_KEY}/redo`;
const UNDO_KEY = `${MODULE_KEY}/undo`;

const CAN_REDO_KEY = `${MODULE_KEY}/canRedo`;
const CAN_UNDO_KEY = `${MODULE_KEY}/canUndo`;

const RESET_HISTORY_KEY = `${MODULE_KEY}/resetHistory`;

const SET_INTERNAL_FLAG_KEY = `${MODULE_KEY}/setInternalFlag`;

export {
  historyPlugin,
  historyGlobalActions,
  historyGlobalMutations,

  REPLACE_STATE_MUTATION_KEY,
  MODULE_KEY,
  REDO_KEY,
  UNDO_KEY,
  CAN_REDO_KEY,
  CAN_UNDO_KEY,

  RESET_HISTORY_KEY,

  SET_INTERNAL_FLAG_KEY,
};