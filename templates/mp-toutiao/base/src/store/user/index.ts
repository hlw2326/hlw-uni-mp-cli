/**
 * User Pinia Store — token, userInfo, login/logout
 */
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { UserInfo } from "@/api/user";

export const useUserStore = defineStore(
    "user",
    () => {
        const token = ref("");
        const userInfo = ref<UserInfo | null>(null);

        /** 是否已登录 */
        const isLoggedIn = computed(() => !!token.value);

        /** 设置登录态 */
        function setLogin(t: string, user: UserInfo) {
            token.value = t;
            userInfo.value = user;
        }

        /** 清除登录态 */
        function clearLogin() {
            token.value = "";
            userInfo.value = null;
        }

        return { token, userInfo, isLoggedIn, setLogin, clearLogin };
    },
    { unistorage: true },
);
