/**
 * 启动引导：
 *   1. 挂 hlw 到 globalProperties，模板里 $hlw 可用
 *   2. 配置 http 拦截器（baseURL / token / sig 签名 / 401 兜底）
 *   3. 注入 mp-vue 业务级 composable 回调（广告 / 分享 / 客服）+ 预加载广告配置
 *   4. 没 token 时走一次 wx.login 拿新 token，失败 toast
 *
 * 登录本体在 core/user，这里只触发；不在这里拉用户信息（避免冷启动阻塞首屏）。
 */
import type { App } from "vue";
import {
    hlw,
    setupInterceptors,
    setConfigAd,
    setConfigShare,
    setConfigContact,
    useAd,
} from "@hlw-uni/mp-vue";
import { useUser } from "@/core";
import { getAdConfig } from "@/api/ad";
import { getShareConfig } from "@/api/share";
import { getContactConfig } from "@/api/contact";

export async function bootstrap(app: App): Promise<void> {
    Object.assign(app.config.globalProperties, { hlw });

    setupInterceptors({
        baseURL: import.meta.env.VITE_API_BASE_URL ?? "",
        getToken: () => useUser().token.value,
        onLogout: () => useUser().relogin(),
        // @ts-ignore
        sigSecret: import.meta.env.VITE_SIG_SECRET ?? "",
    });

    // 业务回调注入：mp-vue 内部识别 ThinkAdmin envelope `{ code, data }` 自动解包，
    // 直接传函数引用即可（不用业务方手写 `res.code === 1 ? res.data : null`）。
    setConfigAd({
        getConfig: getAdConfig,
        isAuth: () => !!useUser().token.value,
        isVip: () => useUser().isVip.value,
        userNoAd: () => useUser().noAd.value,
    });
    setConfigShare({ getConfig: getShareConfig });
    setConfigContact({ getConfig: getContactConfig });

    // 必须先登录拿到 userInfo（含 vip_time），loadConfig 内的 computed 第一次求值时
    // adapter.isVip() 才能拿到正确值；否则 VIP 屏蔽广告依赖响应式链路传递，小程序里不可靠。
    const user = useUser();
    if (!user.token.value) {
        try {
            await user.login();
        } catch {
            // core/user 已重试 2 次，还失败说明断网 / 后端故障
            hlw.$msg.toast("登录失败，请检查网络后重试");
        }
    }

    // 用户态就绪后再拉广告配置：VIP 直接拿到屏蔽后的 config（reward 保留），普通用户拿到完整 unit_id
    await useAd().loadConfig();
}
