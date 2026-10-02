export function getIdFromResourceUrl(url: string): number {
	return Number(url.split('/').pop());
}
