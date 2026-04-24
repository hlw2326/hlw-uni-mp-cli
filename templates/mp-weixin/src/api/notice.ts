/**
 * 通知公告接口
 * 控制器：Notice (extends Base，无需登录)
 */
import { http } from "@hlw-uni/mp-core";
import { v1 } from "./config";

/** 通知公告 */
export interface NoticeItem {
    id: number;
    appid: string;
    title: string;
    content: string;
    type: string;
    sort: number;
    status: number;
    create_at: string;
}

/**
 * 获取通知列表
 * @param type 通知类型（可选）
 */
export function getNoticeList(type?: string) {
    return http.request<{ list: NoticeItem[] }>({
        url: v1("notice/list"),
        method: "GET",
        data: type ? { type } : undefined,
    });
}
