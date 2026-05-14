import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => ({
		token: '',
		user: null as IUser.Info | null
	}),
	unistorage: true
});
