import { createStore } from 'vuex';
import editPage from './modules/editPage';
import { historyPlugin, historyGlobalActions, historyGlobalMutations } from './plugins/history';
export default createStore({
  state: {
    loginFormClose: false,
    token: null,
    username: null
  },
  mutations: {
    handleLoginFormClose(state) {
      state.loginFormClose = !state.loginFormClose;
    },
    setToken(state, data) {
      state.token = data;
    },
    setUsername(state, data) {
      state.username = data;
    },
    setLoginFormClose(state,data){
      state.loginFormClose = data;
    },

    ...historyGlobalMutations
  },
  actions: {
    ...historyGlobalActions
  },
  modules: {
    editPage
  },
  plugins: [
    historyPlugin
  ]
});

