/**
 * 用户相关接口
 * 控制器：User (extends Auth，需要登录)
 */
import { http } from "@hlw-uni/mp-core";
import { v1 } from "./config";

/** 后端返回的完整用户实体类型 */
export interface UserInfo {
    uid: string;
    nickname: string;
    avatar_url: string;
    phone: string;
    score: number;
    vip_time: number;
}

/**
 * 获取或刷新当前登录用户信息 (预留)
 * GET plugin-qz/api.v1.user/info
 */
export function getUserInfo() {
    return http.request<{ data: UserInfo }>({
        url: v1("user/info"),
        method: "GET",
    });
}
