<template>
    <view class="font-setting">
        <view class="font-setting-header">
            <text class="font-setting-title">字体大小</text>
            <text class="font-setting-hint">调整后全页面立即生效</text>
        </view>

        <!-- 档位选择 -->
        <view class="font-setting-options">
            <view
                v-for="opt in fontStore.options"
                :key="opt.value"
                class="font-option"
                :class="{ 'font-option--active': fontStore.scale === opt.value }"
                @tap="fontStore.setScale(opt.value)"
            >
                <view class="font-option-icon-wrap">
                    <text class="font-option-icon" :class="`font-option-icon--${opt.value}`">文</text>
                </view>
                <text class="font-option-label">{{ opt.label }}</text>
                <view v-if="fontStore.scale === opt.value" class="font-option-check">
                    <text class="i-fa6-solid-check font-option-check-icon"></text>
                </view>
            </view>
        </view>

        <!-- 预览区 -->
        <view class="font-preview">
            <text class="font-preview-label">预览</text>
            <view class="font-preview-body">
                <text class="font-preview-text font-preview-base">这是正文字体大小示例</text>
                <text class="font-preview-text font-preview-sm">这是辅助文字大小示例</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { useFontStore } from "@/store";
const fontStore = useFontStore();
</script>

<style lang="scss" scoped>
.font-setting {
    background: #fff;
    border-radius: var(--radius-lg);
    border: 1rpx solid var(--border-color);
    overflow: hidden;
}

.font-setting-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx 32rpx;
    border-bottom: 1rpx dashed var(--border-color);
}

.font-setting-title {
    font-size: var(--font-sm, 24rpx);
    font-weight: 600;
    color: #94a3b8;
    letter-spacing: 1rpx;
}

.font-setting-hint {
    font-size: var(--font-xs, 20rpx);
    color: #cbd5e1;
}

/* 档位列表 */
.font-setting-options {
    display: flex;
    flex-direction: column;
}

.font-option {
    display: flex;
    align-items: center;
    gap: 24rpx;
    padding: 24rpx 32rpx;
    position: relative;
    transition: background 0.15s;

    &:active {
        background: #f8fafc;
    }

    & + & {
        border-top: 1rpx dashed var(--border-color);
    }

    &--active {
        background: #f8fafc;
    }
}

.font-option-icon-wrap {
    width: 64rpx;
    height: 64rpx;
    border-radius: var(--radius-md, 16rpx);
    background: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.font-option-icon {
    font-weight: 700;
    color: #64748b;

    &--normal  { font-size: 24rpx; }
    &--large   { font-size: 30rpx; }
    &--xlarge  { font-size: 36rpx; }
}

.font-option-label {
    flex: 1;
    font-size: var(--font-base, 28rpx);
    font-weight: 500;
    color: #334155;
}

.font-option-check {
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    background: #3b82f6;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.font-option-check-icon {
    font-size: 20rpx;
    color: #fff;
}

/* 预览区 */
.font-preview {
    border-top: 1rpx dashed var(--border-color);
    padding: 24rpx 32rpx;
    background: #fafafa;
}

.font-preview-label {
    font-size: var(--font-xs, 20rpx);
    color: #94a3b8;
    letter-spacing: 1rpx;
    margin-bottom: 16rpx;
    display: block;
}

.font-preview-body {
    display: flex;
    flex-direction: column;
    gap: 12rpx;
}

.font-preview-text {
    color: #334155;
    line-height: 1.6;
}

.font-preview-base { font-size: var(--font-base, 28rpx); }
.font-preview-sm   { font-size: var(--font-sm, 24rpx); color: #94a3b8; }
</style>
