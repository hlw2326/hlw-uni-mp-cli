<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

onLaunch(() => {
    console.log("App Launch");
});
onShow(() => {
    console.log("App Show");
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
    // 用户自定义背景：玻璃态 + 渐变效果
    background: linear-gradient(135deg, rgba(248, 250, 252, 0.85) 0%, rgba(241, 245, 249, 0.85) 50%, rgba(238, 242, 255, 0.85) 100%);
    backdrop-filter: blur(20rpx);
    -webkit-backdrop-filter: blur(20rpx);
    border-bottom: 1px solid rgba(226, 232, 240, 0.6);
}
</style>
