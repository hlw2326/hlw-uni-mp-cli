/**
 * 分享配置接口
 * 控制器：Config::share（无需登录）
 *
 * 后端按 tabBar 页聚合返回三个页面的 title / image。
 * title 为空时前端用内置默认文案，image 为空时微信自动截图当前页。
 */
import { http, type ShareConfigMap, type PageShareItem } from "@hlw-uni/mp-vue";
import { v1 } from "./config";

/** 单页配置（跟 mp-vue 的 PageShareItem 同形） */
export type SharePageConfig = PageShareItem;

/**
 * 项目固定的 3 个 tabBar 页配置 —— 跟 mp-vue ShareConfigMap 兼容
 * （ShareConfigMap 是 Record<string, PageShareItem>，本类型加了 index/tools/user 强类型 key）
 */
export interface ShareConfig extends ShareConfigMap {
    index: SharePageConfig;
    tools: SharePageConfig;
    user: SharePageConfig;
}

/** tabBar 三页 key 强类型 */
export type SharePageKey = "index" | "tools" | "user";

export function getShareConfig() {
    return http.request<ShareConfig>({
        url: v1("config/share"),
        method: "GET",
    });
}
