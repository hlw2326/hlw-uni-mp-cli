/**
 * User Pinia Store — token, userInfo
 */
import { defineStore } from "pinia";
import { ref } from "vue";

export interface UserInfo {
    id: string;
    pid: number;
    openid: string;
    unionid: string;
    nickname: string;
    avatar_url: string;
    gender: number;
    phone: string;
    score: number;
    vip_time: number;
    login_ip: string;
    last_login_ip: string;
    login_at: string | null;
    last_login_at: string | null;
    remark: string;
    device_model: string;
    device_system: string;
    screen_width: number;
    screen_height: number;
    sdk_version: string;
    app_version: string;
    app_channel: string;
}

export const useUserStore = defineStore(
    "user",
    () => {
        const token = ref("");
        const userInfo = ref<UserInfo | null>(null);
        const isLoggedIn = ref(false);

        return { token, userInfo, isLoggedIn };
    },
    { unistorage: true },
);
