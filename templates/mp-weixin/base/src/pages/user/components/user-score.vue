<template>
    <view class="card">
        <view class="score-header">
            <text class="score-title">我的积分</text>
        </view>

        <view class="score-body">
            <view class="score-left">
                <view class="score-value" id="userPoints">2850</view>
                <view class="score-sub">当前可用积分</view>
            </view>
            <view class="action-row">
                <navigator url="/pages/user/score/recharge" class="btn-action btn-recharge">
                    <text class="i-fa6-solid-wallet btn-icon"></text>
                    <text class="btn-text">充值</text>
                </navigator>
                <button class="btn-action btn-earn">
                    <text class="i-fa6-solid-circle-play btn-icon btn-icon--blue"></text>
                    <text class="btn-text">领积分</text>
                </button>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.card {
    background: #fff;
    border-radius: var(--radius-lg);
    border: 1rpx solid var(--border-color);
    overflow: hidden;
    width: 100%;
    padding: 32rpx;
}

.score-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16rpx;
}

.score-title {
    font-size: var(--font-sm);
    font-weight: 700;
    color: #334155;
}

.score-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.score-left {
    flex: 1;
}

.score-value {
    font-size: 60rpx;
    font-weight: 900;
    color: #1e293b;
    letter-spacing: -0.025em;
    line-height: 1.2;
}

.score-sub {
    font-size: var(--font-xs);
    color: #9ca3af;
    margin-top: 8rpx;
    letter-spacing: 0.2em;
}

.action-row {
    display: flex;
    gap: 16rpx;
}

.btn-action {
    height: 64rpx;
    padding: 0 24rpx;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    gap: 12rpx;
    font-weight: 500;
    transition: opacity 0.15s;

    &::after {
        border: none;
    }

    &:active {
        opacity: 0.8;
    }
}

.btn-recharge {
    background: #f97316;
    color: #fff;
}

.btn-earn {
    background: #0f172a;
    color: #fff;
}

.btn-icon {
    font-size: 28rpx;

    &--blue {
        color: #60a5fa;
    }
}

.btn-text {
    font-size: var(--font-sm);
}
</style>
