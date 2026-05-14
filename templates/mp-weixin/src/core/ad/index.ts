import { computed } from "vue";
import type { ComputedRef } from "vue";
import { useHlwAd } from "@hlw-uni/mp-vue";
import { useConfig } from "@/core/config";
import { useUser } from "@/core/user";

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

        setAdReward(unitId);
        const adRes = await showAdReward();
        if (!adRes.ok) {
            if (adRes.err) {
                hlw.$msg.toast("广告暂未准备好");
                return false;
            }
            const retry = await confirm();
            return retry ? reward() : false;
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

function confirm(): Promise<boolean> {
    return new Promise((resolve) => {
        uni.showModal({
            title: "提示",
            content: "看完广告才可以继续解析哦，要继续观看吗？",
            confirmText: "继续观看",
            cancelText: "放弃",
            success: (res) => resolve(!!res.confirm),
            fail: () => resolve(false),
        });
    });
}
