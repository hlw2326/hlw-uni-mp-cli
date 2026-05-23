<template>
    <hlw-page>
        <view class="container">
            <view class="help-card">
                <view class="card-title">
                    <view class="title-line" />
                    <text class="title-text">怎么使用</text>
                </view>
                <view class="step-list">
                    <text v-for="(item, index) in steps" :key="item" class="step-item">{{ index + 1 }}. {{ item }}</text>
                </view>
            </view>

            <view class="help-card">
                <view class="card-title">
                    <view class="title-line" />
                    <text class="title-text">常见问题</text>
                </view>
                <view class="faq-list">
                    <view v-for="item in faqs" :key="item.question" class="faq-item">
                        <text class="faq-question">{{ item.question }}</text>
                        <text class="faq-answer">{{ item.answer }}</text>
                    </view>
                </view>
            </view>
            <contact-card title="还没解决？" desc="把遇到的问题发给客服" />

            <hlw-ad type="custom" :unit-id="banner_unit_id" />
        </view>
    </hlw-page>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { onShareAppMessage, onShareTimeline, onShow } from "@dcloudio/uni-app";
import ContactCard from "@/components/contact-card.vue";
import { useAppShare, useAd, useConfig } from "@/core";

const { base } = useConfig();
const { banner_unit_id } = useAd();
const share = useAppShare("/pages/help/index");

const steps = ref<string[]>([]);
const faqList = ref<IHelp.Faq[]>([]);

const day_parse_count = computed(() => base.value.day_parse_count || 10);
const reward_parse_count = computed(() => base.value.reward_parse_count || 10);

const faqs = computed(() =>
    faqList.value.map((item) => ({
        question: item.question,
        answer: formatAnswer(item.answer),
    })),
);

onShareAppMessage(share.appMessage);
onShareTimeline(share.timeline);

onShow(() => {
    getHelpList();
});

function formatAnswer(answer: string): string {
    return answer.replace(/\{day_parse_count\}/g, String(day_parse_count.value)).replace(/\{reward_parse_count\}/g, String(reward_parse_count.value));
}

async function getHelpList() {
    try {
        const res = await service.help.list();
        if (res.code !== 1 || !res.data) {
            hlw.$msg.toast(res.info || "帮助内容加载失败");
            return;
        }
        if (res.data.steps?.length) steps.value = res.data.steps;
        if (res.data.faqs?.length) faqList.value = res.data.faqs;
    } catch (error) {
        console.warn("[help] list failed", error);
        hlw.$msg.toast("帮助内容加载失败");
    }
}
</script>

<style scoped lang="scss">
.help-card {
    padding: var(--card-padding);
    border: 1rpx solid var(--border-color-light);
    border-radius: var(--card-radius);
    background: #ffffff;
}

.card-title {
    display: flex;
    align-items: center;
    margin-bottom: 28rpx;
}

.title-line {
    width: 6rpx;
    height: 28rpx;
    margin-right: 16rpx;
    border-radius: 6rpx;
    background: #3176ff;
}

.title-text {
    color: #1f2937;
    font-size: var(--font-md);
    line-height: 1.25;
}

.step-list {
    display: flex;
    flex-direction: column;
    gap: 18rpx;
}

.step-item {
    display: block;
    color: #334155;
    font-size: var(--font-base);
    line-height: 1.5;
}

.faq-list {
    display: flex;
    flex-direction: column;
}

.faq-item {
    padding: 24rpx 0;
    border-top: 1rpx solid var(--border-color-light);
}

.faq-item:first-child {
    padding-top: 0;
    border-top: 0;
}

.faq-item:last-child {
    padding-bottom: 0;
}

.faq-question {
    display: block;
    margin-bottom: 10rpx;
    color: #334155;
    font-size: var(--font-base);
    line-height: 1.35;
}

.faq-answer {
    display: block;
    color: #94a3b8;
    font-size: var(--font-sm);
    line-height: 1.55;
}
</style>
