import { computed } from "vue";
import type { ComputedRef } from "vue";
import { useAppStore, useParseStore } from "@/store";

export function useApp() {
    const store = useAppStore();
    const parse = useParseStore();

    const clipboard: ComputedRef<boolean> = computed(() => store.clipboard);

    function setClipboard(value: boolean): void {
        store.clipboard = value;
    }

    function autoClipboard(): void {
        if (!store.clipboard || parse.keyword) return;

        uni.getClipboardData({
            success: (res) => {
                const text = String(res.data || "").trim();
                if (text) parse.keyword = text;
            },
        });
    }

    return {
        clipboard,
        setClipboard,
        autoClipboard,
        store,
    };
}
