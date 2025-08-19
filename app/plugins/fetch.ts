import { charactersRepository } from '~/repositories/characters';

export default defineNuxtPlugin({
	name: 'fetch',
	async setup() {
		const config = useRuntimeConfig();

		const appFetch = $fetch.create({
			baseURL: config.public.baseUrl,

			onResponseError({ response }) {
				console.error('API Error:', response.status, response.statusText);
			},
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
