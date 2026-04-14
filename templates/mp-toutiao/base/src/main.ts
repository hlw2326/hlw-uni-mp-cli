import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import { createUnistorage } from "pinia-plugin-unistorage";
import App from "./App.vue";
import { setupDefaultInterceptors, hlw, http } from "@hlw-uni/mp-core";
import { useUserStore } from "./store";

// 注册默认拦截器（Token + 业务错误 + 401）
setupDefaultInterceptors({
    baseURL: (import.meta.env as Record<string, string>).VITE_API_BASE_URL ?? "",
    getToken: () => useUserStore().token,
    onUnauthorized: () => {
        useUserStore().$patch({ token: "", userInfo: null });
    },
    // @ts-ignore
    sigSecret: (import.meta.env as Record<string, string>).VITE_SIG_SECRET ?? "",
});

export function createApp() {
    const app = createSSRApp(App);

    // 初始化 Pinia
    const pinia = createPinia();
    pinia.use(createUnistorage());
    app.use(pinia);

    // 挂载全局工具
    app.config.globalProperties["hlw"] = hlw;

    return { app };
}

