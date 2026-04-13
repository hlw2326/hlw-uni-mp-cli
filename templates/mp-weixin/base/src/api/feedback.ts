/**
 * 反馈建议接口
 * 控制器：Feedback (extends Auth，需要登录)
 */
import { http } from "@hlw-uni/mp-core";
import { v1 } from "./config";

/** 反馈类型 */
export interface FeedbackType {
    id: number;
    name: string;
    code: string;
    sort: number;
    status: number;
}

/** 反馈项 */
export interface FeedbackItem {
    id: number;
    user_id: string;
    type: string;
    type_name?: string;
    content: string;
    images: string[];
    contact: string;
    status: number;
    status_label?: string;
    create_at: string;
}

/** 反馈回复 */
export interface FeedbackReply {
    id: number;
    feedback_id: number;
    /** 0=用户 1=管理员 */
    sender_type: number;
    content: string;
    create_at: string;
}

/** 反馈详情（含聊天记录） */
export interface FeedbackDetail extends FeedbackItem {
    replies: FeedbackReply[];
}

/** 反馈统计 */
export interface FeedbackStats {
    pending: number;
    completed: number;
    total: number;
}

/**
 * 获取反馈类型列表
 */
export function getFeedbackTypes() {
    return http.request<{ list: FeedbackType[] }>({
        url: v1("feedback/types"),
        method: "GET",
    });
}

/**
 * 提交反馈
 */
export function submitFeedback(data: {
    type?: string;
    content: string;
    contact?: string;
    images?: string[] | string;
}) {
    return http.request<{ id: number }>({
        url: v1("feedback/submit"),
        method: "POST",
        data,
    });
}

/**
 * 获取我的反馈列表
 */
export function getMyFeedback(page = 1, limit = 20) {
    return http.request<{ list: FeedbackItem[]; total: number; page: number; limit: number }>({
        url: v1("feedback/my"),
        method: "GET",
        data: { page, limit },
    });
}

/**
 * 获取反馈详情（含聊天记录）
 */
export function getFeedbackDetail(id: number) {
    return http.request<{ data: FeedbackDetail }>({
        url: v1("feedback/detail"),
        method: "GET",
        data: { id },
    });
}

/**
 * 追加反馈内容
 */
export function appendFeedback(feedback_id: number, content: string) {
    return http.request<{ time: string }>({
        url: v1("feedback/append"),
        method: "POST",
        data: { feedback_id, content },
    });
}

/**
 * 获取反馈统计
 */
export function getFeedbackStats() {
    return http.request<FeedbackStats>({
        url: v1("feedback/stats"),
        method: "GET",
    });
}
