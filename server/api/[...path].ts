import { FetchError } from 'ofetch';

const ALLOWED_PATH = /^(character|episode|location)(\/[\d,]+)?$/;

export default defineCachedEventHandler(
	async (event) => {
		const path = getRouterParam(event, 'path') ?? '';

		if (!ALLOWED_PATH.test(path)) {
			throw createError({ statusCode: 404, statusMessage: 'Not found' });
		}

		const { apiBaseUrl } = useRuntimeConfig(event);

		try {
			return await $fetch(path, { baseURL: apiBaseUrl, query: getQuery(event) });
		} catch (error) {
			if (error instanceof FetchError) {
				throw createError({
					statusCode: error.statusCode ?? 500,
					statusMessage: error.statusMessage,
				});
			}
			throw error;
		}
	},
	{
		name: 'rick-and-morty-api',
		maxAge: 60 * 60 * 24,
		swr: true,
	},
);
