import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', {
	state: () => ({
		base: {
			parse_mode: 'quota',
			day_parse_count: 10,
			reward_parse_count: 10
		} as IConfig.Base,
		share: {
			title: '短视频去水印',
			path: '/pages/index/index',
			image_url: '/static/imgs/icon-video.png'
		} as IConfig.Share,
		contact: {
			send_message_title: '联系客服',
			send_message_path: '/pages/index/index',
			send_message_img: 'https://img-a.oss-cn-hangzhou.aliyuncs.com/qz/kefu.png',
			show_message_card: true,
			official_qrcode: ''
		} as IConfig.Contact,
		ad: {
			ad_global_enabled: 1,
			ad_enabled_banner: 1,
			ad_enabled_grid: 1,
			ad_enabled_custom: 1,
			ad_enabled_video: 1,
			ad_enabled_reward: 1,
			ad_enabled_popup: 1,
			banner_unit_id: '',
			grid_unit_id: '',
			custom_unit_id: '',
			video_unit_id: '',
			reward_unit_id: '',
			popup_unit_id: '',
			vip_no_ad: 0
		} as IConfig.Ad
	}),
	unistorage: true
});
