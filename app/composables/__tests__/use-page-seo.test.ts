import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ref, toValue } from 'vue';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import type { LocationQuery } from 'vue-router';
import { DEFAULT_SEO_IMAGE, usePageSeo } from '~/composables/use-page-seo';

const { route, useSeoMetaMock, useHeadMock } = vi.hoisted(() => ({
	route: { path: '/', query: {} as LocationQuery },
	useSeoMetaMock: vi.fn(),
	useHeadMock: vi.fn(),
}));

mockNuxtImport('useRoute', () => () => route);
mockNuxtImport('useSeoMeta', () => useSeoMetaMock);
mockNuxtImport('useHead', () => useHeadMock);
mockNuxtImport('useRequestURL', () => () => new URL('https://rick-and-morty.example'));

function getSeoMeta() {
	return useSeoMetaMock.mock.calls[0]![0];
}

function getCanonicalHref() {
	return toValue(useHeadMock.mock.calls[0]![0].link[0].href);
}

describe('usePageSeo', () => {
	beforeEach(() => {
		route.path = '/';
		route.query = {};
		useSeoMetaMock.mockReset();
		useHeadMock.mockReset();
	});

	it('should mirror title and description into open graph tags', () => {
		const title = () => 'Rick Sanchez | Rick and Morty';

		usePageSeo({ title, description: 'Mad scientist' });

		expect(getSeoMeta()).toMatchObject({
			title,
			ogTitle: title,
			description: 'Mad scientist',
			ogDescription: 'Mad scientist',
		});
	});

	it('should use website type by default', () => {
		usePageSeo({ title: 'Characters', description: 'All characters' });

		expect(getSeoMeta().ogType).toBe('website');
	});

	it('should pass custom type', () => {
		usePageSeo({ title: 'Rick', description: 'Rick', type: 'profile' });

		expect(getSeoMeta().ogType).toBe('profile');
	});

	it('should use page image when it is provided', () => {
		const image = ref<string | undefined>('https://example.com/rick.jpeg');

		usePageSeo({ title: 'Rick', description: 'Rick', image });

		expect(toValue(getSeoMeta().ogImage)).toBe('https://example.com/rick.jpeg');
	});

	it('should fall back to default image', () => {
		usePageSeo({ title: 'Episodes', description: 'All episodes', image: () => undefined });

		expect(toValue(getSeoMeta().ogImage)).toBe(DEFAULT_SEO_IMAGE);
	});

	it('should build canonical url from request origin and route path', () => {
		route.path = '/character/1';

		usePageSeo({ title: 'Rick', description: 'Rick' });

		expect(getCanonicalHref()).toBe('https://rick-and-morty.example/character/1');
		expect(toValue(getSeoMeta().ogUrl)).toBe('https://rick-and-morty.example/character/1');
	});

	it('should keep page param and drop other query params in canonical url', () => {
		route.path = '/characters';
		route.query = { page: '3', utm_source: 'twitter' };

		usePageSeo({ title: 'Characters', description: 'All characters' });

		expect(getCanonicalHref()).toBe('https://rick-and-morty.example/characters?page=3');
	});

	it('should drop first page param from canonical url', () => {
		route.path = '/characters';
		route.query = { page: '1' };

		usePageSeo({ title: 'Characters', description: 'All characters' });

		expect(getCanonicalHref()).toBe('https://rick-and-morty.example/characters');
	});
});
