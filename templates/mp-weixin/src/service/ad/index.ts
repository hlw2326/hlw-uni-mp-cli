import { BaseService, ServiceNamespace, ServicePrefix } from "@hlw-uni/mp-vue";
const VITE_PLUGIN_NAME = import.meta.env.VITE_PLUGIN_NAME;

@ServicePrefix(VITE_PLUGIN_NAME)
@ServiceNamespace("api/v1.ad")
class Ad extends BaseService {
    reward(params: Record<string, unknown> = {}) {
        return this.request<IConfig.AdReward>({
            url: "/reward",
            method: "POST",
            data: {
                ...params,
            },
        });
    }
}

export default Ad;
