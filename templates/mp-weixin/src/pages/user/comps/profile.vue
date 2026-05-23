<template>
    <view class="profile-header">
        <view class="avatar-section">
            <view class="avatar-wrapper">
                <hlw-avatar :src="user?.avatar_url || ''" :name="user?.nickname || `微信用户${user?.id || '--'}`" size="large" :border="3" />
                <button class="edit-avatar" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
                    <text class="iconfont icon-upload" />
                </button>
            </view>
            <view class="user-info">
                <text class="username">{{ user?.nickname || `微信用户${user?.id || "--"}` }}</text>
                <view class="id-wrapper" v-copy="user?.id">
                    <text class="user-id">ID: {{ user?.id || "--" }}</text>
                    <view class="copy-id">
                        <text class="iconfont icon-copy" />
                    </view>
                </view>
            </view>

            <view class="vip-tag">
                <text class="i-fa6-solid-gift vip-icon" />
                <text class="vip-text">永久免费</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { useConfig, useUser } from "@/core";

const { user, setUserInfo } = useUser();

async function onChooseAvatar(event: any) {
    const filePath = String(event?.detail?.avatarUrl || "");
    if (!filePath) return;
    uni.showLoading({ title: "上传中", mask: true });
    try {
        const avatarUrl = await service.upload.file({ biz: "avatar", filePath });
        const res = await service.user.update({ avatar_url: avatarUrl });
        if (res.code !== 1 || !res.data) {
            hlw.$msg.toast(res.info || "头像保存失败");
            return;
        }
        setUserInfo(res.data);
        hlw.$msg.toast("头像已更新");
    } catch (error: any) {
        console.warn("[user] avatar upload failed", error);
        hlw.$msg.toast(error?.message || "头像上传失败");
    } finally {
        uni.hideLoading();
    }
}
</script>

<style scoped lang="scss">
.profile-header {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--card-padding);
    border: 1rpx solid var(--border-color-light);
    border-radius: var(--card-radius);
    background: linear-gradient(135deg, #3c7efe 0%, #5b93ff 100%);
    backdrop-filter: blur(10rpx);
}

.avatar-section {
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
}

.avatar-wrapper {
    position: relative;
    flex-shrink: 0;
    margin-right: 46rpx;
    box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.1);
}

.edit-avatar {
    position: absolute;
    bottom: -8rpx;
    left: -8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44rpx;
    height: 44rpx;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 999rpx;
    background: #3176ff;
    color: #ffffff;
    font: inherit;
    line-height: normal;
    box-shadow: 0 4rpx 12rpx rgba(49, 118, 255, 0.3);
}

.edit-avatar::after {
    border: 0;
}

.edit-avatar .iconfont {
    font-size: var(--font-22);
}

.user-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.username {
    overflow: hidden;
    max-width: 320rpx;
    margin-bottom: 12rpx;
    color: #ffffff;
    font-size: var(--font-lg);
    font-weight: 600;
    letter-spacing: 0.5px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.id-wrapper {
    display: flex;
    align-items: center;
}

.user-id {
    margin-right: 12rpx;
    color: rgba(255, 255, 255, 0.8);
    font-size: var(--font-sm);
}

.copy-id {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rpx 8rpx;
    border-radius: 8rpx;
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.8);
}

.copy-id .iconfont {
    font-size: var(--font-22);
}

.vip-tag {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rpx 16rpx;
    border: 1rpx solid var(--border-color-light);
    border-radius: 999rpx;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8rpx);
}

.vip-icon {
    color: #ffffff;
    font-size: var(--font-xs);
    line-height: 1;
    margin-right: 5rpx;
}

.vip-text {
    margin-left: 4rpx;
    color: #ffffff;
    font-size: var(--font-22);
    letter-spacing: 3rpx;
}
</style>
