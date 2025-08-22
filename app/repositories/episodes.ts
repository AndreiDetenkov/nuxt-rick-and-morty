import type { $Fetch } from 'nitropack/types';
import type { Episodes } from '#shared/types';

interface EpisodesRepositoryInterface {
	getAll: () => Promise<Episodes>;
}

export class EpisodesRepository implements EpisodesRepositoryInterface {
	readonly appFetch: $Fetch;

	constructor(appFetch: $Fetch) {
		this.appFetch = appFetch;
	}

	getAll(): Promise<Episodes> {
		return this.appFetch(`/episode`, {
			method: 'GET',
		});
	}
}
