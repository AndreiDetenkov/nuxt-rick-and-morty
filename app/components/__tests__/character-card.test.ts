import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { GenderEnum, StatusEnum, type Character } from '#shared/types';
import CharacterCard from '~/components/character-card.vue';
import LiveIndicator from '~/components/live-indicator.vue';

const BaseMediaCardStub = {
	name: 'BaseMediaCard',
	props: ['to', 'title'],
	template: '<div :data-title="title"><slot name="media" /><slot /></div>',
};

function createCharacter(overrides: Partial<Character> = {}): Character {
	return {
		id: 1,
		name: 'Rick Sanchez',
		status: StatusEnum.Alive,
		species: 'Human',
		type: '',
		gender: GenderEnum.Male,
		origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
		location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
		image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
		episode: [
			'https://rickandmortyapi.com/api/episode/1',
			'https://rickandmortyapi.com/api/episode/2',
		],
		url: 'https://rickandmortyapi.com/api/character/1',
		created: '2017-11-04T18:48:46.250Z',
		...overrides,
	};
}

function mountCharacterCard(character: Character) {
	return shallowMount(CharacterCard, {
		props: { character },
		global: {
			stubs: {
				BaseMediaCard: BaseMediaCardStub,
				NuxtImg: { template: '<img />' },
				UIcon: { template: '<i />' },
			},
		},
	});
}

describe('CharacterCard.vue', () => {
	it('should render component', () => {
		const wrapper = mountCharacterCard(createCharacter());

		expect(wrapper.find('[data-test-id="character_card"]').exists()).toBe(true);
	});

	it('should link to character page with character name as title', () => {
		const mediaCard = mountCharacterCard(createCharacter({ id: 42 })).findComponent(
			BaseMediaCardStub,
		);

		expect(mediaCard.props('to')).toEqual({ name: 'character-id', params: { id: 42 } });
		expect(mediaCard.props('title')).toBe('Rick Sanchez');
	});

	it('should render character image', () => {
		const image = mountCharacterCard(createCharacter()).find('img');

		expect(image.attributes('src')).toBe('https://rickandmortyapi.com/api/character/avatar/1.jpeg');
		expect(image.attributes('alt')).toBe('Rick Sanchez');
	});

	it('should render status with species and live indicator', () => {
		const wrapper = mountCharacterCard(
			createCharacter({ status: StatusEnum.Dead, species: 'Alien' }),
		);

		expect(wrapper.find('[data-test-id="character_status"] dd').text()).toBe('Dead - Alien');
		expect(wrapper.findComponent(LiveIndicator).props('status')).toBe(StatusEnum.Dead);
	});

	it('should render last known location with full name in tooltip', () => {
		const location = mountCharacterCard(createCharacter()).find(
			'[data-test-id="character_location"] dd',
		);

		expect(location.text()).toBe('Citadel of Ricks');
		expect(location.attributes('title')).toBe('Citadel of Ricks');
	});

	it.each([
		[0, '0 episodes'],
		[1, '1 episode'],
		[2, '2 episodes'],
		[51, '51 episodes'],
	])('should render %i episodes as "%s"', (episodesCount, expectedLabel) => {
		const episode = Array.from(
			{ length: episodesCount },
			(_, index) => `https://rickandmortyapi.com/api/episode/${index + 1}`,
		);

		const episodes = mountCharacterCard(createCharacter({ episode })).find(
			'[data-test-id="character_episodes"] dd',
		);

		expect(episodes.text()).toBe(expectedLabel);
	});
});
