<template>
    <hlw-menu :items="menuItems" @click="handleMenuClick" />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { HlwMenuItem } from "@hlw-uni/mp-vue";

const isRelogging = ref(false);

const menuItems = computed<HlwMenuItem[]>(() => [
    {
        icon: "i-fa6-solid-mobile",
        iconTheme: "slate",
        label: "当前版本",
        value: "v1.2.0", // 右侧显示灰色纯文字
    },
    {
        icon: "i-fa6-solid-circle-question",
        iconTheme: "cyan",
        label: "帮助中心",
        url: "/pages/user/help/index",
    },
    {
        icon: "i-fa6-solid-headset",
        iconTheme: "emerald",
        label: "联系客服",
        tag: "可领积分",
        tagTheme: "rose",
        tagPulse: true,
    },
    {
        icon: "i-fa6-solid-power-off",
        iconTheme: "slate",
        label: "重新登录",
        loading: isRelogging.value,
    },
]);

const handleMenuClick = (item: HlwMenuItem) => {
    if (item.label === "重新登录") {
        if (isRelogging.value) return;
        isRelogging.value = true;
        setTimeout(() => {
            uni.showToast({ title: "准备重新登录", icon: "none" });
            setTimeout(() => {
                isRelogging.value = false;
            }, 500);
        }, 1000);
    }
};
</script>
