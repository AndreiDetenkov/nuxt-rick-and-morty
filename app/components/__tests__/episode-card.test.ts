import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import type { Episode } from '#shared/types';
import EpisodeCard from '~/components/episode-card.vue';

const BaseMediaCardStub = {
	name: 'BaseMediaCard',
	props: ['to', 'title'],
	template: '<div><slot name="media" /><slot /></div>',
};

function createEpisode(overrides: Partial<Episode> = {}): Episode {
	return {
		id: 1,
		name: 'Pilot',
		air_date: 'December 2, 2013',
		episode: 'S01E01',
		characters: ['https://rickandmortyapi.com/api/character/1'],
		url: 'https://rickandmortyapi.com/api/episode/1',
		created: '2017-11-10T12:56:33.798Z',
		...overrides,
	};
}

function mountEpisodeCard(episode: Episode) {
	return shallowMount(EpisodeCard, {
		props: { episode },
		global: {
			stubs: {
				BaseMediaCard: BaseMediaCardStub,
				NuxtImg: { template: '<img />' },
				UBadge: { props: ['label'], template: '<span data-test-id="badge">{{ label }}</span>' },
			},
		},
	});
}

describe('EpisodeCard.vue', () => {
	it('should render component', () => {
		const wrapper = mountEpisodeCard(createEpisode());

		expect(wrapper.find('[data-test-id="episode_card"]').exists()).toBe(true);
	});

	it('should link to episode page with episode name as title', () => {
		const mediaCard = mountEpisodeCard(
			createEpisode({ id: 28, name: 'The Ricklantis Mixup' }),
		).findComponent(BaseMediaCardStub);

		expect(mediaCard.props('to')).toEqual({ name: 'episode-id', params: { id: 28 } });
		expect(mediaCard.props('title')).toBe('The Ricklantis Mixup');
	});

	it('should render decorative placeholder image', () => {
		const image = mountEpisodeCard(createEpisode()).find('img');

		expect(image.attributes('src')).toBe('/noImage.webp');
		expect(image.attributes('alt')).toBe('');
	});

	it('should render episode code and air date', () => {
		const wrapper = mountEpisodeCard(createEpisode());

		expect(wrapper.find('[data-test-id="badge"]').text()).toBe('S01E01');
		expect(wrapper.text()).toContain('December 2, 2013');
	});
});
