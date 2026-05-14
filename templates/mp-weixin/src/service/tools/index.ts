import { BaseService, ServiceNamespace, ServicePrefix } from "@hlw-uni/mp-vue";
const VITE_PLUGIN_NAME = import.meta.env.VITE_PLUGIN_NAME;

@ServicePrefix(VITE_PLUGIN_NAME)
@ServiceNamespace("api/v1.tools")
class Tools extends BaseService {
    list(params: Record<string, unknown> = {}) {
        return this.request<ITools.ListResult>({
            url: "/list",
            method: "GET",
            data: {
                ...params,
            },
        });
    }

    click(params: { id: number }) {
        return this.request<null>({
            url: "/click",
            method: "GET",
            data: {
                ...params,
            },
        });
    }
}

export default Tools;
