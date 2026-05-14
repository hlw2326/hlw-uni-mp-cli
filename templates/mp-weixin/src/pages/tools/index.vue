<template>
    <hlw-page>
        <view class="container">
            
        </view>
    </hlw-page>
</template>

<script setup lang="ts">
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
import { useAppShare } from "@/core/share";

const share = useAppShare("/pages/tools/index");

onShareAppMessage(share.appMessage);
onShareTimeline(share.timeline);
</script>
