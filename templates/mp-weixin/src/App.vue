<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useUserStore } from "@/store";

/**
 * 从启动参数里捕获邀请码，暂存到 user store，下次 postWxLogin 时用掉。
 * 支持两种入口：
 *   1. 分享卡片：path 带 ?pid=<uid>       → options.query.pid
 *   2. 扫描小程序码（scene=<uid>）              → options.query.scene
 */
function getPid(options: { query?: Record<string, string> } | undefined) {
    const query = options?.query || {};
    const code = query.pid || query.scene || "";
    if (!code) return;
    const store = useUserStore();
    // 已登录用户的邀请码忽略（避免老用户点分享链接被二次"认爹"）
    if (store.token) return;
    store.pid = code;
}

onLaunch((options: any) => {
    console.log("App Launch", options);
    getPid(options);
});
onShow((options: any) => {
    console.log("App Show", options);
    getPid(options);
});
onHide(() => {
    console.log("App Hide");
});
</script>

<style lang="scss">
@use "./static/css/style.scss";
@use "./static/css/iconfont.css";

.header-bg {
    width: 100%;
    height: 100%;
    background:
        radial-gradient(circle at top right, var(--primary-light, rgba(59, 130, 246, 0.12)), transparent 42%),
        linear-gradient(180deg, var(--bg-elevated, #ffffff), var(--surface-card-muted, #f8fafc));
    backdrop-filter: blur(20rpx);
    -webkit-backdrop-filter: blur(20rpx);
    border-bottom: 1px solid var(--border-color, rgba(226, 232, 240, 0.6));
}
</style>
