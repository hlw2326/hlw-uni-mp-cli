import { defineStore } from "pinia";

export const useParseStore = defineStore("parse", {
    state: () => ({
        keyword: "",
        result: null as IParse.Result | null,
    }),
});
