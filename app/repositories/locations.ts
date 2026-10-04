import type { $Fetch } from 'ofetch';
import type { Location, Locations } from '#shared/types';

interface LocationsRepositoryInterface {
	getByPage: (page: number) => Promise<Locations>;
	getById: (id: number) => Promise<Location>;
}

export class LocationsRepository implements LocationsRepositoryInterface {
	readonly appFetch: $Fetch;

	constructor(appFetch: $Fetch) {
		this.appFetch = appFetch;
	}

	getByPage(page: number): Promise<Locations> {
		return this.appFetch(`/location`, {
			method: 'GET',
			params: {
				page,
			},
		});
	}

	getById(id: number): Promise<Location> {
		return this.appFetch(`/location/${id}`, {
			method: 'GET',
		});
	}
}
