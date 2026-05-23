<template>
    <view class="menu-wrapper">
        <view class="menu-list">


            <view class="menu-item" @tap="openHelp">
                <view class="menu-left">
                    <view class="menu-icon">
                        <text class="i-fa6-solid-circle-question menu-icon-symbol" />
                    </view>
                    <text class="menu-text">帮助中心</text>
                </view>
                <text class="i-fa6-solid-chevron-right menu-arrow" />
            </view>

            <view v-if="contact.official_qrcode" class="menu-item" @tap="openOfficial">
                <view class="menu-left">
                    <view class="menu-icon">
                        <text class="i-fa6-brands-weixin menu-icon-symbol" />
                    </view>
                    <text class="menu-text">关注公众号</text>
                </view>
                <view class="menu-right">
                    <text class="menu-reward">领奖励</text>
                    <text class="i-fa6-solid-chevron-right menu-arrow" />
                </view>
            </view>

            <button
                class="menu-item menu-button"
                open-type="contact"
                :send-message-title="contact.send_message_title"
                :send-message-path="contact.send_message_path"
                :send-message-img="contact.send_message_img"
                :show-message-card="contact.show_message_card"
            >
                <view class="menu-left">
                    <view class="menu-icon">
                        <text class="i-fa6-solid-headset menu-icon-symbol" />
                    </view>
                    <text class="menu-text">联系客服</text>
                </view>
                <text class="i-fa6-solid-chevron-right menu-arrow" />
            </button>
        </view>

        <official-popup v-if="official_visible && contact.official_qrcode" :qrcode="contact.official_qrcode" @close="closeOfficial" />
    </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useConfig } from "@/core";
import OfficialPopup from "./official-popup.vue";

const { contact } = useConfig();
const official_visible = ref(false);



function openHelp() {
    uni.navigateTo({
        url: "/pages/help/index",
    });
}

function openOfficial() {
    official_visible.value = true;
}

function closeOfficial() {
    official_visible.value = false;
}
</script>

<style scoped lang="scss">
.menu-wrapper {
    width: 100%;
}

.menu-list {
    overflow: hidden;
    padding: 12rpx 0;
    border: 1rpx solid var(--border-color-light);
    border-radius: var(--card-radius);
    background: #ffffff;
}

.menu-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32rpx 36rpx;
    background: transparent;
    line-height: 46rpx;
}

.menu-item:not(:last-child)::after {
    position: absolute;
    right: 36rpx;
    bottom: 0;
    left: 36rpx;
    height: 2rpx;
    background: var(--border-color-light);
    content: "";
}

.menu-item:active {
    background-color: rgba(49, 118, 255, 0.05);
}

.menu-button {
    width: 100%;
    margin: 0;
    border: 0;
    border-radius: 0;
    color: inherit;
    font: inherit;
    line-height: 46rpx;
    text-align: left;
}

.menu-button::after {
    border: 0;
}

.menu-left {
    display: flex;
    align-items: center;
    min-width: 0;
}

.menu-right {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 46rpx;
    margin-left: 24rpx;
}

.menu-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48rpx;
    height: 46rpx;
    flex-shrink: 0;
    color: #3176ff;
}

.menu-icon-symbol {
    font-size: var(--font-base);
    line-height: 1;
}

.menu-text {
    margin-left: 24rpx;
    color: #333333;
    font-size: var(--font-base);
    letter-spacing: 0.3px;
}

.menu-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #bebebe;
    font-size: var(--font-sm);
}

.menu-right .menu-arrow {
    transform: translateY(2rpx);
}

.menu-reward {
    display: flex;
    align-items: center;
    height: 46rpx;
    margin-right: 12rpx;
    color: #3176ff;
    font-size: var(--font-sm);
    line-height: 1;
}
</style>
