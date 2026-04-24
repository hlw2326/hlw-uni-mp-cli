/**
 * 帮助中心接口
 * 控制器：Help (extends Base，无需登录)
 */
import { http } from "@hlw-uni/mp-core";
import { v1 } from "./config";

/** 帮助分类 */
export interface HelpCategory {
    id: number;
    name: string;
    sort: number;
    status: number;
}

/** 帮助文章 */
export interface HelpArticle {
    id: number;
    cate_id: number;
    title: string;
    content: string;
    sort: number;
    view_count: number;
    status: number;
    create_at: string;
}

/**
 * 获取帮助分类列表
 */
export function getHelpCates() {
    return http.request<{ list: HelpCategory[] }>({
        url: v1("help/cates"),
        method: "GET",
    });
}

/**
 * 获取帮助文章列表
 * @param cate_id 分类 ID（可选）
 */
export function getHelpList(cate_id?: number) {
    return http.request<{ list: HelpArticle[] }>({
        url: v1("help/list"),
        method: "GET",
        data: cate_id ? { cate_id } : undefined,
    });
}

/**
 * 获取帮助文章详情
 * @param id 文章 ID
 */
export function getHelpDetail(id: number) {
    return http.request<{ data: HelpArticle }>({
        url: v1("help/detail"),
        method: "GET",
        data: { id },
    });
}
