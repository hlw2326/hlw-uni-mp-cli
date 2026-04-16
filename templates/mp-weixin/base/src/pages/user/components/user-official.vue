<template>
    <view class="official-card">
        <view class="deco-bg"></view>

        <view class="content-row">
            <view class="left-area">
                <!-- 微信图标 -->
                <view class="wechat-icon">
                    <text class="i-fa6-brands-weixin wechat-svg"></text>
                </view>
                <view class="text-wrap">
                    <text class="official-title">关注官方公众号</text>
                    <view class="sub-row">
                        <text class="i-fa6-solid-gift gift-icon"></text>
                        <view class="sub-content">
                            <text>回复</text>
                            <text class="sub-keyword">"666"</text>
                            <text>领取</text>
                            <text class="sub-highlight">50</text>
                            <text>积分</text>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 去关注按钮 -->
            <button class="btn-follow">
                <text>去关注</text>
                <text class="i-fa6-solid-chevron-right btn-arrow"></text>
            </button>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.official-card {
    background: linear-gradient(to right bottom, #ffffff, #f0fdf4);
    border-radius: var(--radius-xl);
    border: 1rpx solid #fff;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
    padding: 32rpx;
    position: relative;
    overflow: hidden;
}

.deco-bg {
    position: absolute;
    right: 0;
    top: 0;
    width: 192rpx;
    height: 100%;
    background: linear-gradient(to left, #ecfdf5, transparent);
    pointer-events: none;
}

.content-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 10;
}

.left-area {
    display: flex;
    align-items: center;
    gap: 24rpx;
}

.wechat-icon {
    width: 80rpx;
    height: 80rpx;
    border-radius: var(--radius-lg);
    background: #07C160;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 16rpx 32rpx rgba(167, 243, 208, 0.6);
    flex-shrink: 0;
    transition: transform 0.3s;

    &:active {
        transform: scale(1.05);
    }
}

.wechat-svg {
    font-size: 40rpx;
}

.text-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.official-title {
    font-size: 24rpx;
    font-weight: 700;
    color: #1e293b;
    line-height: 1.25;
}

.sub-row {
    display: flex;
    align-items: center;
    gap: 8rpx;
    margin-top: 8rpx;
}

.gift-icon {
    font-size: 20rpx;
    color: #f97316;
}

.sub-content {
    color: #64748b;

    text {
        font-size: 20rpx;
        color: #64748b;
    }
}

.sub-keyword {
    font-size: 20rpx;
    color: #1e293b;
    font-weight: 700;
}

.sub-highlight {
    font-size: 20rpx;
    color: #f97316;
    font-weight: 700;
}

.btn-follow {
    flex-shrink: 0;
    height: 64rpx;
    padding: 0 28rpx;
    background: #0f172a;
    color: #fff;
    font-weight: 700;

    text {
        font-size: 20rpx;
    }
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    gap: 12rpx;
    box-shadow: 0 16rpx 32rpx rgba(226, 232, 240, 0.8);
    transition: all 0.15s;

    &::after {
        border: none;
    }

    &:active {
        transform: scale(0.95);
        background: #334155;
    }
}

.btn-arrow {
    font-size: 20rpx;
    opacity: 0.7;
}
</style>
