import { describe, expect, it } from 'vitest';
import { getIdFromResourceUrl } from '#shared/utils/resource-url';

describe('getIdFromResourceUrl', () => {
	it('should return id from character url', () => {
		expect(getIdFromResourceUrl('https://rickandmortyapi.com/api/character/42')).toBe(42);
	});

	it('should return id from episode url', () => {
		expect(getIdFromResourceUrl('https://rickandmortyapi.com/api/episode/7')).toBe(7);
	});

	it('should return id from relative path', () => {
		expect(getIdFromResourceUrl('/episode/51')).toBe(51);
	});

	it('should return NaN when url has no numeric id', () => {
		expect(getIdFromResourceUrl('https://rickandmortyapi.com/api/character')).toBeNaN();
	});
});
