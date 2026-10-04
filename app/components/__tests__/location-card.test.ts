import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import type { Location } from '#shared/types';
import LocationCard from '~/components/location-card.vue';

const BaseMediaCardStub = {
	name: 'BaseMediaCard',
	props: ['to', 'title'],
	template: '<div><slot name="media" /><slot /></div>',
};

function createLocation(overrides: Partial<Location> = {}): Location {
	return {
		id: 3,
		name: 'Citadel of Ricks',
		type: 'Space station',
		dimension: 'unknown',
		residents: [
			'https://rickandmortyapi.com/api/character/8',
			'https://rickandmortyapi.com/api/character/14',
		],
		url: 'https://rickandmortyapi.com/api/location/3',
		created: '2017-11-10T13:08:13.191Z',
		...overrides,
	};
}

function mountLocationCard(location: Location) {
	return shallowMount(LocationCard, {
		props: { location },
		global: {
			stubs: {
				BaseMediaCard: BaseMediaCardStub,
				UIcon: { template: '<i />' },
				UBadge: { props: ['label'], template: '<span>{{ label }}</span>' },
			},
		},
	});
}

describe('LocationCard.vue', () => {
	it('should render component', () => {
		const wrapper = mountLocationCard(createLocation());

		expect(wrapper.find('[data-test-id="location_card"]').exists()).toBe(true);
	});

	it('should link to location page with location name as title', () => {
		const mediaCard = mountLocationCard(createLocation({ id: 20 })).findComponent(
			BaseMediaCardStub,
		);

		expect(mediaCard.props('to')).toEqual({ name: 'location-id', params: { id: 20 } });
		expect(mediaCard.props('title')).toBe('Citadel of Ricks');
	});

	it('should render location type', () => {
		const wrapper = mountLocationCard(createLocation());

		expect(wrapper.find('[data-test-id="location_type"]').text()).toBe('Space station');
	});

	it('should not render type badge when type is empty', () => {
		const wrapper = mountLocationCard(createLocation({ type: '' }));

		expect(wrapper.find('[data-test-id="location_type"]').exists()).toBe(false);
	});

	it('should render dimension with full name in tooltip', () => {
		const dimension = mountLocationCard(createLocation({ dimension: 'Dimension C-137' })).find(
			'[data-test-id="location_dimension"] dd',
		);

		expect(dimension.text()).toBe('Dimension C-137');
		expect(dimension.attributes('title')).toBe('Dimension C-137');
	});

	it.each([
		[0, '0 residents'],
		[1, '1 resident'],
		[27, '27 residents'],
	])('should render %i residents as "%s"', (residentsCount, expectedLabel) => {
		const residents = Array.from(
			{ length: residentsCount },
			(_, index) => `https://rickandmortyapi.com/api/character/${index + 1}`,
		);

		const label = mountLocationCard(createLocation({ residents })).find(
			'[data-test-id="location_residents"] dd',
		);

		expect(label.text()).toBe(expectedLabel);
	});
});
