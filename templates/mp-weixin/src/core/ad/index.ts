import { computed } from "vue";
import type { ComputedRef } from "vue";
import { useHlwAd } from "@hlw-uni/mp-vue";
import { useConfig } from "@/core/config";
import { useUser } from "@/core/user";

const REWARD_AD_LOADING_TIMEOUT = 8000;

export function useAd(): {
    banner_unit_id: ComputedRef<string>;
    grid_unit_id: ComputedRef<string>;
    custom_unit_id: ComputedRef<string>;
    reward_unit_id: ComputedRef<string>;
    popup_unit_id: ComputedRef<string>;
    reward: () => Promise<boolean>;
} {
    const { ad } = useConfig();
    const { getUserInfo } = useUser();
    const { setAdReward, showAdReward } = useHlwAd();

    const banner_unit_id = computed(() => {
        if (ad.value.ad_global_enabled !== 1 || ad.value.ad_enabled_banner !== 1) return "";
        return ad.value.banner_unit_id || "";
    });

    const grid_unit_id = computed(() => {
        if (ad.value.ad_global_enabled !== 1 || ad.value.ad_enabled_grid !== 1) return "";
        return ad.value.grid_unit_id || "";
    });

    const custom_unit_id = computed(() => {
        if (ad.value.ad_global_enabled !== 1 || ad.value.ad_enabled_custom !== 1) return "";
        return ad.value.custom_unit_id || "";
    });

    const reward_unit_id = computed(() => {
        if (ad.value.ad_global_enabled !== 1 || ad.value.ad_enabled_reward !== 1) return "";
        return ad.value.reward_unit_id || "";
    });

    const popup_unit_id = computed(() => {
        if (ad.value.ad_global_enabled !== 1 || ad.value.ad_enabled_popup !== 1) return "";
        return ad.value.popup_unit_id || "";
    });

    async function reward(): Promise<boolean> {
        const unitId = reward_unit_id.value;
        if (!unitId) {
            hlw.$msg.toast("激励广告未配置");
            return false;
        }

        const hideLoading = showRewardLoading();
        let adRes: Awaited<ReturnType<typeof showAdReward>>;
        try {
            setAdReward(unitId);
            adRes = await showAdReward();
        } finally {
            hideLoading();
        }

        if ("isEnded" in adRes && adRes.isEnded === false) {
            const retry = await confirmWatchAgain();
            return retry ? reward() : false;
        }

        if (!adRes.ok) {
            if (adRes.err) {
                hlw.$msg.toast("广告暂未准备好");
                return false;
            }
            hlw.$msg.toast("广告暂未准备好");
            return false;
        }

        const res = await service.ad.reward();
        if (res.code !== 1) {
            hlw.$msg.toast(res.info || "领取失败，请稍后重试");
            return false;
        }

        hlw.$msg.toast(res.info || "领取成功");
        await getUserInfo();
        return true;
    }

    return {
        banner_unit_id,
        grid_unit_id,
        custom_unit_id,
        reward_unit_id,
        popup_unit_id,
        reward,
    };
}

function confirmWatchAgain(): Promise<boolean> {
    return hlw.$msg.modal({
        title: "提示",
        content: "看完广告才可以领取奖励，是否继续观看？",
        confirmText: "继续观看",
        cancelText: "取消",
    });
}

function showRewardLoading(): () => void {
    let hidden = false;
    hlw.$msg.showLoading("正在拉起广告");

    const timer = setTimeout(() => {
        hide();
    }, REWARD_AD_LOADING_TIMEOUT);

    function hide() {
        if (hidden) return;
        hidden = true;
        clearTimeout(timer);
        hlw.$msg.hideLoading();
    }

    return hide;
}
