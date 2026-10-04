<script setup lang="ts">
import { getIdFromResourceUrl } from '#shared/utils/resource-url';
import BaseBackLink from '~/components/base/base-back-link.vue';
import CharacterCard from '~/components/character-card.vue';
import GridLayout from '~/components/layout/grid-layout.vue';
import { useRequiredAsyncData } from '~/composables/use-required-async-data';
import { validateIdParam } from '~/utils/validate-id-param';

definePageMeta({
	validate: validateIdParam('Location not found'),
});

const { id } = useRoute('location-id').params;

const { $api } = useNuxtApp();

const location = await useRequiredAsyncData(
	`location:${id}`,
	() => $api.locations.getById(Number(id)),
	{
		name: 'Location',
	},
);

const residentIds = computed(() => location.value?.residents.map(getIdFromResourceUrl) ?? []);

const {
	data: residents,
	status: residentsStatus,
	refresh: refreshResidents,
} = useLazyAsyncData(`location:${id}:residents`, () => $api.characters.getByIds(residentIds.value));

const details = computed(() => {
	if (!location.value) {
		return [];
	}

	const { type, dimension } = location.value;

	return [
		{ label: 'Type', value: type, icon: 'i-lucide-tag' },
		{ label: 'Dimension', value: dimension, icon: 'i-lucide-orbit' },
		{ label: 'Residents', value: `${residentIds.value.length} residents`, icon: 'i-lucide-users' },
	].filter((item) => item.value);
});

usePageSeo({
	title: () => `${location.value?.name} | Rick and Morty`,
	description: () =>
		`${location.value?.name} — ${location.value?.type} in ${location.value?.dimension}. See all ${residentIds.value.length} known residents of this Rick and Morty location.`,
	type: 'article',
});
</script>

<template>
	<section v-if="location" class="py-10 lg:py-20">
		<UContainer>
			<base-back-link to="/locations" label="All locations" />

			<header data-test-id="location_header" class="mt-8 flex flex-col gap-4 lg:mt-12">
				<UBadge
					v-if="location.type"
					:label="location.type"
					color="secondary"
					variant="subtle"
					size="lg"
					class="self-start"
				/>

				<h1 class="text-highlighted text-3xl font-bold text-balance sm:text-4xl lg:text-5xl">
					{{ location.name }}
				</h1>

				<dl class="text-muted flex flex-wrap gap-x-6 gap-y-2">
					<div v-for="item in details" :key="item.label" class="flex items-center gap-2">
						<dt>
							<UIcon :name="item.icon" class="size-5" />
							<span class="sr-only">{{ item.label }}</span>
						</dt>
						<dd>{{ item.value }}</dd>
					</div>
				</dl>
			</header>

			<USeparator class="my-10 lg:my-14" />

			<h2 class="text-highlighted mb-6 flex items-center gap-3 text-2xl font-semibold">
				Residents
				<UBadge :label="residentIds.length" color="neutral" variant="soft" />
			</h2>

			<p v-if="!residentIds.length" data-test-id="location_no_residents" class="text-muted">
				No known residents.
			</p>

			<UAlert
				v-else-if="residentsStatus === 'error'"
				title="Couldn't load residents"
				description="Something went wrong while loading residents of this location."
				icon="i-lucide-circle-alert"
				color="error"
				variant="subtle"
				:actions="[
					{
						label: 'Try again',
						color: 'error',
						variant: 'outline',
						onClick: () => refreshResidents(),
					},
				]"
			/>

			<grid-layout v-else>
				<template v-if="residentsStatus === 'pending'">
					<div
						v-for="n in Math.min(residentIds.length, 10)"
						:key="n"
						class="ring-default flex overflow-hidden rounded-lg ring sm:flex-col"
					>
						<USkeleton class="aspect-square w-28 shrink-0 rounded-none sm:w-full" />
						<div class="flex flex-1 flex-col justify-center gap-2 p-3 sm:p-4">
							<USkeleton class="h-6 w-3/4" />
							<USkeleton class="h-4 w-1/2" />
							<USkeleton class="h-4 w-2/3" />
							<USkeleton class="h-4 w-1/3" />
						</div>
					</div>
				</template>
				<template v-else>
					<character-card v-for="resident in residents" :key="resident.id" :character="resident" />
				</template>
			</grid-layout>
		</UContainer>
	</section>
</template>
