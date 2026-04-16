<template>
    <page-meta :page-style="fontPageStyle" />
    <hlw-page title="全网数据助手" bg-class="header-bg">
        <view class="container">
            <user-profile />
            <user-vip v-if="true" />
            <user-score />
            <font-setting />
            <user-menu />
        </view>
    </hlw-page>
</template>

<script setup lang="ts">
import UserProfile from "./components/user-profile.vue";
import UserVip from "./components/user-vip.vue";
import UserScore from "./components/user-score.vue";
import UserMenu from "./components/user-menu.vue";
import FontSetting from "./components/font-setting.vue";
import { useMsg } from "@hlw-uni/mp-core";
import { useFontPageStyle } from "@hlw-uni/mp-vue";

const { fontPageStyle } = useFontPageStyle();

const { toast } = useMsg();

onShow(() => {
    toast("欢迎使用 HLW-UNI-MP-CORE");
});

console.log(hlw.$device);
console.log(hlw.$device.device_model);
console.log(hlw.$device.appid);
</script>

<style lang="scss"></style>
