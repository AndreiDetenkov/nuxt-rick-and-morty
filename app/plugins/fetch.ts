import { charactersRepository } from '~/repositories/characters';

export default defineNuxtPlugin({
	name: 'fetch',
	async setup() {
		const config = useRuntimeConfig();

		const appFetch = $fetch.create({
			baseURL: config.public.baseUrl,
		});

		const api = {
			characters: charactersRepository(appFetch),
		};

		return {
			provide: {
				api,
			},
		};
	},
});
