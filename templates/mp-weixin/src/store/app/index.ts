import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
    state: () => ({
        clipboard: true,
    }),
    unistorage: true,
});
