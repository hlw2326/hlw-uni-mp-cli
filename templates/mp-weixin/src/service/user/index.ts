import { BaseService, ServiceNamespace, ServicePrefix } from "@hlw-uni/mp-vue";
const VITE_PLUGIN_NAME = import.meta.env.VITE_PLUGIN_NAME;

@ServicePrefix(VITE_PLUGIN_NAME)
@ServiceNamespace("api/v1.user")
class User extends BaseService {
    info(params: Record<string, unknown> = {}) {
        return this.request<IUser.Info>({
            url: "/info",
            method: "GET",
            data: {
                ...params,
            },
        });
    }

    update(data: Record<string, unknown>) {
        return this.request<IUser.Info>({
            url: "/update",
            method: "POST",
            data: {
                ...data,
            },
        });
    }
}

export default User;
