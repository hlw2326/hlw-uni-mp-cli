import { useConfig } from "@/core/config";

export function useAppShare(path = "/pages/index/index") {
    const { share } = useConfig();

    function payload() {
        return {
            title: share.value.title || "短视频去水印",
            path: share.value.path || path,
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
}
