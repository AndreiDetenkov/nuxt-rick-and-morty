import type { $Fetch } from 'ofetch';
import type { Episode, Episodes } from '#shared/types';

interface EpisodesRepositoryInterface {
	getByPage: (page: number) => Promise<Episodes>;
	getById: (id: number) => Promise<Episode>;
	getByIds: (ids: number[]) => Promise<Episode[]>;
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

	getById(id: number): Promise<Episode> {
		return this.appFetch(`/episode/${id}`, {
			method: 'GET',
		});
	}

	async getByIds(ids: number[]): Promise<Episode[]> {
		if (!ids.length) {
			return [];
		}

		const result = await this.appFetch<Episode | Episode[]>(`/episode/${ids}`, {
			method: 'GET',
		});

		return Array.isArray(result) ? result : [result];
	}
}
