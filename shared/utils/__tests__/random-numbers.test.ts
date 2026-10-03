import { afterEach, describe, expect, it, vi } from 'vitest';
import { generateRandomNumbers } from '#shared/utils/random-numbers';

const FIRST_CHARACTER_ID = 1;
const LAST_CHARACTER_ID = 826;

describe('generateRandomNumbers', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should return 10 integers', () => {
		const numbers = generateRandomNumbers();

		expect(numbers).toHaveLength(10);
		numbers.forEach((number) => expect(Number.isInteger(number)).toBe(true));
	});

	it('should return numbers within character id range', () => {
		const numbers = generateRandomNumbers();

		numbers.forEach((number) => {
			expect(number).toBeGreaterThanOrEqual(FIRST_CHARACTER_ID);
			expect(number).toBeLessThanOrEqual(LAST_CHARACTER_ID);
		});
	});

	it('should include the first character id when random is minimal', () => {
		vi.spyOn(Math, 'random').mockReturnValueOnce(0);

		expect(generateRandomNumbers()).toContain(FIRST_CHARACTER_ID);
	});

	it('should include the last character id when random is maximal', () => {
		vi.spyOn(Math, 'random').mockReturnValueOnce(0.999999);

		expect(generateRandomNumbers()).toContain(LAST_CHARACTER_ID);
	});

	it('should not return duplicates when random repeats', () => {
		const repeatingRandomValues = [0, 0, 0.1, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
		const randomSpy = vi.spyOn(Math, 'random');
		repeatingRandomValues.forEach((value) => randomSpy.mockReturnValueOnce(value));

		const numbers = generateRandomNumbers();

		expect(numbers).toHaveLength(10);
		expect(new Set(numbers).size).toBe(10);
	});
});
