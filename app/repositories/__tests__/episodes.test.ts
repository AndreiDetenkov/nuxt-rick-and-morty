import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { $Fetch } from 'ofetch';
import type { Episode, Episodes } from '#shared/types';
import { EpisodesRepository } from '~/repositories/episodes';

function createEpisode(id: number): Episode {
	return { id, name: `Episode ${id}` } as Episode;
}

describe('EpisodesRepository', () => {
	const appFetch = vi.fn();
	const repository = new EpisodesRepository(appFetch as unknown as $Fetch);

	beforeEach(() => {
		appFetch.mockReset();
	});

	describe('getByPage', () => {
		it('should request episodes with page param', async () => {
			const episodes = {
				info: { count: 51, pages: 3, next: null, prev: null },
				results: [createEpisode(21)],
			} as Episodes;
			appFetch.mockResolvedValue(episodes);

			await expect(repository.getByPage(2)).resolves.toEqual(episodes);
			expect(appFetch).toHaveBeenCalledWith('/episode', { method: 'GET', params: { page: 2 } });
		});
	});

	describe('getById', () => {
		it('should request episode by id', async () => {
			const episode = createEpisode(1);
			appFetch.mockResolvedValue(episode);

			await expect(repository.getById(1)).resolves.toEqual(episode);
			expect(appFetch).toHaveBeenCalledWith('/episode/1', { method: 'GET' });
		});
	});

	describe('getByIds', () => {
		it('should return empty array without request when ids are empty', async () => {
			await expect(repository.getByIds([])).resolves.toEqual([]);
			expect(appFetch).not.toHaveBeenCalled();
		});

		it('should wrap single episode response into array', async () => {
			const episode = createEpisode(7);
			appFetch.mockResolvedValue(episode);

			await expect(repository.getByIds([7])).resolves.toEqual([episode]);
			expect(appFetch).toHaveBeenCalledWith('/episode/7', { method: 'GET' });
		});

		it('should return array response as is', async () => {
			const episodes = [createEpisode(1), createEpisode(2)];
			appFetch.mockResolvedValue(episodes);

			await expect(repository.getByIds([1, 2])).resolves.toEqual(episodes);
			expect(appFetch).toHaveBeenCalledWith('/episode/1,2', { method: 'GET' });
		});

		it('should propagate request error', async () => {
			const requestError = new Error('Network error');
			appFetch.mockRejectedValue(requestError);

			await expect(repository.getByIds([1])).rejects.toBe(requestError);
		});
	});
});
