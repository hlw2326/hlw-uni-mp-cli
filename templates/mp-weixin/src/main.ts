import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import { createUnistorage } from "pinia-plugin-unistorage";
import App from "./App.vue";
import { bootstrap } from "./common/bootstrap";
import "virtual:uno.css";

export function createApp() {
    const app = createSSRApp(App);

    const pinia = createPinia();
    pinia.use(createUnistorage());
    app.use(pinia);

    // 挂 hlw 到 globalProperties、注册 request 拦截器、无 token 时 wx.login
    bootstrap(app);

    return { app };
}
