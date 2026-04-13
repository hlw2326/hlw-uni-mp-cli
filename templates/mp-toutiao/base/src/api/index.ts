/**
 * API 接口统一导出
 *
 * URL 规则：/{plugin}/api.v{version}.{controller}/{method}
 * 配置：./config.ts
 */
export { api, PLUGIN_NAME, API_VERSION } from "./config";
export * from "./login";
export * from "./user";
export * from "./ad";
export * from "./help";
export * from "./tools";
export * from "./notice";
export * from "./feedback";
