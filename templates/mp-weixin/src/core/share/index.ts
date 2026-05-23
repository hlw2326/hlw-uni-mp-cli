import { useConfig } from "@/core/config";
import { useUser } from "@/core/user";

export function useAppShare(path = "/pages/index/index") {
    const { share } = useConfig();
    const { user } = useUser();

    function payload() {
        const currentPath = share.value.path || path;
        return {
            title: share.value.title || "短视频去水印",
            path: withUid(currentPath),
            imageUrl: share.value.image_url || "",
        };
    }

    function appMessage() {
        return payload();
    }

    function timeline() {
        const current = payload();
        return {
            title: current.title,
            query: current.path.split("?")[1],
            imageUrl: current.imageUrl,
        };
    }

    uni.showShareMenu?.({
        withShareTicket: true,
        menus: ["shareAppMessage", "shareTimeline"],
    });

    return {
        payload,
        appMessage,
        timeline,
    };

    function withUid(value: string): string {
        const uid = Number(user.value?.id || 0);
        if (uid <= 0) return value;

        const [target, query = ""] = value.split("?");
        const params = query ? query.split("&").filter((item) => item && !item.startsWith("uid=")) : [];
        params.push(`uid=${uid}`);
        return `${target}?${params.join("&")}`;
    }
}
