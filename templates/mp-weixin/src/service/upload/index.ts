import { BaseService, ServiceNamespace, ServicePrefix, useDevice } from "@hlw-uni/mp-vue";
import { useUser } from "@/core";
const VITE_PLUGIN_NAME = import.meta.env.VITE_PLUGIN_NAME;

@ServicePrefix(VITE_PLUGIN_NAME)
@ServiceNamespace("api/v1.upload")
class Upload extends BaseService {
    sign(params: { biz: string; ext: string; size?: number }) {
        return this.request<IUpload.Sign>({
            url: "/sign",
            method: "POST",
            data: {
                ...params,
            },
        });
    }

    async file(params: IUpload.FileParams): Promise<string> {
        const ext = params.ext || this.ext(params.filePath);
        const signRes = await this.sign({ biz: params.biz, ext, size: params.size });
        if (signRes.code !== 1 || !signRes.data) {
            throw new Error(signRes.info || "获取上传凭证失败");
        }

        const cred = signRes.data;
        await this.upload(cred, params.filePath);
        return cred.url;
    }

    private data(cred: IUpload.Sign): Record<string, string> {
        if (cred.type === "local") {
            return { key: cred.key };
        }
        if (cred.type === "alioss") {
            return {
                key: cred.key,
                policy: cred.policy,
                OSSAccessKeyId: cred.OSSAccessKeyId,
                Signature: cred.Signature,
                success_action_status: cred.success_action_status,
            };
        }
        return {
            key: cred.key,
            token: cred.token,
        };
    }

    private header(): Record<string, string> {
        const { info } = useDevice();
        const token = useUser().token.value;
        return {
            "X-Appid": info.appid,
            ...(token ? { "X-Token": token } : {}),
        };
    }

    private upload(cred: IUpload.Sign, filePath: string): Promise<void> {
        return new Promise((resolve, reject) => {
            uni.uploadFile({
                url: cred.server,
                filePath,
                name: "file",
                formData: this.data(cred),
                header: cred.type === "local" ? this.header() : undefined,
                success: (res) => {
                    if (res.statusCode < 200 || res.statusCode >= 300) {
                        reject(new Error(`上传失败 (${res.statusCode})`));
                        return;
                    }
                    if (cred.type !== "local") {
                        resolve();
                        return;
                    }
                    try {
                        const body = JSON.parse(this.utf8(res.data));
                        body.code === 1 ? resolve() : reject(new Error(body.info || "上传失败"));
                    } catch {
                        reject(new Error("响应解析失败"));
                    }
                },
                fail: (error) => reject(new Error(error.errMsg || "上传失败")),
            });
        });
    }

    private ext(filePath: string): string {
        const ext = filePath.split("?")[0].split(".").pop()?.toLowerCase() || "";
        return ["jpg", "jpeg", "png", "webp"].includes(ext) ? ext : "jpg";
    }

    private utf8(value: string): string {
        if (!value) return value;
        try {
            return decodeURIComponent(escape(value));
        } catch {
            return value;
        }
    }
}

export default Upload;
