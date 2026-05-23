import { computed } from "vue";
import type { ComputedRef } from "vue";
import { useAppStore, useUserStore } from "@/store";

export function useUser() {
    const store = useUserStore();
    const app = useAppStore();

    const token: ComputedRef<string> = computed(() => store.token);

    const user: ComputedRef<IUser.Info | null> = computed(() => store.user);

    const is_login: ComputedRef<boolean> = computed(() => !!store.token);

    function setLogin(newToken: string, info: IUser.Info): void {
        store.token = newToken;
        store.user = info;
    }

    function setUserInfo(info: IUser.Info): void {
        store.user = info;
    }

    function logout(): void {
        store.token = "";
        store.user = null;
    }

    async function login(): Promise<void> {
        const inviteUid = app.invite_uid > 0 ? String(app.invite_uid) : "";
        const res = await service.login.wx(inviteUid ? { invite_uid: inviteUid } : undefined);
        store.token = res.token;
        store.user = res.user as IUser.Info;
    }

    async function getUserInfo(): Promise<IUser.Info | null> {
        if (!store.token) {
            try {
                await login();
            } catch (error) {
                console.warn("[user] login before fetch failed", error);
                return null;
            }
        }

        try {
            const res = await service.user.info();
            if (res.code === 1 && res.data) {
                store.user = res.data as IUser.Info;
                return res.data as IUser.Info;
            }
            if (res.code !== 401) {
                hlw.$msg.toast(res.info || "用户信息加载失败");
            }
        } catch (error) {
            console.warn("[user] fetch failed", error);
        }

        return null;
    }

    return {
        token,
        user,
        is_login,
        setLogin,
        setUserInfo,
        logout,
        login,
        getUserInfo,
        store,
    };
}
