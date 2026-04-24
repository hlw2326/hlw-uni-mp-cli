/**
 * 登录相关接口
 * 控制器：Login (extends Base，无需登录)
 */
import { http } from "@hlw-uni/mp-core";
import type { UserInfo } from "./user";
import { v1 } from "./config";

/** 登录响应数据 */
export interface LoginResult {
    token: string;
    user: Pick<UserInfo, "uid" | "nickname" | "avatar_url" | "phone" | "score" | "vip_time">;
}

/**
 * 小程序登录
 * @param code wx.login 获取的 code
 */
export function login(code: string, nickname?: string, avatar_url?: string) {
    return http.request<LoginResult>({
        url: v1("login/in"),
        method: "POST",
        data: { code, nickname, avatar_url },
    });
}

/**
 * 封装微信登录流程：wx.login → 调用后端
 */
export function wxLogin(nickname?: string, avatar_url?: string) {
    return new Promise<LoginResult>((resolve, reject) => {
        uni.login({
            provider: "weixin",
            success: async (loginRes) => {
                try {
                    const res = await login(loginRes.code, nickname, avatar_url);
                    resolve(res.data);
                } catch (e) {
                    reject(e);
                }
            },
            fail: (err) => reject(new Error(err.errMsg || "微信登录失败")),
        });
    });
}
