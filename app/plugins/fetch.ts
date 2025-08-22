import { EpisodesRepository, CharactersRepository } from '~/repositories';

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
			characters: new CharactersRepository(appFetch),
			episodes: new EpisodesRepository(appFetch),
		};

		return {
			provide: {
				api,
			},
		};
	},
});
