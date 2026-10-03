import { describe, expect, it } from 'vitest';
import type { RouteLocationNormalized } from 'vue-router';
import { validateIdParam } from '~/utils/validate-id-param';

const NOT_FOUND_TEXT = 'Character not found';

function createRoute(params: RouteLocationNormalized['params']): RouteLocationNormalized {
	return { params } as RouteLocationNormalized;
}

describe('validateIdParam', () => {
	const validate = validateIdParam(NOT_FOUND_TEXT);
	const notFoundResult = { status: 404, statusText: NOT_FOUND_TEXT };

	it.each(['1', '42', '826'])('should accept numeric id "%s"', (id) => {
		expect(validate(createRoute({ id }))).toBe(true);
	});

	it.each(['', 'abc', '1abc', '1.5', '-1', ' 1', '1,2'])('should reject id "%s"', (id) => {
		expect(validate(createRoute({ id }))).toEqual(notFoundResult);
	});

	it('should reject route without id param', () => {
		expect(validate(createRoute({}))).toEqual(notFoundResult);
	});

	it('should use provided not found text', () => {
		const validateEpisode = validateIdParam('Episode not found');

		expect(validateEpisode(createRoute({ id: 'abc' }))).toEqual({
			status: 404,
			statusText: 'Episode not found',
		});
	});
});
