<template>
    <page-meta :page-style="fontPageStyle" />
    <hlw-page title="工具箱" bg-class="header-bg">
        <view class="container">
            <!-- 数据分析 -->
            <hlw-menu title="数据分析" mode="grid" :columns="4" :items="analysisTools" @click="handleClick" />

            <!-- 内容创作 -->
            <hlw-menu title="内容创作" mode="grid" :columns="4" :items="contentTools" @click="handleClick" />

            <!-- 平台工具 -->
            <hlw-menu title="平台工具" mode="grid" :columns="4" :items="platformTools" @click="handleClick" />
        </view>
    </hlw-page>
</template>

<script setup lang="ts">
import type { HlwMenuItem } from "@hlw-uni/mp-vue";
import { useFontPageStyle } from "@hlw-uni/mp-vue";

const { fontPageStyle } = useFontPageStyle();

const analysisTools: HlwMenuItem[] = [
    { icon: "i-fa6-solid-magnifying-glass-chart", iconTheme: "blue", label: "关键词分析" },
    { icon: "i-fa6-solid-chart-line", iconTheme: "emerald", label: "流量趋势" },
    { icon: "i-fa6-solid-users", iconTheme: "purple", label: "粉丝画像" },
    { icon: "i-fa6-solid-ranking-star", iconTheme: "orange", label: "热榜排行", tag: "HOT", tagTheme: "red", tagPulse: true },
    { icon: "i-fa6-solid-chart-pie", iconTheme: "cyan", label: "内容占比" },
    { icon: "i-fa6-solid-arrow-trend-up", iconTheme: "rose", label: "涨粉分析" },
    { icon: "i-fa6-solid-eye", iconTheme: "slate", label: "阅读分析" },
    { icon: "i-fa6-solid-heart", iconTheme: "rose", label: "互动分析" },
];

const contentTools: HlwMenuItem[] = [
    { icon: "i-fa6-solid-wand-magic-sparkles", iconTheme: "purple", label: "AI 标题", tag: "AI", tagTheme: "blue" },
    { icon: "i-fa6-solid-pen-nib", iconTheme: "orange", label: "文案助手" },
    { icon: "i-fa6-solid-hashtag", iconTheme: "cyan", label: "话题标签" },
    { icon: "i-fa6-solid-image", iconTheme: "emerald", label: "封面推荐" },
    { icon: "i-fa6-solid-clock", iconTheme: "blue", label: "发布日历" },
    { icon: "i-fa6-solid-fire", iconTheme: "orange", label: "爆款拆解" },
    { icon: "i-fa6-solid-quote-left", iconTheme: "slate", label: "评论模板" },
    { icon: "i-fa6-solid-bullseye", iconTheme: "rose", label: "选题策划" },
];

const platformTools: HlwMenuItem[] = [
    { icon: "i-fa6-brands-weixin", iconTheme: "wechat", label: "微信指数" },
    { icon: "i-fa6-solid-music", iconTheme: "slate", label: "抖音数据" },
    { icon: "i-fa6-solid-book-open", iconTheme: "rose", label: "小红书" },
    { icon: "i-fa6-brands-weibo", iconTheme: "orange", label: "微博热搜" },
    { icon: "i-fa6-solid-tv", iconTheme: "blue", label: "B站数据" },
    { icon: "i-fa6-solid-store", iconTheme: "emerald", label: "电商选品" },
    { icon: "i-fa6-solid-globe", iconTheme: "cyan", label: "全网对比" },
    { icon: "i-fa6-solid-ellipsis", iconTheme: "slate", label: "更多平台" },
];

const handleClick = (item: HlwMenuItem) => {
    hlw.$msg.toast(item.label);
};
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
    padding-bottom: 32rpx;
}
</style>
