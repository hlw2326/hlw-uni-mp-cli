import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import { createUnistorage } from "pinia-plugin-unistorage";
import App from "./App.vue";
import { setupDefaultInterceptors, hlw } from "@hlw-uni/mp-core";
import { useUserStore } from "./store";
import "virtual:uno.css";

export function createApp() {
    const app = createSSRApp(App);

    // 初始化 Pinia
    const pinia = createPinia();
    pinia.use(createUnistorage());
    app.use(pinia);

    // 注册默认拦截器（Token + 业务错误 + 401）— 放在 pinia 初始化之后
    setupDefaultInterceptors({
        baseURL: import.meta.env.VITE_API_BASE_URL ?? "",
        getToken: () => useUserStore().token,
        onUnauthorized: () => {
            useUserStore().$patch({ token: "", userInfo: null });
        },
        // @ts-ignore
        sigSecret: import.meta.env.VITE_SIG_SECRET ?? "",
    });

    // 挂载全局工具
    app.config.globalProperties["hlw"] = hlw;

    return { app };
}
