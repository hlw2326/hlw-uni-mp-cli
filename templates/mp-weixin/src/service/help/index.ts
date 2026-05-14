import { BaseService, ServiceNamespace, ServicePrefix } from "@hlw-uni/mp-vue";
const VITE_PLUGIN_NAME = import.meta.env.VITE_PLUGIN_NAME;

@ServicePrefix(VITE_PLUGIN_NAME)
@ServiceNamespace("api/v1.help")
class Help extends BaseService {


    list(params: { cate_id?: number } = {}) {
        return this.request<IHelp.ListResult>({
            url: "/list",
            method: "GET",
            data: {
                ...params,
            },
        });
    }

}

export default Help;
