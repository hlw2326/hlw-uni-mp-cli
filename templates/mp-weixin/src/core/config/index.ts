import { computed } from "vue";
import type { ComputedRef } from "vue";
import { toNumber, toBoolean } from "@hlw-uni/mp-vue";
import { useConfigStore } from "@/store";

export function useConfig() {
    const store = useConfigStore();

    const base: ComputedRef<IConfig.Base> = computed(() => store.base);

    const share: ComputedRef<IConfig.Share> = computed(() => store.share);

    const contact: ComputedRef<IConfig.Contact> = computed(() => store.contact);

    const ad: ComputedRef<IConfig.Ad> = computed(() => store.ad);

    async function getConfig(): Promise<void> {
        const res = await service.config.index();
        if (res.code !== 1 || !res.data) {
            hlw.$msg.toast(res.info || "配置加载失败");
            return;
        }

        const base = res.data.base;
        const share = res.data.share;
        const contact = res.data.contact;
        const mode = base?.parse_mode;

        store.base = {
            parse_mode: mode === "ad" || mode === "quota" || mode === "free" ? mode : store.base.parse_mode,
            day_parse_count: toNumber(base?.day_parse_count, store.base.day_parse_count),
            reward_parse_count: toNumber(base?.reward_parse_count, store.base.reward_parse_count),
            download_backup_enabled: toNumber(base?.download_backup_enabled, store.base.download_backup_enabled) === 1 ? 1 : 0,
        };
        store.share = {
            title: share?.title || store.share.title,
            path: share?.path || store.share.path,
            image_url: share?.image_url || store.share.image_url,
        };
        store.contact = {
            send_message_title: contact?.send_message_title || store.contact.send_message_title,
            send_message_path: contact?.send_message_path || store.contact.send_message_path,
            send_message_img: contact?.send_message_img || store.contact.send_message_img,
            show_message_card: toBoolean(contact?.show_message_card, store.contact.show_message_card),
            official_qrcode: contact?.official_qrcode || "",
        };
        store.ad = {
            ...store.ad,
            ...(res.data.ad ?? {}),
        };
    }

    return {
        base,
        share,
        contact,
        ad,
        getConfig,
        store,
    };
}
