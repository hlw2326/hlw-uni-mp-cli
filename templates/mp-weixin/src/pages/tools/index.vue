<template>
    <hlw-page>
        <view class="container">
            <view class="tools-grid">
                <view v-for="item in list" :key="item.id || item.title" class="tools-card" @tap="openTool(item)">
                    <view class="tools-glow" />
                    <view class="tools-dot" />
                    <view class="tools-header">
                        <view class="tools-logo-wrap">
                            <image class="tools-logo" mode="aspectFill" :src="item.logo || '/static/imgs/icon-video.png'" />
                        </view>
                        <view class="tools-arrow">
                            <text class="i-fa6-solid-chevron-right tools-arrow-icon" />
                        </view>
                    </view>
                    <text class="tools-title">{{ item.title }}</text>
                    <text class="tools-desc">{{ item.desc }}</text>
                    <view class="tools-line" />
                </view>
            </view>
            <view v-if="!list.length" class="empty-card">
                <text>暂无可展示的小程序</text>
            </view>
            <hlw-ad type="custom" :unit-id="banner_unit_id" />
        </view>
    </hlw-page>
    <hlw-ad type="grid" :unit-id="grid_unit_id" placement="right-middle" custom-style="right:20rpx;" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onShareAppMessage, onShareTimeline, onShow } from "@dcloudio/uni-app";
import { useAppShare, useAd, useUser } from "@/core";
const { getUserInfo } = useUser();
const { banner_unit_id, grid_unit_id } = useAd();
const list = ref<ITools.Item[]>([]);
const share = useAppShare();

onShareAppMessage(share.appMessage);
onShareTimeline(share.timeline);

onShow(() => {
    getUserInfo();
    getTools();
});

function openTool(item: ITools.Item) {
    if (!item.appid) {
        hlw.$msg.toast("请先配置小程序 AppID");
        return;
    }

    service.tools.click({ id: item.id }).catch((error) => {
        console.warn("[tools] click failed", error);
    });

    uni.navigateToMiniProgram({
        appId: item.appid,
        path: item.path,
        fail: () => hlw.$msg.toast("打开失败，请稍后重试"),
    });
}

function getTools() {
    service.tools
        .list()
        .then((res) => {
            if (res.code === 1 && res.data?.list) {
                list.value = res.data.list;
                return;
            }
            hlw.$msg.toast(res.info || "工具列表加载失败");
        })
        .catch((error) => {
            console.warn("[tools] list failed", error);
            hlw.$msg.toast("工具列表加载失败");
        });
}
</script>

<style scoped lang="scss">
.tools-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20rpx;
}

.tools-card {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    min-width: 0;
    min-height: 220rpx;
    padding: var(--card-padding);
    border: 1rpx solid var(--border-color-light);
    border-radius: var(--card-radius);
    background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
    //box-shadow: 0 12rpx 28rpx rgba(30, 64, 175, 0.06);
}

.tools-card:active {
    transform: scale(0.98);
}

.tools-glow {
    position: absolute;
    top: -54rpx;
    right: -46rpx;
    width: 150rpx;
    height: 150rpx;
    border-radius: 999rpx;
    background: rgba(49, 118, 255, 0.08);
}

.tools-dot {
    position: absolute;
    right: 28rpx;
    bottom: 28rpx;
    width: 10rpx;
    height: 10rpx;
    border-radius: 999rpx;
    background: #3176ff;
    opacity: 0.18;
}

.tools-header {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24rpx;
}

.tools-logo-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 88rpx;
    height: 88rpx;
    border: 1rpx solid rgba(49, 118, 255, 0.12);
    border-radius: 20rpx;
    overflow: hidden;
    background: rgba(49, 118, 255, 0.05);
}

.tools-logo {
    width: 76rpx;
    height: 76rpx;
    flex-shrink: 0;
    border-radius: 20rpx;
    background: #f3f4f6;
}

.tools-title {
    position: relative;
    z-index: 1;
    display: block;
    overflow: hidden;
    margin-bottom: 10rpx;
    color: #1f2937;
    font-size: var(--font-base);
    letter-spacing: 3rpx;
    line-height: 1.25;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.tools-desc {
    position: relative;
    z-index: 1;
    display: block;
    overflow: hidden;
    color: #94a3b8;
    font-size: var(--font-22);
    letter-spacing: 3rpx;
    line-height: 1.4;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.tools-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42rpx;
    height: 42rpx;
    flex-shrink: 0;
    margin-left: 12rpx;
    border-radius: 999rpx;
    background: rgba(49, 118, 255, 0.08);
    color: #3176ff;
}

.tools-arrow-icon {
    font-size: var(--font-22);
}

.tools-line {
    position: absolute;
    left: var(--card-padding);
    bottom: 20rpx;
    width: 42rpx;
    height: 4rpx;
    border-radius: 999rpx;
    background: rgba(49, 118, 255, 0.28);
}

.empty-card {
    margin-top: 40rpx;
    color: #94a3b8;
    font-size: var(--font-sm);
    line-height: 1.4;
    text-align: center;
}
</style>
