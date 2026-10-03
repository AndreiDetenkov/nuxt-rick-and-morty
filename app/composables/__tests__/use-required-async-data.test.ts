import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { useRequiredAsyncData } from '~/composables/use-required-async-data';

const { useAsyncDataMock } = vi.hoisted(() => ({ useAsyncDataMock: vi.fn() }));

mockNuxtImport('useAsyncData', () => useAsyncDataMock);

function mockAsyncDataResult<T>(data: T | null, error: { status?: number } | null = null) {
	useAsyncDataMock.mockResolvedValue({ data: ref(data), error: ref(error) });
}

describe('useRequiredAsyncData', () => {
	const fetcher = vi.fn();

	beforeEach(() => {
		useAsyncDataMock.mockReset();
	});

	it('should pass key and fetcher to useAsyncData', async () => {
		mockAsyncDataResult({ id: 1 });

		await useRequiredAsyncData('character:1', fetcher, { name: 'Character' });

		const [key, passedFetcher] = useAsyncDataMock.mock.calls[0]!;
		expect(key).toBe('character:1');
		expect(passedFetcher).toBe(fetcher);
	});

	it('should return data ref when data is loaded', async () => {
		const character = { id: 1, name: 'Rick Sanchez' };
		mockAsyncDataResult(character);

		const data = await useRequiredAsyncData('character:1', fetcher, { name: 'Character' });

		expect(data.value).toEqual(character);
	});

	it('should throw fatal 404 when upstream responds with 404', async () => {
		mockAsyncDataResult(null, { status: 404 });

		await expect(
			useRequiredAsyncData('character:1', fetcher, { name: 'Character' }),
		).rejects.toMatchObject({ status: 404, statusText: 'Character not found', fatal: true });
	});

	it('should throw fatal 404 when data is empty without error', async () => {
		mockAsyncDataResult(null);

		await expect(
			useRequiredAsyncData('episode:1', fetcher, { name: 'Episode' }),
		).rejects.toMatchObject({ status: 404, statusText: 'Episode not found', fatal: true });
	});

	it('should throw fatal error with upstream status when request fails', async () => {
		mockAsyncDataResult(null, { status: 503 });

		await expect(
			useRequiredAsyncData('character:1', fetcher, { name: 'Character' }),
		).rejects.toMatchObject({ status: 503, statusText: "Couldn't load character", fatal: true });
	});

	it('should throw fatal 500 when request fails without status', async () => {
		mockAsyncDataResult(null, {});

		await expect(
			useRequiredAsyncData('episode:1', fetcher, { name: 'Episode' }),
		).rejects.toMatchObject({ status: 500, statusText: "Couldn't load episode", fatal: true });
	});

	it('should throw load error even when stale data is present', async () => {
		mockAsyncDataResult({ id: 1 }, { status: 500 });

		await expect(
			useRequiredAsyncData('character:1', fetcher, { name: 'Character' }),
		).rejects.toMatchObject({ status: 500, statusText: "Couldn't load character" });
	});
});
