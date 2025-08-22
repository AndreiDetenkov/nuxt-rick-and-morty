import type { $Fetch } from 'nitropack/types';
import type { Episodes } from '#shared/types';

interface EpisodesRepositoryInterface {
	getByPage: (page: number) => Promise<Episodes>;
}

export class EpisodesRepository implements EpisodesRepositoryInterface {
	readonly appFetch: $Fetch;

	constructor(appFetch: $Fetch) {
		this.appFetch = appFetch;
	}

	getByPage(page: number): Promise<Episodes> {
		return this.appFetch(`/episode`, {
			method: 'GET',
			params: {
				page,
			},
		});
	}
}
