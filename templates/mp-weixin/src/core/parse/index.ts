import { computed } from "vue";
import type { ComputedRef } from "vue";
import { useParseStore } from "@/store";

export function useParse() {
    const store = useParseStore();

    const keyword: ComputedRef<string> = computed(() => store.keyword);

    const result: ComputedRef<IParse.Result | null> = computed(() => store.result);

    const has_result: ComputedRef<boolean> = computed(() => !!store.result);

    function setParse(value: IParse.Result | null): void {
        store.result = value;
    }

    function clearParse(): void {
        store.result = null;
    }

    function setKeyword(value: string): void {
        store.keyword = value;
    }

    function clearKeyword(): void {
        store.keyword = "";
    }

    return {
        keyword,
        result,
        has_result,
        setKeyword,
        clearKeyword,
        setParse,
        clearParse,
        store,
    };
}
