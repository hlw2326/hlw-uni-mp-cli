<template>
    <!-- page-meta 注入主题变量到 page 级，scroll-view 内部也能继承 -->
    <page-meta :page-style="themePageStyle" />
    <hlw-page title="工具箱" bg-class="header-bg" />
</template>

<script setup lang="ts">
import { onShow, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
import { useThemePageStyle } from "@hlw-uni/mp-vue";
import { useUser } from "@/core";

const { themePageStyle } = useThemePageStyle();
const { getUserInfo } = useUser();

/** 分享卡片（朋友 + 朋友圈共用一份，朋友圈只用 title） */
const share = () => ({
    title: "换成你的小程序分享标题",
    path: "/pages/tools/index",
});
onShareAppMessage(share);
onShareTimeline(share);

onShow(() => {
    getUserInfo();
});
</script>
