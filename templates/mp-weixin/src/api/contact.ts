/**
 * 客服按钮配置接口
 * 控制器：Config::contact（无需登录）
 *
 * 对应 <button open-type="contact"> 的四个微信原生属性。
 * 任一字段空/false 时前端传 undefined，让微信走默认行为。
 */
import { http } from "@hlw-uni/mp-vue";
import { v1 } from "./config";

export interface ContactConfig {
    send_message_title: string;
    send_message_path: string;
    send_message_img: string;
    show_message_card: boolean;
}

export function getContactConfig() {
    return http.request<ContactConfig>({
        url: v1("config/contact"),
        method: "GET",
    });
}
