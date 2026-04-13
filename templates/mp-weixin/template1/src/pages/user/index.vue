<template>
    <view class="user-page">
        <view class="user-card">
            <view class="user-card__bg"></view>
            <view class="user-card__body">
                <image
                    class="user-card__avatar"
                    src="https://cdn.uviewui.com/uview/album/1.jpg"
                    mode="aspectFill"
                />
                <view class="user-card__info">
                    <text class="user-card__name">未登录</text>
                    <text class="user-card__desc">点击头像登录账号</text>
                </view>
                <view class="user-card__arrow">›</view>
            </view>
        </view>

        <view class="stats-card">
            <view class="stats-card__item">
                <text class="stats-card__value">{{ points }}</text>
                <text class="stats-card__label">我的积分</text>
            </view>
            <view class="stats-card__divider"></view>
            <view class="stats-card__item">
                <text class="stats-card__value">{{ memberExpiry }}</text>
                <text class="stats-card__label">会员到期</text>
            </view>
        </view>

        <view class="menu-list">
            <view 
                class="menu-item" 
                v-for="(item, index) in menuList" 
                :key="index" 
                @click="handleMenuClick(item)"
            >
                <text class="menu-item__text">{{ item.label }}</text>
                <view class="menu-item__arrow">›</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const points = ref(0)
const memberExpiry = ref('--')

const menuList = ref([
    { label: '帮助列表', path: '' },
    { label: '在线客服', path: '' },
    { label: '关注公众号', path: '' },
    { label: '常见问题', path: '' },
    { label: '系统设置', path: '' }
])

const handleMenuClick = (item: any) => {
    console.log('点击了菜单：', item.label)
}
</script>

<style scoped lang="scss">
.user-page {
    min-height: 100vh;
    padding: 32rpx;
    background: #f5f6fa;
}

.user-card {
    position: relative;
    border-radius: 24rpx;
    overflow: hidden;
    box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.08);

    &__bg {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    &__body {
        position: relative;
        display: flex;
        align-items: center;
        padding: 48rpx 32rpx;
    }

    &__avatar {
        width: 128rpx;
        height: 128rpx;
        border-radius: 50%;
        border: 4rpx solid rgba(255, 255, 255, 0.6);
        background: #fff;
    }

    &__info {
        flex: 1;
        margin-left: 24rpx;
        display: flex;
        flex-direction: column;
    }

    &__name {
        font-size: 36rpx;
        font-weight: 600;
        color: #fff;
        line-height: 1.4;
    }

    &__desc {
        margin-top: 8rpx;
        font-size: 24rpx;
        color: rgba(255, 255, 255, 0.8);
    }

    &__arrow {
        font-size: 48rpx;
        color: rgba(255, 255, 255, 0.8);
        line-height: 1;
    }
}

.stats-card {
    display: flex;
    align-items: center;
    margin-top: 24rpx;
    padding: 40rpx 32rpx;
    background: #fff;
    border-radius: 24rpx;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.06);

    &__item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__value {
        font-size: 40rpx;
        font-weight: 700;
        color: #333;
        line-height: 1.2;
    }

    &__label {
        margin-top: 12rpx;
        font-size: 24rpx;
        color: #999;
    }

    &__divider {
        width: 2rpx;
        height: 64rpx;
        background: #eee;
    }
}

.menu-list {
    margin-top: 24rpx;
    background: #fff;
    border-radius: 24rpx;
    padding: 0 32rpx;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.06);
}

.menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32rpx 0;
    border-bottom: 2rpx solid #f5f6fa;

    &:last-child {
        border-bottom: none;
    }

    &__text {
        font-size: 30rpx;
        color: #333;
    }

    &__arrow {
        font-size: 40rpx;
        color: #ccc;
        line-height: 1;
    }
}
</style>
