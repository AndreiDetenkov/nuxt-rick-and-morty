import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { $Fetch } from 'ofetch';
import type { Location, Locations } from '#shared/types';
import { LocationsRepository } from '~/repositories/locations';

describe('LocationsRepository', () => {
	const appFetch = vi.fn();
	const repository = new LocationsRepository(appFetch as unknown as $Fetch);

	beforeEach(() => {
		appFetch.mockReset();
	});

	describe('getByPage', () => {
		it('should request locations with page param', async () => {
			const locations = {
				info: { count: 126, pages: 7, next: null, prev: null },
				results: [{ id: 21, name: 'Testicle Monster Dimension' } as Location],
			} as Locations;
			appFetch.mockResolvedValue(locations);

			await expect(repository.getByPage(2)).resolves.toEqual(locations);
			expect(appFetch).toHaveBeenCalledWith('/location', { method: 'GET', params: { page: 2 } });
		});
	});

	describe('getById', () => {
		it('should request location by id', async () => {
			const location = { id: 3, name: 'Citadel of Ricks' } as Location;
			appFetch.mockResolvedValue(location);

			await expect(repository.getById(3)).resolves.toEqual(location);
			expect(appFetch).toHaveBeenCalledWith('/location/3', { method: 'GET' });
		});

		it('should propagate request error', async () => {
			const requestError = new Error('Network error');
			appFetch.mockRejectedValue(requestError);

			await expect(repository.getById(3)).rejects.toBe(requestError);
		});
	});
});
