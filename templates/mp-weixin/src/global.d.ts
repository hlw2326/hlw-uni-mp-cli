import type { ServiceMap } from "@/service";
import type { HlwInstance } from "@hlw-uni/mp-vue";

declare global {
    // eslint-disable-next-line no-var
    var service: ServiceMap;
    // eslint-disable-next-line no-var
    var hlw: HlwInstance;
}

declare module "vue" {
    interface ComponentCustomProperties {
        hlw: HlwInstance;
        service: ServiceMap;
    }
}

export {};
