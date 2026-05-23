<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useApp } from "@/core/app";

const { applyLaunchOptions } = useApp();

onLaunch((options: any) => {
    applyLaunchOptions(options);
    console.log("App Launch", options);
});
onShow((options: any) => {
    applyLaunchOptions(options);
    console.log("App Show", options);
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
        radial-gradient(circle at top right, var(--primary-light, rgba(59, 130, 246, 0.12)), transparent 56%),
        linear-gradient(
            180deg,
            var(--bg-elevated, #ffffff) 0%,
            var(--surface-card-muted, #f8fafc) 58%,
            var(--bg-page, #f8fafc) 100%
        );
    backdrop-filter: blur(20rpx);
    -webkit-backdrop-filter: blur(20rpx);
}

</style>
