import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { $Fetch } from 'ofetch';
import type { Character, CharactersByPage } from '#shared/types';
import { CharactersRepository } from '~/repositories/characters';

vi.mock('#shared/utils/random-numbers', () => ({
	generateRandomNumbers: () => [3, 14, 15],
}));

function createCharacter(id: number): Character {
	return { id, name: `Character ${id}` } as Character;
}

describe('CharactersRepository', () => {
	const appFetch = vi.fn();
	const repository = new CharactersRepository(appFetch as unknown as $Fetch);

	beforeEach(() => {
		appFetch.mockReset();
	});

	describe('getRandom', () => {
		it('should request characters by generated random ids', async () => {
			const characters = [createCharacter(3), createCharacter(14), createCharacter(15)];
			appFetch.mockResolvedValue(characters);

			await expect(repository.getRandom()).resolves.toEqual(characters);
			expect(appFetch).toHaveBeenCalledWith('/character/3,14,15', { method: 'GET' });
		});
	});

	describe('getById', () => {
		it('should request character by id', async () => {
			const character = createCharacter(1);
			appFetch.mockResolvedValue(character);

			await expect(repository.getById(1)).resolves.toEqual(character);
			expect(appFetch).toHaveBeenCalledWith('/character/1', { method: 'GET' });
		});
	});

	describe('getByIds', () => {
		it('should return empty array without request when ids are empty', async () => {
			await expect(repository.getByIds([])).resolves.toEqual([]);
			expect(appFetch).not.toHaveBeenCalled();
		});

		it('should wrap single character response into array', async () => {
			const character = createCharacter(5);
			appFetch.mockResolvedValue(character);

			await expect(repository.getByIds([5])).resolves.toEqual([character]);
			expect(appFetch).toHaveBeenCalledWith('/character/5', { method: 'GET' });
		});

		it('should return array response as is', async () => {
			const characters = [createCharacter(1), createCharacter(2), createCharacter(3)];
			appFetch.mockResolvedValue(characters);

			await expect(repository.getByIds([1, 2, 3])).resolves.toEqual(characters);
			expect(appFetch).toHaveBeenCalledWith('/character/1,2,3', { method: 'GET' });
		});

		it('should propagate request error', async () => {
			const requestError = new Error('Network error');
			appFetch.mockRejectedValue(requestError);

			await expect(repository.getByIds([1])).rejects.toBe(requestError);
		});
	});

	describe('filterCharacters', () => {
		it('should request characters with page and name params', async () => {
			const charactersByPage = {
				info: { count: 1, pages: 1, next: null, prev: null },
				results: [createCharacter(1)],
			} as CharactersByPage;
			appFetch.mockResolvedValue(charactersByPage);

			await expect(repository.filterCharacters(2, 'Rick')).resolves.toEqual(charactersByPage);
			expect(appFetch).toHaveBeenCalledWith('/character', {
				method: 'GET',
				params: { page: 2, name: 'Rick' },
			});
		});
	});
});
