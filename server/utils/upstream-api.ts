import { createError } from 'h3';
import { FetchError } from 'ofetch';

const ALLOWED_PATH = /^(character|episode|location)(\/[\d,]+)?$/;

export function isAllowedApiPath(path: string): boolean {
	return ALLOWED_PATH.test(path);
}

export function toUpstreamError(error: unknown): unknown {
	if (error instanceof FetchError) {
		return createError({
			statusCode: error.statusCode ?? 500,
			statusMessage: error.statusMessage,
		});
	}
	return error;
}
