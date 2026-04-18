<template>
    <hlw-page title="用户中心" bg-class="header-bg">
        <view class="profile-card">
            <hlw-avatar name="海螺同学" size="large" />
            <view class="profile-info">
                <text class="profile-name">海螺同学</text>
                <text class="profile-desc">这里是脚手架生成后的默认用户页，你可以继续替换成自己的业务模块。</text>
            </view>
        </view>

        <view class="menu-card">
            <hlw-cell title="账号设置" label="管理个人资料与登录状态" is-link @click="showToast('进入账号设置')" />
            <hlw-cell title="主题设置" label="切换应用主题与外观" is-link @click="showToast('进入主题设置')" />
            <hlw-cell title="意见反馈" label="提交你的使用建议" is-link :border="false" @click="showToast('进入意见反馈')" />
        </view>
    </hlw-page>
</template>

<script setup lang="ts">
const showToast = (title: string) => {
    hlw.$msg.toast(title);
};
</script>

<style scoped lang="scss">
.profile-card {
    margin: 24rpx 32rpx 0;
    padding: 32rpx 28rpx;
    border-radius: 24rpx;
    background: #ffffff;
    display: flex;
    align-items: center;
    gap: 20rpx;
}

.profile-info {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 10rpx;
}

.profile-name {
    font-size: 32rpx;
    font-weight: 700;
    color: #0f172a;
}

.profile-desc {
    font-size: 24rpx;
    line-height: 1.7;
    color: #64748b;
}

.menu-card {
    margin: 24rpx 32rpx 0;
    overflow: hidden;
    border-radius: 24rpx;
    background: #ffffff;
}
</style>
