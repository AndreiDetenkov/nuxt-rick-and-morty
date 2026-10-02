import type { $Fetch } from 'ofetch';
import type { Character, CharactersByPage } from '#shared/types';
import { generateRandomNumbers } from '#shared/utils/random-numbers';

export interface CharactersRepositoryInterface {
	getRandom: () => Promise<Character[]>;
	getById: (id: number) => Promise<Character>;
	getByIds: (ids: number[]) => Promise<Character[]>;
	filterCharacters: (page: number, name: string) => Promise<CharactersByPage>;
}

export class CharactersRepository implements CharactersRepositoryInterface {
	readonly appFetch: $Fetch;

	constructor(appFetch: $Fetch) {
		this.appFetch = appFetch;
	}

	getRandom(): Promise<Character[]> {
		const ids: number[] = generateRandomNumbers();
		return this.appFetch(`/character/${ids}`, {
			method: 'GET',
		});
	}

	getById(id: number): Promise<Character> {
		return this.appFetch(`/character/${id}`, {
			method: 'GET',
		});
	}

	async getByIds(ids: number[]): Promise<Character[]> {
		if (!ids.length) {
			return [];
		}

		const result = await this.appFetch<Character | Character[]>(`/character/${ids}`, {
			method: 'GET',
		});

		return Array.isArray(result) ? result : [result];
	}

	filterCharacters(page: number, name: string): Promise<CharactersByPage> {
		return this.appFetch(`/character`, {
			method: 'GET',
			params: {
				page,
				name,
			},
		});
	}
}
