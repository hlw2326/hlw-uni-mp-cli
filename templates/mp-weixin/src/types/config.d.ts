declare namespace IConfig {
    interface Base {
        parse_mode: "ad" | "quota" | "free";
        day_parse_count: number;
        reward_parse_count: number;
        download_backup_enabled: 0 | 1;
    }

    interface Share {
        title: string;
        path: string;
        image_url: string;
    }

    interface Contact {
        send_message_title: string;
        send_message_path: string;
        send_message_img: string;
        show_message_card: boolean;
        official_qrcode: string;
    }

    interface Ad {
        ad_global_enabled: 0 | 1;
        ad_enabled_banner: 0 | 1;
        ad_enabled_grid: 0 | 1;
        ad_enabled_custom: 0 | 1;
        ad_enabled_video: 0 | 1;
        ad_enabled_reward: 0 | 1;
        ad_enabled_popup: 0 | 1;
        banner_unit_id: string;
        grid_unit_id: string;
        custom_unit_id: string;
        video_unit_id: string;
        reward_unit_id: string;
        popup_unit_id: string;
        vip_no_ad: 0 | 1;
    }

    interface AdReward {
        reward: number;
        parse_count: number;
    }
}
