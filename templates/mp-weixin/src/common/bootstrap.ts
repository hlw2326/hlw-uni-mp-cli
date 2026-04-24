/**
 * 启动引导：
 * 1. 挂 hlw 到 app.config.globalProperties，让模板里 $hlw 可用
 * 2. 配置 http 默认拦截器（baseURL、token、sig 签名、401 兜底）
 * 3. 没 token 时走一次 wx.login 拿新 token（失败会重试 2 次，仍败给 toast）
 *
 * 登录逻辑本体在 core/user 里，这里只是触发。
 * 不在这里拉用户信息 —— 交给各页面 onShow 里的 getUserInfo，避免冷启动阻塞首屏。
 */
import type { App } from "vue";
import { hlw, setupDefaultInterceptors } from "@hlw-uni/mp-core";
import { useUser } from "@/core";

export async function bootstrap(app: App): Promise<void> {
    Object.assign(app.config.globalProperties, { hlw });

    // 必须在任何 http 请求（包括下面的 login）之前注册好
    setupDefaultInterceptors({
        baseURL: import.meta.env.VITE_API_BASE_URL ?? "",
        getToken: () => useUser().token.value,
        onUnauthorized: () => {
            // 兜底：HTTP 层面 401（罕见，ThinkAdmin 用 body 里的 code:401）
            const user = useUser();
            user.clearLogin();
            // 重新 wx.login 拿 token；失败静默（core/user 内部已带重试），避免 401 连击时堆 toast
            user.login().catch(() => { /* swallow */ });
        },
        // @ts-ignore
        sigSecret: import.meta.env.VITE_SIG_SECRET ?? "",
    });

    const user = useUser();
    if (user.token.value) return;
    try {
        await user.login();
    } catch {
        // core/user 已经重试 2 次，还失败说明确实断网/后端故障；提示用户并留自救入口（设置页重登菜单）
        hlw.$msg.toast("登录失败，请检查网络后重试");
    }
}
