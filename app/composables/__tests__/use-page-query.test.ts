import { beforeEach, describe, expect, it, vi } from 'vitest';
import { reactive } from 'vue';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import type { LocationQuery } from 'vue-router';
import { parsePageQuery, usePageQuery } from '~/composables/use-page-query';

const { route, navigateToMock } = vi.hoisted(() => ({
	route: { query: {} as LocationQuery },
	navigateToMock: vi.fn(),
}));

mockNuxtImport('useRoute', () => () => reactive(route));
mockNuxtImport('navigateTo', () => navigateToMock);

describe('parsePageQuery', () => {
	it('should parse page number', () => {
		expect(parsePageQuery('3')).toBe(3);
	});

	it('should take first value of repeated param', () => {
		expect(parsePageQuery(['4', '5'])).toBe(4);
	});

	it.each([undefined, null, '', '0', '-2', '1.5', 'abc'])(
		'should fall back to first page for %s',
		(value) => {
			expect(parsePageQuery(value)).toBe(1);
		},
	);
});

describe('usePageQuery', () => {
	beforeEach(() => {
		route.query = {};
		navigateToMock.mockReset();
	});

	it('should read page from query', () => {
		route.query = { page: '2' };

		expect(usePageQuery().value).toBe(2);
	});

	it('should navigate to page keeping other query params', () => {
		route.query = { name: 'Rick' };

		usePageQuery().value = 5;

		expect(navigateToMock).toHaveBeenCalledWith({ query: { name: 'Rick', page: 5 } });
	});

	it('should drop page param for first page', () => {
		route.query = { page: '3' };

		usePageQuery().value = 1;

		expect(navigateToMock).toHaveBeenCalledWith({ query: { page: undefined } });
	});
});
