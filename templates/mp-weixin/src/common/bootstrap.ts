/**
 * 启动引导：
 *   1. 挂 hlw 到 globalProperties，模板里 $hlw 可用
 *   2. import "@/service" 后自动配置 request（baseURL / token / sig / 401）
 */
import type { App } from "vue";
import { hlw, vCopy } from "@hlw-uni/mp-vue";
import "@/service";

export async function bootstrap(app: App): Promise<void> {
    globalThis.hlw = hlw;
    Object.assign(app.config.globalProperties, { hlw, service });
    app.directive("copy", vCopy);
}
