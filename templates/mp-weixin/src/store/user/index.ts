/**
 * User Pinia Store — 只存数据，不写任何方法
 * 派生计算与写入逻辑统一在 @/core/user 里封装为 useUser
 */
import { defineStore } from "pinia";
import { ref } from "vue";
import type { UserInfo } from "@/api/user";

export const useUserStore = defineStore(
    "user",
    () => {
        const token = ref("");
        const userInfo = ref<UserInfo | null>(null);
        /**
         * 邀请码：由 App.vue onLaunch/onShow 从启动 query 捕获，
         * 首次登录时读取下发给后端，消费后清空。
         */
        const pid = ref("0");

        return { token, userInfo, pid };
    },
    { unistorage: true },
);
