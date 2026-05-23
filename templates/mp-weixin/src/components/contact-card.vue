<template>
    <view class="contact-card">
        <view class="contact-copy">
            <text class="contact-title">{{ title }}</text>
            <text class="contact-desc">{{ desc }}</text>
        </view>
        <button
            class="contact-button"
            open-type="contact"
            :send-message-title="contact.send_message_title"
            :send-message-path="contact.send_message_path"
            :send-message-img="contact.send_message_img"
            :show-message-card="contact.show_message_card"
        >
            <text class="iconfont icon-service" />
            <text class="contact-button-text">联系客服</text>
        </button>
    </view>
</template>

<script setup lang="ts">
import { useConfig } from "@/core";

defineProps<{
    title: string;
    desc: string;
}>();

const { contact } = useConfig();
</script>

<style scoped lang="scss">
.contact-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--card-padding);
    border: 1rpx solid var(--border-color-light);
    border-radius: var(--card-radius);
    background: linear-gradient(135deg, #ffffff 0%, rgba(49, 118, 255, 0.05) 100%);
}

.contact-copy {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    margin-right: 22rpx;
}

.contact-title {
    margin-bottom: 8rpx;
    color: #1f2937;
    font-size: var(--font-base);
    line-height: 1.3;
    letter-spacing: 3rpx;
}

.contact-desc {
    color: #94a3b8;
    font-size: var(--font-sm);
    line-height: 1.45;
    letter-spacing: 3rpx;
}

.contact-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10rpx;
    width: 176rpx;
    height: 68rpx;
    flex-shrink: 0;
    margin: 0;
    border-radius: var(--radius-full);
    background: #3176ff;
    color: #ffffff;
    font: inherit;
    line-height: 68rpx;
}

.contact-button .iconfont {
    font-size: var(--font-sm);
}

.contact-button-text {
    color: inherit;
    font-size: var(--font-sm);
    line-height: 1;
}
</style>
