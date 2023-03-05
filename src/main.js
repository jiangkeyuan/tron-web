import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import mitt from 'mitt'
import { i18n } from './i18n/index';
import router from '@/router/index.js';
import store from '@/store/index.js';
import ElemetPlusDirectivesPlugins from './utils/element/element-plus-directive';

const app = createApp(App);
app.config.globalProperties.$mitt = mitt();
app.use(ElemetPlusDirectivesPlugins)
    .use(router)
    .use(i18n)
    .use(store)
    .mount('#app');