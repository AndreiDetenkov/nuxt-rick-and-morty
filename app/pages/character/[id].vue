<script setup lang="ts">
import { StatusEnum } from '#shared/types';
import { getIdFromUrl } from '#shared/utils/resource-url';
import BaseBackLink from '~/components/base/base-back-link.vue';
import EpisodeCard from '~/components/episode/episode-card.vue';
import GridLayout from '~/components/layout/grid-layout.vue';
import { useRequiredAsyncData } from '~/composables/use-required-async-data';
import { validateIdParam } from '~/utils/validate-id-param';

definePageMeta({
	validate: validateIdParam('Character not found'),
});

const { id } = useRoute('character-id').params;

const { $api } = useNuxtApp();

const character = await useRequiredAsyncData(
	`character:${id}`,
	() => $api.characters.getById(Number(id)),
	{
		name: 'Character',
	},
);

const statusColor = computed(() => {
	switch (character.value?.status) {
		case StatusEnum.Alive:
			return 'success';
		case StatusEnum.Dead:
			return 'error';
		default:
			return 'neutral';
	}
});

const details = computed(() => {
	if (!character.value) {
		return [];
	}

	const { species, type, gender, origin, location } = character.value;

	return [
		{ label: 'Species', value: species, icon: 'i-lucide-dna' },
		{ label: 'Type', value: type, icon: 'i-lucide-tag' },
		{ label: 'Gender', value: gender, icon: 'i-lucide-venus-and-mars' },
		{ label: 'Origin', value: origin.name, icon: 'i-lucide-globe' },
		{ label: 'Last known location', value: location.name, icon: 'i-lucide-map-pin' },
	].filter((item) => item.value);
});

const episodeIds = computed(() => character.value?.episode.map(getIdFromUrl) ?? []);

const {
	data: episodes,
	status: episodesStatus,
	refresh: refreshEpisodes,
} = useLazyAsyncData(`character:${id}:episodes`, () => $api.episodes.getByIds(episodeIds.value));

useSeoMeta({
	title: () => `${character.value?.name} | Rick and Morty`,
	ogTitle: () => `${character.value?.name} | Rick and Morty`,
	description: () =>
		`${character.value?.name} — ${character.value?.status} ${character.value?.species} from ${character.value?.origin.name}. Appears in ${episodeIds.value.length} episodes of Rick and Morty.`,
	ogDescription: () =>
		`${character.value?.name} — ${character.value?.status} ${character.value?.species} from ${character.value?.origin.name}.`,
	ogImage: () => character.value?.image,
	ogType: 'profile',
});
</script>

<template>
	<section v-if="character" class="py-10 lg:py-20">
		<UContainer>
			<base-back-link to="/characters" label="All characters" />

			<header
				data-test-id="character_header"
				class="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center lg:mt-12 lg:gap-10"
			>
				<NuxtImg
					:src="character.image"
					:alt="character.name"
					width="300"
					height="300"
					class="ring-default aspect-square w-40 shrink-0 rounded-xl object-cover ring sm:w-56 lg:w-64"
				/>

				<div class="flex min-w-0 flex-col gap-4">
					<UBadge
						:color="statusColor"
						variant="subtle"
						size="lg"
						class="self-start"
						data-test-id="character_status"
					>
						<template #leading>
							<live-indicator :status="character.status" />
						</template>
						{{ character.status }}
					</UBadge>

					<h1 class="text-highlighted text-3xl font-bold text-balance sm:text-4xl lg:text-5xl">
						{{ character.name }}
					</h1>

					<dl class="grid gap-x-8 gap-y-3 sm:grid-cols-2">
						<div v-for="item in details" :key="item.label" class="flex min-w-0 items-start gap-3">
							<UIcon :name="item.icon" class="text-muted mt-0.5 size-5 shrink-0" />
							<div class="min-w-0">
								<dt class="text-dimmed text-xs font-medium tracking-wide uppercase">
									{{ item.label }}
								</dt>
								<dd class="text-default truncate" :title="item.value">{{ item.value }}</dd>
							</div>
						</div>
					</dl>
				</div>
			</header>

			<USeparator class="my-10 lg:my-14" />

			<h2 class="text-highlighted mb-6 flex items-center gap-3 text-2xl font-semibold">
				Episodes
				<UBadge :label="episodeIds.length" color="neutral" variant="soft" />
			</h2>

			<UAlert
				v-if="episodesStatus === 'error'"
				title="Couldn't load episodes"
				description="Something went wrong while loading episodes of this character."
				icon="i-lucide-circle-alert"
				color="error"
				variant="subtle"
				:actions="[
					{
						label: 'Try again',
						color: 'error',
						variant: 'outline',
						onClick: () => refreshEpisodes(),
					},
				]"
			/>

			<grid-layout v-else>
				<template v-if="episodesStatus === 'pending'">
					<div
						v-for="n in Math.min(episodeIds.length, 10)"
						:key="n"
						class="ring-default flex overflow-hidden rounded-lg ring sm:flex-col"
					>
						<USkeleton class="aspect-6/5 w-28 shrink-0 rounded-none sm:w-full" />
						<div class="flex flex-1 flex-col justify-center gap-2 p-3 sm:p-4">
							<USkeleton class="h-6 w-3/4" />
							<USkeleton class="h-5 w-1/2" />
						</div>
					</div>
				</template>
				<template v-else>
					<episode-card v-for="episode in episodes" :key="episode.id" :episode="episode" />
				</template>
			</grid-layout>
		</UContainer>
	</section>
</template>
