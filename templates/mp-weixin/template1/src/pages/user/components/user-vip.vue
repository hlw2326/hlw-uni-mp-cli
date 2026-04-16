<template>
    <view class="vip-outer">
        <view class="vip-card-active">
            <view class="vip-shimmer-gold"></view>

            <view class="card-header">
                <view>
                    <view class="title-row">
                        <text class="i-fa6-solid-crown crown-icon"></text>
                        <text class="vip-title">PRO MEMBER</text>
                    </view>
                    <view class="subtitle-badge">
                        <text>尊贵身份 · 极速通道 · 无限次查询</text>
                    </view>
                </view>
                <navigator url="/pages/user/vip/index" class="renew-btn">
                    <text>立即续费</text>
                </navigator>
            </view>

            <view class="card-footer">
                <view>
                    <view class="expires-label">会员有效期至</view>
                    <view class="expires-date">2026.08.18</view>
                </view>
                <view class="gem-deco">
                    <text class="i-fa6-solid-gem gem-bg-icon"></text>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.vip-outer {
    background: #fff;
    border: 1rpx solid #fff;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
    border-radius: var(--radius-xl);
    padding: 8rpx;
    overflow: hidden;
}

/* 会员卡片渐变 - 黑金 */
.vip-card-active {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #000000 100%);
    border: 1rpx solid rgba(251, 191, 36, 0.3);
    border-radius: var(--radius-lg);
    padding: 32rpx;
    color: #fff;
    position: relative;
    overflow: hidden;
    box-shadow: 0 16rpx 48rpx rgba(0, 0, 0, 0.3);
}

/* 金色流光 */
.vip-shimmer-gold {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent 0%, rgba(251, 191, 36, 0.1) 50%, transparent 100%);
    transform: skewX(-20deg) translateX(-150%);
    pointer-events: none;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24rpx;
    position: relative;
    z-index: 10;
}

.title-row {
    display: flex;
    align-items: center;
    gap: 12rpx;
    margin-bottom: 8rpx;
}

.crown-icon {
    font-size: 28rpx;
    color: #fbbf24;
}

.vip-title {
    font-size: var(--font-md);
    font-weight: 900;
    font-style: italic;
    letter-spacing: 0.05em;
    background: linear-gradient(to right, #fcd34d, #fbbf24);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.subtitle-badge {
    display: inline-block;
    color: #94a3b8;
    font-weight: 500;
    background: rgba(0, 0, 0, 0.3);
    padding: 4rpx 16rpx;
    border-radius: 9999rpx;
    border: 1rpx solid rgba(255, 255, 255, 0.1);

    text {
        font-size: var(--font-xs);
        color: #94a3b8;
        font-weight: 500;
    }
}

.renew-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #fbbf24;
    color: #1e293b;
    font-weight: 700;

    text {
        font-size: var(--font-xs);
    }
    padding: 12rpx 24rpx;
    border-radius: 9999rpx;
    transition: transform 0.15s;
    flex-shrink: 0;

    &:active {
        transform: scale(0.95);
        background: #fcd34d;
    }
}

.card-footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    position: relative;
    z-index: 10;
}

.expires-label {
    font-size: var(--font-xs);
    color: #94a3b8;
    margin-bottom: 4rpx;
}

.expires-date {
    font-size: var(--font-sm);
    font-family: monospace;
    color: #fef3c7;
    letter-spacing: 0.05em;
}

.gem-deco {
    position: absolute;
    bottom: -48rpx;
    right: -16rpx;
    opacity: 0.1;
    z-index: 1;
}

.gem-bg-icon {
    font-size: 144rpx;
    color: #fde68a;
    display: inline-block;
    transform: rotate(12deg);
}
</style>
