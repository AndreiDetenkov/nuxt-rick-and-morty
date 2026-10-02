import type { RouteLocationNormalized } from 'vue-router';

export function validateIdParam(notFoundText: string) {
	return (route: RouteLocationNormalized) =>
		('id' in route.params && /^\d+$/.test(String(route.params.id))) || {
			status: 404,
			statusText: notFoundText,
		};
}
