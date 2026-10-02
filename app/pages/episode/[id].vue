<script setup lang="ts">
import { getIdFromUrl } from '#shared/utils/resource-url';
import CharacterCard from '~/components/character/character-card.vue';
import GridLayout from '~/components/layout/grid-layout.vue';

const { id } = useRoute('episode-id').params;

const { $api } = useNuxtApp();

const { data: episode } = await useAsyncData(`episode:${id}`, () =>
	$api.episodes.getById(Number(id)),
);

if (!episode.value) {
	throw createError({ statusCode: 404, statusMessage: 'Episode not found', fatal: true });
}

const characterIds = computed(() => episode.value?.characters.map(getIdFromUrl) ?? []);

const {
	data: characters,
	status: charactersStatus,
	refresh: refreshCharacters,
} = useLazyAsyncData(`episode:${id}:characters`, () =>
	$api.characters.getByIds(characterIds.value),
);

const seasonLabel = computed(() => {
	const match = episode.value?.episode.match(/^S(\d+)E(\d+)$/);
	return match ? `Season ${Number(match[1])} · Episode ${Number(match[2])}` : '';
});

useSeoMeta({
	title: () => `${episode.value?.name} (${episode.value?.episode}) | Rick and Morty`,
	ogTitle: () => `${episode.value?.name} (${episode.value?.episode}) | Rick and Morty`,
	description: () =>
		`${episode.value?.name} — ${seasonLabel.value} of Rick and Morty, aired ${episode.value?.air_date}. See all ${characterIds.value.length} characters appearing in the episode.`,
	ogDescription: () =>
		`${episode.value?.name} — ${seasonLabel.value} of Rick and Morty, aired ${episode.value?.air_date}.`,
	ogType: 'article',
});
</script>

<template>
	<section v-if="episode" class="py-10 lg:py-20">
		<UContainer>
			<UButton
				to="/episodes"
				icon="i-lucide-arrow-left"
				label="All episodes"
				color="neutral"
				variant="link"
				class="-ml-2.5"
			/>

			<header data-test-id="episode_header" class="mt-8 flex flex-col gap-4 lg:mt-12">
				<div class="flex flex-wrap items-center gap-3">
					<UBadge :label="episode.episode" color="secondary" variant="subtle" size="lg" />
					<span v-if="seasonLabel" class="text-muted text-sm">{{ seasonLabel }}</span>
				</div>

				<h1 class="text-highlighted text-3xl font-bold text-balance sm:text-4xl lg:text-5xl">
					{{ episode.name }}
				</h1>

				<dl class="text-muted flex flex-wrap gap-x-6 gap-y-2">
					<div class="flex items-center gap-2">
						<dt>
							<UIcon name="i-lucide-calendar" class="size-5" />
							<span class="sr-only">Air date</span>
						</dt>
						<dd>{{ episode.air_date }}</dd>
					</div>
					<div class="flex items-center gap-2">
						<dt>
							<UIcon name="i-lucide-users" class="size-5" />
							<span class="sr-only">Characters</span>
						</dt>
						<dd>{{ characterIds.length }} characters</dd>
					</div>
				</dl>
			</header>

			<USeparator class="my-10 lg:my-14" />

			<h2 class="text-highlighted mb-6 flex items-center gap-3 text-2xl font-semibold">
				Characters
				<UBadge :label="characterIds.length" color="neutral" variant="soft" />
			</h2>

			<UAlert
				v-if="charactersStatus === 'error'"
				title="Couldn't load characters"
				description="Something went wrong while loading characters of this episode."
				icon="i-lucide-circle-alert"
				color="error"
				variant="subtle"
				:actions="[
					{
						label: 'Try again',
						color: 'error',
						variant: 'outline',
						onClick: () => refreshCharacters(),
					},
				]"
			/>

			<grid-layout v-else>
				<template v-if="charactersStatus === 'pending'">
					<div
						v-for="n in characterIds.length"
						:key="n"
						class="ring-default flex flex-col overflow-hidden rounded-lg ring"
					>
						<USkeleton class="h-80 rounded-none sm:h-68 md:h-62 lg:h-54" />
						<div class="flex flex-col gap-2 p-4">
							<USkeleton class="h-6 w-3/4" />
							<USkeleton class="h-4 w-1/2" />
						</div>
					</div>
				</template>
				<template v-else>
					<character-card
						v-for="character in characters"
						:key="character.id"
						:character="character"
					/>
				</template>
			</grid-layout>
		</UContainer>
	</section>
</template>
