/**
 * 用户相关接口
 * 控制器：User (extends Auth，需要登录)
 */
import { http } from "@hlw-uni/mp-vue";
import { v1 } from "./config";

/** 后端返回的完整用户实体类型 */
export interface UserInfo {
    uid: string;
    nickname: string;
    avatar_url: string;
    phone: string;
    score: number;
    vip_time: number;
    /** 1=该用户强制屏蔽展示型广告（优先级高于 mp.vip_no_ad），0=默认 */
    vip_no_ad: number;
    /** 0 保密 / 1 男 / 2 女 */
    gender: number;
    /** YYYY-MM-DD，空串表示未填写 */
    birthday: string;
    /** "中国 · 广东省 · 深圳市"，空串表示未填写 */
    region: string;
    signature: string;
}

/** 可更新的用户资料字段（全部可选，按需传） */
export interface UserProfilePatch {
    nickname?: string;
    avatar_url?: string;
    gender?: number;
    birthday?: string;
    region?: string;
    signature?: string;
}

/**
 * 获取当前登录用户信息
 * GET {plugin}/api.v1.user/info
 * 返回 ApiResponse<UserInfo>：{ code: 1, data: UserInfo, info: '获取成功' }
 * 未登录/token 失效时后端返回 { code: 401, info: '请先登录' }（HTTP 仍为 200）
 */
export function getUserInfo() {
    return http.request<UserInfo>({
        url: v1("user/info"),
        method: "GET",
    });
}

/**
 * 更新当前登录用户资料
 * POST {plugin}/api.v1.user/update
 */
export function updateUserInfo(data: UserProfilePatch) {
    return http.request<UserInfo>({
        url: v1("user/update"),
        method: "POST",
        data,
    });
}
