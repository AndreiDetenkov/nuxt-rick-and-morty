import { isAllowedApiPath, toUpstreamError } from '../utils/upstream-api';

export default defineCachedEventHandler(
	async (event) => {
		const path = getRouterParam(event, 'path') ?? '';

		if (!isAllowedApiPath(path)) {
			throw createError({ statusCode: 404, statusMessage: 'Not found' });
		}

		const { apiBaseUrl } = useRuntimeConfig(event);

		try {
			return await $fetch(path, { baseURL: apiBaseUrl, query: getQuery(event) });
		} catch (error) {
			throw toUpstreamError(error);
		}
	},
	{
		name: 'rick-and-morty-api',
		maxAge: 60 * 60 * 24,
		swr: true,
	},
);
