import { md5 } from "js-md5";
import {
    BaseService,
    ServiceNamespace,
    useDevice,
    useRequest,
    withQuery,
    toQuery,
    signText,
    type RequestConfig,
} from "@hlw-uni/mp-vue";
import { useUser } from "@/core";

type ServiceCtor = new () => BaseService;

export interface ServiceMap {
    ad: InstanceType<typeof import("./ad").default>;
    config: InstanceType<typeof import("./config").default>;
    help: InstanceType<typeof import("./help").default>;
    login: InstanceType<typeof import("./login").default>;
    tools: InstanceType<typeof import("./tools").default>;
    upload: InstanceType<typeof import("./upload").default>;
    user: InstanceType<typeof import("./user").default>;
}

const modules: Record<string, BaseService> = {};
const files = import.meta.glob<{ default: ServiceCtor }>("./*/index.ts", { eager: true });

for (const [path, module] of Object.entries(files)) {
    const name = path.split("/")[1];
    if (name) modules[name] = new module.default();
}

export const service = modules as unknown as ServiceMap;
export default service;
export { BaseService, ServiceNamespace };

globalThis.service = service;

const request = useRequest();
// Utilities are now imported directly from @hlw-uni/mp-vue

request.setBaseURL(import.meta.env.VITE_API_BASE_URL ?? "");

request.onRequest(async (config) => {
    let url = config.url;
    let data = config.data;

    if ((config.method ?? "GET").toUpperCase() === "GET" && data && typeof data === "object") {
        url = withQuery(url, toQuery(data as Record<string, unknown>));
        data = undefined;
    }

    const { info, query: device } = useDevice();
    url = withQuery(url, device);

    const secret = import.meta.env.VITE_SIG_SECRET ?? "";
    if (secret) {
        url = withQuery(url, `sig=${md5(signText(url) + secret)}`);
    }

    const token = useUser().token.value;
    const nextConfig = {
        ...config,
        url,
        data,
        headers: {
            ...config.headers,
            "x-appid": info.appid,
            ...(token ? { "x-token": token } : {}),
        },
    } as RequestConfig;

    return nextConfig;
});

request.onResponse(async (res) => {
    if (res.code === 401) {
        useUser().login().catch(() => undefined);
        return res;
    }

    return res;
});

request.onError(async (err) => {
    if (err.message.includes("401")) {
        useUser().login().catch(() => undefined);
    }
});
