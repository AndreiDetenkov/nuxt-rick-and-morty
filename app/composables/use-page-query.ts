import type { LocationQueryValue } from 'vue-router';

export function parsePageQuery(value: LocationQueryValue | LocationQueryValue[] | undefined) {
	const page = Number(Array.isArray(value) ? value[0] : value);
	return Number.isInteger(page) && page > 1 ? page : 1;
}

export function usePageQuery() {
	const route = useRoute();

	return computed({
		get: () => parsePageQuery(route.query.page),
		set: (page: number) =>
			navigateTo({ query: { ...route.query, page: page > 1 ? page : undefined } }),
	});
}
