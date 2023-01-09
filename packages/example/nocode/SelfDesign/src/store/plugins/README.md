# 历史记录 API

```javascript
mutations: {
  /**
   * 用于标记是否是插件内部调用`editPage`，
   * 不重复调用`onEditPageMutation`，
   * 亦可用于暂停历史记录
   * 
   * @param {boolean} payload 布尔值，`true`暂停历史记录，`false`重新启用历史记录
   */
  setInternalFlag(state, payload) {
    state[INTERNAL_FLAG_KEY] = payload;
  }
}
```

使用时直接 commit 名字为`SET_INTERNAL_FLAG_KEY`的 Mutation

```javascript
import { SET_INTERNAL_FLAG_KEY } from './history.js';
import { useStore } from 'vue-router'

export default {
  setup() {
    const store = useStore();

    store.commit(SET_INTERNAL_FLAG_KEY, true);
    /** 历史记录暂停 */

    /** 历史记录重启 */
    store.commit(SET_INTERNAL_FLAG_KEY, false);
  }
}
```
