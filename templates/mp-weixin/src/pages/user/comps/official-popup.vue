<template>
    <view class="official-popup" @tap="close">
        <view class="official-dialog" @tap.stop>
            <view class="official-dialog-header">
                <text class="official-dialog-title">关注公众号</text>
                <view class="official-dialog-close" @tap="close">
                    <text class="i-fa6-solid-xmark official-dialog-close-icon" />
                </view>
            </view>
            <view class="official-qrcode-card">
                <image class="official-qrcode" :src="qrcode" mode="aspectFit" show-menu-by-longpress />
            </view>
            <text class="official-tip">长按二维码图片，识别并关注公众号</text>
        </view>
    </view>
</template>

<script setup lang="ts">
defineProps<{
    qrcode: string;
}>();

const emit = defineEmits<{
    (event: "close"): void;
}>();

function close() {
    emit("close");
}
</script>

<style scoped lang="scss">
.official-popup {
    position: fixed;
    z-index: 99;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40rpx;
    background: rgba(15, 23, 42, 0.52);
}

.official-dialog {
    width: 100%;
    max-width: 520rpx;
    padding: 0;
    border: 1rpx solid rgba(255, 255, 255, 0.72);
    border-radius: 28rpx;
    background: #ffffff;
    box-shadow: 0 24rpx 70rpx rgba(15, 23, 42, 0.16);
}

.official-dialog-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 106rpx;
    padding: 0 30rpx;
}

.official-dialog-header::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    border-bottom: 1rpx dashed var(--border-color-light);
    content: "";
}

.official-dialog-title {
    display: block;
    color: #1f2937;
    font-size: var(--font-base);
    font-weight: 400;
    line-height: 1.3;
    text-align: center;
    letter-spacing: 3rpx;
}

.official-dialog-close {
    position: absolute;
    top: 50%;
    right: 18rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56rpx;
    height: 56rpx;
    flex-shrink: 0;
    border-radius: 50%;
    color: #94a3b8;
    transform: translateY(-50%);
}

.official-dialog-close:active {
    background: rgba(49, 118, 255, 0.08);
    color: #3176ff;
}

.official-dialog-close-icon {
    font-size: var(--font-sm);
    line-height: 1;
}

.official-qrcode-card {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin: 30rpx auto 24rpx;
    padding: 10rpx;
    border-radius: 24rpx;
    background: #f8fafc;
    text-align: center;
    margin: 30rpx;
}

.official-qrcode {
    display: block;
    width: 350rpx;
    height: 350rpx;
    margin: 0 auto;
}

.official-tip {
    display: block;
    padding: 36rpx 0;
    color: #64748b;
    font-size: var(--font-sm);
    line-height: 1.5;
    text-align: center;
    letter-spacing: 3rpx;
}
</style>
