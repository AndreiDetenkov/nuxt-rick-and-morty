import type { $Fetch } from 'ofetch';
import { EpisodesRepository, CharactersRepository } from '~/repositories';

export default defineNuxtPlugin({
	name: 'fetch',
	async setup() {
		const appFetch = $fetch.create({
			baseURL: '/api',

			onResponseError({ response }) {
				console.error('API Error:', response.status, response.statusText);
			},
		}) as unknown as $Fetch;

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
