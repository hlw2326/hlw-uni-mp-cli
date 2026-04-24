/**
 * 用户领域的业务封装
 *
 * 分工：
 *   - store/user：只存数据（token、userInfo），靠 unistorage 自动持久化
 *   - core/user ：对外暴露业务语义的方法和派生状态
 *
 * 使用方式：
 *   const { token, userInfo, isLoggedIn, setLogin, clearLogin } = useUser();
 */
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store";
import { getUserInfo as fetchUserInfo, type UserInfo } from "@/api/user";
import { wxLogin } from "@/api/login";

/** 未设置头像时统一兜底（所有页面共用一张，避免视觉分裂） */
const DEFAULT_AVATAR = "https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=f2f2f7";

/**
 * 登录请求的单例 Promise —— 多处同时调用（冷启动、401 兜底、设置页手动重登）时只发一次 wx.login。
 * 故意放在模块级而非 useUser() 内部，否则每次调用 useUser() 会各建各的占位。
 */
let loginPending: Promise<void> | null = null;

/** 登录重试之间的退避延迟（毫秒）：立即 → 1s → 3s */
const LOGIN_RETRY_DELAYS = [0, 1000, 3000];

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/**
 * 单次登录：wx.login + 调后端 + 写 store。
 * 成功即 resolve，失败原样抛出由外层重试/兜底。
 */
async function loginOnce(store: ReturnType<typeof useUserStore>): Promise<void> {
    const invite = store.inviteCode || "";
    const res = await wxLogin({ invite_code: invite });
    store.token = res.token;
    store.userInfo = res.user as UserInfo;
    // 用掉即清空：同一设备不同用户切换时避免误用
    if (invite) store.inviteCode = "";
}

/**
 * 带重试的登录：LOGIN_RETRY_DELAYS 每次失败后按数组里的延迟等待再试。
 * 全部尝试都失败才 reject，由 bootstrap 兜底 toast。
 */
async function loginWithRetry(store: ReturnType<typeof useUserStore>): Promise<void> {
    let lastErr: unknown;
    for (const delay of LOGIN_RETRY_DELAYS) {
        if (delay > 0) await sleep(delay);
        try {
            await loginOnce(store);
            return;
        } catch (e) {
            lastErr = e;
            console.warn("[user] login attempt failed", e);
        }
    }
    console.error("[user] login failed after retries", lastErr);
    throw lastErr;
}

export function useUser() {
    const store = useUserStore();
    const { token, userInfo } = storeToRefs(store);

    /** 是否已登录（有 token 即视为登录） */
    const isLoggedIn = computed(() => !!token.value);

    /* ===== 资料派生字段（避免页面各自重复 computed） ===== */
    /** 昵称，未登录 / 无昵称时显示 "游客" */
    const nickname = computed(() => userInfo.value?.nickname || "游客");
    /** 头像 URL，空值兜底到 DEFAULT_AVATAR */
    const avatarUrl = computed(() => userInfo.value?.avatar_url || DEFAULT_AVATAR);
    /** 用户 ID，无值显示 "--" */
    const uid = computed(() => userInfo.value?.uid || "--");
    /** 是否 VIP：vip_time 秒级时间戳大于当前时间 */
    const isVip = computed(() => (userInfo.value?.vip_time ?? 0) > Math.floor(Date.now() / 1000));

    /** 登录成功：同时写入 token 和用户信息 */
    function setLogin(newToken: string, info: UserInfo): void {
        store.token = newToken;
        store.userInfo = info;
    }

    /** 仅更新用户信息，token 保持不变（如 /user/info 拉到最新资料） */
    function setUserInfo(info: UserInfo): void {
        store.userInfo = info;
    }

    /** 清空登录态 */
    function clearLogin(): void {
        store.token = "";
        store.userInfo = null;
    }

    /**
     * 走一次 wx.login 换 token + 用户信息回写 store。
     * - 带上 store 里暂存的邀请码（由 App.vue onLaunch 捕获）
     * - 失败时静默重试 2 次（延迟 1s / 3s），全部失败才 reject
     * - loginPending 占位做并发保护
     */
    function login(): Promise<void> {
        if (loginPending) return loginPending;
        const promise = loginWithRetry(store).finally(() => {
            loginPending = null;
        });
        loginPending = promise;
        return promise;
    }

    /**
     * 从后端拉最新用户信息并回写 store。
     * 无 token / 拉取失败时静默返回 null，不抛异常（页面 onShow 调用不要被它阻塞）。
     */
    async function getUserInfo(): Promise<UserInfo | null> {
        if (!token.value) return null;
        try {
            const res = await fetchUserInfo();
            if (res.code === 1 && res.data) {
                store.userInfo = res.data as UserInfo;
                return res.data as UserInfo;
            }
        } catch (e) {
            console.warn("[user] fetch failed", e);
        }
        return null;
    }

    return {
        // 响应式状态
        token,
        userInfo,
        isLoggedIn,
        // 资料派生字段
        nickname,
        avatarUrl,
        uid,
        isVip,
        // 写入方法
        setLogin,
        setUserInfo,
        clearLogin,
        login,
        getUserInfo,
    };
}
