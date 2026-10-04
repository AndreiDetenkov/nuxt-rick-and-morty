import type { MaybeRefOrGetter } from 'vue';
import { parsePageQuery } from '~/composables/use-page-query';

export const DEFAULT_SEO_IMAGE = 'https://rickandmortyapi.com/api/character/avatar/1.jpeg';

interface PageSeoOptions {
	title: MaybeRefOrGetter<string>;
	description: MaybeRefOrGetter<string>;
	image?: MaybeRefOrGetter<string | undefined>;
	type?: 'website' | 'article' | 'profile';
}

export function usePageSeo({ title, description, image, type = 'website' }: PageSeoOptions) {
	const route = useRoute();
	const { origin } = useRequestURL();

	const canonicalUrl = computed(() => {
		const url = new URL(route.path, origin);
		const page = parsePageQuery(route.query.page);

		if (page > 1) {
			url.searchParams.set('page', String(page));
		}

		return url.href;
	});

	useSeoMeta({
		title,
		ogTitle: title,
		description,
		ogDescription: description,
		ogImage: () => toValue(image) || DEFAULT_SEO_IMAGE,
		ogUrl: canonicalUrl,
		ogType: type,
	});

	useHead({
		link: [{ rel: 'canonical', href: canonicalUrl }],
	});
}
