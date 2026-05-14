import { BaseService, ServiceNamespace, ServicePrefix } from "@hlw-uni/mp-vue";
const VITE_PLUGIN_NAME = import.meta.env.VITE_PLUGIN_NAME;

@ServicePrefix(VITE_PLUGIN_NAME)
@ServiceNamespace("api/v1.login")
class Login extends BaseService {
    in(params: ILogin.Params) {
        return this.request<ILogin.Result>({
            url: "/in",
            method: "POST",
            data: {
                ...params,
            },
        });
    }

    wx() {
        return new Promise<ILogin.Result>((resolve, reject) => {
            uni.login({
                provider: "weixin",
                success: async (loginRes) => {
                    try {
                        const res = await this.in({ code: loginRes.code });
                        resolve(res.data);
                    } catch (e) {
                        reject(e);
                    }
                },
                fail: (err) => reject(new Error(err.errMsg || "微信登录失败")),
            });
        });
    }
}

export default Login;
