import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";

import "element-plus/theme-chalk/el-message.css";
import "xterm/dist/xterm.css";

import echarts from "./utils/echarts";

// createApp(App).mount('#app')
const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.$echarts = echarts;

app.use(router);
app.use(pinia);
import "./permission";

app.mount("#app");
