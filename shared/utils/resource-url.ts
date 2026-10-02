// API links look like https://rickandmortyapi.com/api/character/35
export function getIdFromUrl(url: string): number {
	return Number(url.split('/').pop());
}
