import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
    state: () => ({
        clipboard: true,
        invite_uid: 0,
    }),
    unistorage: true,
});
