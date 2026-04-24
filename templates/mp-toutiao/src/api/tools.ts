/**
 * 工具箱接口
 * 控制器：Tools (extends Base，无需登录)
 */
import { http } from "@hlw-uni/mp-core";
import { v1 } from "./config";

/** 工具分类 */
export interface ToolsCategory {
    id: number;
    name: string;
    sort: number;
    status: number;
}

/** 工具项 */
export interface ToolItem {
    id: number;
    cate_id: number;
    name: string;
    icon: string;
    desc: string;
    path: string;
    sort: number;
    click_count: number;
    status: number;
}

/**
 * 获取工具分类列表
 */
export function getToolsCates() {
    return http.request<{ list: ToolsCategory[] }>({
        url: v1("tools/cates"),
        method: "GET",
    });
}

/**
 * 获取工具列表（按分类筛选）
 * @param cate_id 分类 ID（可选）
 */
export function getToolsList(cate_id?: number) {
    return http.request<{ list: ToolItem[] }>({
        url: v1("tools/list"),
        method: "GET",
        data: cate_id ? { cate_id } : undefined,
    });
}

/**
 * 获取全部工具（不分类）
 */
export function getToolsAll() {
    return http.request<{ list: ToolItem[] }>({
        url: v1("tools/all"),
        method: "GET",
    });
}

/**
 * 记录工具点击
 * @param id 工具 ID
 */
export function recordToolClick(id: number) {
    return http.request<null>({
        url: v1("tools/click"),
        method: "GET",
        data: { id },
    });
}
