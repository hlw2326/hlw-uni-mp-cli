<template>
    <page-meta :page-style="fontPageStyle" />
    <hlw-page title="首页" bg-class="header-bg">
        <!-- 字体档位示例 -->
        <view class="section">
            <view class="section-title">字体档位（当前：{{ fontStore.options.find(o => o.value === fontStore.scale)?.label }}）</view>
            <view class="font-row">
                <text class="font-xs">极小 --font-xs</text>
                <text class="font-sm">小号 --font-sm</text>
                <text class="font-base">正文 --font-base</text>
                <text class="font-md">中等 --font-md</text>
                <text class="font-lg">大号 --font-lg</text>
                <text class="font-xl">特大 --font-xl</text>
            </view>
            <view class="scale-btns">
                <view
                    v-for="opt in fontStore.options"
                    :key="opt.value"
                    class="scale-btn"
                    :class="{ active: fontStore.scale === opt.value }"
                    @tap="fontStore.setScale(opt.value)"
                >
                    {{ opt.label }}
                </view>
            </view>
        </view>

        <!-- 圆角体系示例 -->
        <view class="section">
            <view class="section-title">圆角体系</view>
            <view class="radius-row">
                <view class="radius-box radius-sm"><text class="font-xs">sm</text></view>
                <view class="radius-box radius-md"><text class="font-xs">md</text></view>
                <view class="radius-box radius-lg"><text class="font-xs">lg</text></view>
                <view class="radius-box radius-xl"><text class="font-xs">xl</text></view>
            </view>
        </view>

        <!-- 边框颜色示例 -->
        <view class="section">
            <view class="section-title">边框颜色</view>
            <view class="border-row">
                <view class="border-box border-standard"><text class="font-xs">标准</text></view>
                <view class="border-box border-light"><text class="font-xs">浅色</text></view>
                <view class="border-box border-focus"><text class="font-xs">焦点</text></view>
            </view>
        </view>
    </hlw-page>
</template>

<script setup lang="ts">
import { useFontPageStyle } from "@hlw-uni/mp-vue";
import { useFontStore } from "@/store";

const { fontPageStyle } = useFontPageStyle();
const fontStore = useFontStore();
</script>

<style scoped lang="scss">
.section {
    margin: 24rpx 32rpx 0;
    background: #fff;
    border-radius: var(--radius-xl);
    padding: 28rpx;
}

.section-title {
    font-size: var(--font-sm);
    color: #94a3b8;
    margin-bottom: 20rpx;
}

/* 字体档位 */
.font-row {
    display: flex;
    flex-direction: column;
    gap: 12rpx;
    margin-bottom: 24rpx;
}

.font-xs   { font-size: var(--font-xs);   color: #334155; }
.font-sm   { font-size: var(--font-sm);   color: #334155; }
.font-base { font-size: var(--font-base); color: #334155; }
.font-md   { font-size: var(--font-md);   color: #334155; }
.font-lg   { font-size: var(--font-lg);   color: #334155; }
.font-xl   { font-size: var(--font-xl);   color: #334155; }

.scale-btns {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16rpx;
}

.scale-btn {
    text-align: center;
    padding: 12rpx 0;
    border-radius: var(--radius-md);
    font-size: var(--font-sm);
    color: #64748b;
    background: #f1f5f9;

    &.active {
        background: #eff6ff;
        color: #3b82f6;
        font-weight: 600;
    }
}

/* 圆角体系 */
.radius-row {
    display: flex;
    gap: 16rpx;
}

.radius-box {
    flex: 1;
    aspect-ratio: 1;
    background: #eff6ff;
    display: flex;
    align-items: center;
    justify-content: center;
}

.radius-sm { border-radius: var(--radius-sm); }
.radius-md { border-radius: var(--radius-md); }
.radius-lg { border-radius: var(--radius-lg); }
.radius-xl { border-radius: var(--radius-xl); }

/* 边框颜色 */
.border-row {
    display: flex;
    gap: 16rpx;
}

.border-box {
    flex: 1;
    padding: 20rpx 0;
    border-width: 2rpx;
    border-style: solid;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
}

.border-standard { border-color: var(--border-color); }
.border-light    { border-color: var(--border-color-light); background: #f8fafc; }
.border-focus    { border-color: var(--border-color-focus); background: #eff6ff; }
</style>
