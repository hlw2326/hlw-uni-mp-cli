<template>
    <view class="profile-wrap">
        <view class="card">
            <view class="glow-bg"></view>

            <!-- 头像区域 -->
            <view class="avatar-wrap">
                <view class="avatar-ring">
                    <view class="avatar-inner">
                        <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Felix&backgroundColor=FFE0B2" class="avatar-img" alt="Avatar" />
                    </view>
                </view>
            </view>

            <!-- 信息区域 -->
            <view class="info">
                <view class="name-row">
                    <text class="username">Guest_9527</text>
                    <view class="vip-badge">
                        <text class="i-fa6-solid-gem gem-icon"></text>
                        <text class="pro-text">PRO</text>
                    </view>
                </view>
                <view class="id-row">
                    <view class="id-copy" v-copy="userId">
                        <text class="id-label">ID:</text>
                        <text class="id-value">{{ userId }}</text>
                        <text class="i-fa6-solid-copy copy-icon"></text>
                    </view>
                </view>
            </view>

            <!-- 编辑按钮 -->
            <button class="edit-btn" @tap="test" data-name=":666s">
                <text class="i-fa6-solid-pen-to-square edit-icon"></text>
            </button>
        </view>
    </view>
</template>

<script setup lang="ts">
const userId = "88329104";

function test(e: any) {
    console.log(e);
}
</script>

<style lang="scss" scoped>
.profile-wrap {
    width: 100%;
}

.card {
    background: #fff;
    border-radius: var(--radius-xl);
    border: 1rpx solid var(--border-color);
    padding: 32rpx;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.glow-bg {
    position: absolute;
    top: -48rpx;
    right: -48rpx;
    width: 256rpx;
    height: 256rpx;
    background: rgba(254, 243, 199, 0.3);
    border-radius: 50%;
    pointer-events: none;
}

.avatar-wrap {
    position: relative;
    margin-right: 32rpx;
    flex-shrink: 0;
    z-index: 10;
}

.avatar-ring {
    width: 128rpx;
    height: 128rpx;
    border-radius: 50%;
    padding: 6rpx;
    background: linear-gradient(to top right, #fde68a, #facc15, #f97316);
    box-shadow: 0 16rpx 48rpx rgba(252, 211, 77, 0.5);
    box-sizing: border-box;
}

.avatar-inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 4rpx solid #fff;
    overflow: hidden;
    background: #f8fafc;
    position: relative;
    box-sizing: border-box;
}

.avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.info {
    flex: 1;
    min-width: 0;
    z-index: 10;
    margin-right: 16rpx;
}

.name-row {
    display: flex;
    align-items: center;
    gap: 16rpx;
    margin-bottom: 12rpx;
}

.username {
    font-size: var(--font-md);
    font-weight: 700;
    color: #1e293b;
    letter-spacing: -0.025em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.vip-badge {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 8rpx;
    padding: 4rpx 16rpx;
    background: linear-gradient(to right, #0f172a, #1e293b);
    border: 1rpx solid rgba(100, 116, 139, 0.5);
    border-radius: 9999rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.15);
}

.gem-icon {
    font-size: 18rpx;
    color: #fbbf24;
}

.pro-text {
    font-size: var(--font-xs);
    font-weight: 700;
    color: #fef3c7;
    letter-spacing: 0.1em;
}

.id-row {
    display: flex;
    align-items: center;
}

.id-copy {
    display: flex;
    align-items: center;
    gap: 12rpx;
    padding: 4rpx 16rpx;
    background: #f8fafc;
    border-radius: var(--radius-sm);
    border: 1rpx solid var(--border-color-light);

    &:active {
        background: var(--border-color-light);
    }
}

.id-label {
    font-size: var(--font-xs);
    color: #94a3b8;
}

.id-value {
    font-size: var(--font-xs);
    font-family: monospace;
    font-weight: 500;
    color: #475569;
    letter-spacing: 0.04em;
}

.copy-icon {
    font-size: 20rpx;
    color: #cbd5e1;
    margin-left: 4rpx;
}

.edit-btn {
    flex-shrink: 0;
    width: 66rpx;
    height: 66rpx;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #f8fafc;
    border: 1rpx solid var(--border-color);
    color: #64748b;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
    z-index: 10;
    outline: none;

    &::after {
        border: none;
    }

    &:active {
        transform: scale(0.95);
        color: #2563eb;
        border-color: var(--border-color-focus);
        background: #fff;
    }
}

.edit-icon {
    font-size: 22rpx;
}
</style>
