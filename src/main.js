import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import mitt from 'mitt'
import ElemetPlusDirectivesPlugins from './utils/element/element-plus-directive';

const app = createApp(App);
app.config.globalProperties.$mitt = mitt();
app.use(ElemetPlusDirectivesPlugins).mount('#app');