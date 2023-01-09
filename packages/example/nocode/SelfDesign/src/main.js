import { createApp, defineAsyncComponent} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 异步加载模块
const UserButton = defineAsyncComponent(() => import("./components/UserComponent/UserButton.vue"))
const UserImage = defineAsyncComponent(() => import("./components/UserComponent/UserImage.vue"))
const UserText = defineAsyncComponent(() => import("./components/UserComponent/UserText.vue"))
const UserLayoutVertical = defineAsyncComponent(() => import("./components/UserComponent/UserLayoutVertical.vue"))
const UserLayoutHorizontal = defineAsyncComponent(() => import("./components/UserComponent/UserLayoutHorizontal.vue"))
const UserLayoutPosition = defineAsyncComponent(() => import("./components/UserComponent/UserLayoutPosition.vue"))

const app = createApp(App);
app.component('UserButton',UserButton);
app.component('UserImage',UserImage);
app.component('UserText',UserText);
app.component('UserLayoutHorizontal',UserLayoutHorizontal);
app.component('UserLayoutVertical',UserLayoutVertical);
app.component('UserLayoutPosition', UserLayoutPosition);
app.use(router);
app.use(store);
app.mount('#app');
