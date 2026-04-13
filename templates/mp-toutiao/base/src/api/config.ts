/**
 * API 配置中心
 *
 * 后端 ThinkAdmin 插件路由规则：
 *   /{plugin}/api.v{version}.{controller}/{method}
 *
 * 使用方式：
 *   api("ad/config")           // => "/plugin-qz/api.v1.ad/config"  （默认版本）
 *   api("ad/config", "v2")     // => "/plugin-qz/api.v2.ad/config"  （指定版本）
 *   v1("ad/config")            // => "/plugin-qz/api.v1.ad/config"  （语法糖）
 *   v2("ad/config")            // => "/plugin-qz/api.v2.ad/config"  （语法糖）
 */

/** 插件名称（从 .env 读取） */
export const PLUGIN_NAME = import.meta.env.VITE_PLUGIN_NAME;
if (!PLUGIN_NAME) throw new Error("[api] 请在 .env 中配置 VITE_PLUGIN_NAME");

/** 默认 API 版本 */
export const API_VERSION = "v1";

/**
 * 构建 API 请求路径
 *
 * @param path    "controller/method" 格式，如 "ad/config"、"feedback/my"
 * @param version 可选版本号，默认使用 API_VERSION
 *
 * @example
 * api("ad/config")          // => "/plugin-qz/api.v1.ad/config"
 * api("help/list")          // => "/plugin-qz/api.v1.help/list"
 * api("help/list", "v2")    // => "/plugin-qz/api.v2.help/list"
 */
export function api(path: string, version: string = API_VERSION): string {
    const i = path.indexOf("/");
    if (i === -1) throw new Error(`[api] path 格式错误，需含 "/": "${path}"`);
    return `/${PLUGIN_NAME}/api.${version}.${path.slice(0, i)}/${path.slice(i + 1)}`;
}

/**
 * 语法糖：固定版本的路径构建器
 *
 * @example
 * v1("ad/config")   // => "/plugin-qz/api.v1.ad/config"
 * v2("help/list")   // => "/plugin-qz/api.v2.help/list"
 */
export const v1 = (path: string) => api(path, "v1");
export const v2 = (path: string) => api(path, "v2");
