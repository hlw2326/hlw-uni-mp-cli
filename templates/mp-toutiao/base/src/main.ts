import App from './App.vue';
import { useApp, setupDefaultInterceptors, http } from '@hlw-uni/mp-core';
import { useUserStore } from './stores/user';

const app = useApp();

// 注册默认拦截器（Token + 业务错误 + 401）
setupDefaultInterceptors({
    getToken: () => useUserStore().token,
    onUnauthorized: () => {
        useUserStore().$patch({ token: "", userInfo: null });
    },
    // @ts-ignore
    sigSecret: (import.meta.env as Record<string, string>).VITE_SIG_SECRET ?? "",
});

// --- 可选：添加全局请求拦截器 ---
// http.onRequest((config) => {
//   config.headers = { ...config.headers, 'X-Custom-Header': 'value' };
//   return config;
// });

// --- 可选：附加额外插件（如 Pinia、Vue Router、VueUse 等） ---
// app.use(pinia);
// app.use(router);
// app.use(VueUsePlugin);

app.install(App);
