<template>
    <hlw-page>
        <view class="container">
            <comp-profile />

            <comp-menu />
            <hlw-ad type="custom" :unit-id="custom_unit_id" />
        </view>
    </hlw-page>
    <hlw-add-mini :show="add_mini_visible" @close="closeAddMini" />
    <hlw-ad type="grid" :unit-id="grid_unit_id" placement="left-bottom" custom-style="left: 10rpx;" />
</template>

<script setup lang="ts">
import { onShareAppMessage, onShareTimeline, onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import { useAppShare, useAd, useUser } from "@/core";
import CompMenu from "./comps/menu.vue";
import CompProfile from "./comps/profile.vue";

const { getUserInfo } = useUser();
const { grid_unit_id, custom_unit_id } = useAd();
const share = useAppShare();
const add_mini_visible = ref(true);

onShareAppMessage(share.appMessage);
onShareTimeline(share.timeline);

onShow(() => {
    getUserInfo();
});

function closeAddMini() {
    add_mini_visible.value = false;
}
</script>
