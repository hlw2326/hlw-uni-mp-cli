/**
 * 广告配置接口
 * 控制器：Ad (extends Base，无需登录)
 */
import { http } from "@hlw-uni/mp-core";
import { v1 } from "./config";

/** 广告单元 */
export interface AdUnit {
    id: number;
    name: string;
    unit_id: string;
    ad_type: string;
    position: string;
}

/** 广告配置响应 */
export interface AdConfigResult {
    list: AdUnit[];
    map: Record<string, AdUnit>;
}

/**
 * 获取广告配置
 */
export function getAdConfig() {
    return http.request<AdConfigResult>({
        url: v1("ad/config"),
        method: "GET",
    });
}
