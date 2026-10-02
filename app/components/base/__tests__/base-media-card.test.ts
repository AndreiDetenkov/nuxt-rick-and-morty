import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount, type VueWrapper } from '@vue/test-utils';
import BaseMediaCard from '~/components/base/base-media-card.vue';

describe('BaseMediaCard.vue', () => {
	let wrapper: VueWrapper;

	beforeEach(() => {
		wrapper = shallowMount(BaseMediaCard, {
			props: {
				to: '/episode/1',
				title: 'Pilot',
			},
			attrs: {
				'data-test-id': 'episode_card',
			},
			slots: {
				media: '<img data-test-id="media" />',
				default: '<p data-test-id="content">S01E01</p>',
			},
			global: {
				stubs: {
					NuxtLink: {
						template: '<a :href="$attrs.to"><slot /></a>',
					},
					UCard: {
						template: '<div><slot /></div>',
					},
				},
			},
		});
	});

	it('should render component', () => {
		expect(wrapper.find('[data-test-id="episode_card"]').exists()).toBe(true);
	});

	it('links to passed route', () => {
		expect(wrapper.find('[data-test-id="episode_card"]').attributes('href')).toBe('/episode/1');
	});

	it('renders title with full text in tooltip', () => {
		const title = wrapper.find('[data-test-id="media_card_title"]');

		expect(title.text()).toBe('Pilot');
		expect(title.attributes('title')).toBe('Pilot');
	});

	it('renders media and content slots', () => {
		expect(wrapper.find('[data-test-id="media_card_media"] [data-test-id="media"]').exists()).toBe(
			true,
		);
		expect(wrapper.find('[data-test-id="content"]').text()).toBe('S01E01');
	});
});
