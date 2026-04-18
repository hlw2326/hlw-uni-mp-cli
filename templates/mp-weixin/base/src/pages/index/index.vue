<template>
    <hlw-page title="首页" bg-class="header-bg">
        <view class="page-section">
            <view class="section-title">项目概览</view>
            <view class="card-list">
                <view class="card-item">
                    <text class="card-label">主题能力</text>
                    <text class="card-value">已接入</text>
                </view>
                <view class="card-item">
                    <text class="card-label">组件库</text>
                    <text class="card-value">mp-vue</text>
                </view>
                <view class="card-item">
                    <text class="card-label">请求能力</text>
                    <text class="card-value">mp-core</text>
                </view>
            </view>
        </view>

        <view class="page-section">
            <view class="section-title">快捷操作</view>
            <view class="action-list">
                <hlw-button round size="small" @click="showToast('开始搭建业务页面')">创建页面</hlw-button>
                <hlw-button type="outline" round size="small" @click="showToast('开始配置接口请求')">配置接口</hlw-button>
                <hlw-button type="text" size="small" @click="showToast('查看模板说明')">查看说明</hlw-button>
            </view>
        </view>

        <view class="page-section">
            <view class="section-title">模板说明</view>
            <text class="section-desc">
                当前页面已经改成无局部 components 依赖的基础模板，方便通过 mp-cli 生成后直接继续开发。
            </text>
        </view>
    </hlw-page>
</template>

<script setup lang="ts">
const showToast = (title: string) => {
    hlw.$msg.toast(title);
};
</script>

<style scoped lang="scss">
.page-section {
    margin: 24rpx 32rpx 0;
    padding: 28rpx;
    border-radius: 24rpx;
    background: #ffffff;
}

.section-title {
    margin-bottom: 20rpx;
    font-size: 30rpx;
    font-weight: 600;
    color: #0f172a;
}

.section-desc {
    font-size: 26rpx;
    line-height: 1.7;
    color: #64748b;
}

.card-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16rpx;
}

.card-item {
    padding: 24rpx 20rpx;
    border-radius: 20rpx;
    background: #f8fafc;
    display: flex;
    flex-direction: column;
    gap: 8rpx;
}

.card-label {
    font-size: 24rpx;
    color: #64748b;
}

.card-value {
    font-size: 28rpx;
    font-weight: 600;
    color: var(--primary-color);
}

.action-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16rpx;
}
</style>
