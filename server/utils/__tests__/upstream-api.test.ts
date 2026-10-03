import { describe, expect, it } from 'vitest';
import { FetchError } from 'ofetch';
import { isAllowedApiPath, toUpstreamError } from '../upstream-api';

function createFetchError(statusCode?: number, statusMessage?: string): FetchError {
	const fetchError = new FetchError('Upstream request failed');
	fetchError.statusCode = statusCode;
	fetchError.statusMessage = statusMessage;
	return fetchError;
}

describe('isAllowedApiPath', () => {
	it.each([
		'character',
		'episode',
		'location',
		'character/1',
		'episode/51',
		'character/1,2,3',
		'location/3,20',
	])('should allow "%s"', (path) => {
		expect(isAllowedApiPath(path)).toBe(true);
	});

	it.each([
		'',
		'foo',
		'characters',
		'Character',
		'character/',
		'character/abc',
		'character/1a',
		'character/1/extra',
		'character/1/../../admin',
		'../secret',
		'/character/1',
		'//evil.com',
		'https://evil.com/character/1',
		'character?page=2',
		'character/1 ',
	])('should reject "%s"', (path) => {
		expect(isAllowedApiPath(path)).toBe(false);
	});
});

describe('toUpstreamError', () => {
	it('should keep upstream status code and message', () => {
		const upstreamError = toUpstreamError(createFetchError(404, 'Not Found'));

		expect(upstreamError).toMatchObject({ statusCode: 404, statusMessage: 'Not Found' });
	});

	it('should fall back to 500 when upstream status is missing', () => {
		const upstreamError = toUpstreamError(createFetchError());

		expect(upstreamError).toMatchObject({ statusCode: 500 });
	});

	it('should return non fetch errors unchanged', () => {
		const unexpectedError = new TypeError('Unexpected');

		expect(toUpstreamError(unexpectedError)).toBe(unexpectedError);
	});
});
