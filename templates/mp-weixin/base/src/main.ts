import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import { createUnistorage } from "pinia-plugin-unistorage";
import App from "./App.vue";
import { setupDefaultInterceptors, hlw } from "@hlw-uni/mp-core";
import { useUserStore } from "./store";
import "virtual:uno.css";

export function createApp() {
    const app = createSSRApp(App);

    const pinia = createPinia();
    pinia.use(createUnistorage());
    app.use(pinia);

    setupDefaultInterceptors({
        baseURL: import.meta.env.VITE_API_BASE_URL ?? "",
        getToken: () => useUserStore().token,
        onUnauthorized: () => {
            useUserStore().clearLogin();
        },
        // @ts-ignore
        sigSecret: import.meta.env.VITE_SIG_SECRET ?? "",
    });

    Object.assign(app.config.globalProperties, { hlw });

    return { app };
}
