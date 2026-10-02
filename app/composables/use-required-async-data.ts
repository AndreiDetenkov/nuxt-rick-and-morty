import type { Ref } from 'vue';

export async function useRequiredAsyncData<T>(
	key: string,
	fetcher: () => Promise<T>,
	{ name }: { name: string },
): Promise<Ref<T>> {
	const { data, error } = await useAsyncData(key, fetcher);

	if (error.value && error.value.status !== 404) {
		throw createError({
			status: error.value.status ?? 500,
			statusText: `Couldn't load ${name.toLowerCase()}`,
			fatal: true,
		});
	}

	if (!data.value) {
		throw createError({ status: 404, statusText: `${name} not found`, fatal: true });
	}

	return data as Ref<T>;
}
