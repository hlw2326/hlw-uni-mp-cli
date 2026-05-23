<template>
    <hlw-page>
        <view class="container flex flex-col items-center justify-center p-4">
            <text class="text-lg font-bold text-gray-800">欢迎使用小程序</text>
        </view>
    </hlw-page>
</template>

<script setup lang="ts">
import { onLoad, onShareAppMessage, onShareTimeline, onShow } from "@dcloudio/uni-app";
import { useHlwAd } from "@hlw-uni/mp-vue";
import { useApp, useAppShare, useAd, useConfig, useUser } from "@/core";

const { getUserInfo } = useUser();
const { popup_unit_id } = useAd();
const { setAdPopup, showAdPopup } = useHlwAd();
const { getConfig } = useConfig();
const { autoClipboard } = useApp();
const share = useAppShare();

onLoad(() => {
    setAdPopup(popup_unit_id.value);
});

onShow(async () => {
    autoClipboard();
    await getConfig();
    getUserInfo();
    setAdPopup(popup_unit_id.value);
    showAdPopup();
});

onShareAppMessage(share.appMessage);
onShareTimeline(share.timeline);
</script>

<style scoped>
.container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
