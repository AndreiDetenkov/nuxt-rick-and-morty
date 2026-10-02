<script setup lang="ts">
import type { Character } from '#shared/types';
import BaseMediaCard from '~/components/base/base-media-card.vue';

const { character } = defineProps<{ character: Character }>();

const episodesLabel = computed(() => {
	const count = character.episode.length;
	return `${count} ${count === 1 ? 'episode' : 'episodes'}`;
});
</script>

<template>
	<base-media-card
		data-test-id="character_card"
		:to="{ name: 'character-id', params: { id: character.id } }"
		:title="character.name"
	>
		<template #media>
			<NuxtImg
				:src="character.image"
				:alt="character.name"
				width="300"
				height="300"
				placeholder
				class="aspect-square h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
			/>
		</template>

		<dl class="text-muted flex flex-col gap-1 text-sm">
			<div data-test-id="character_status" class="flex items-center gap-1.5">
				<dt class="flex size-4 shrink-0 items-center justify-center">
					<live-indicator :status="character.status" />
					<span class="sr-only">Status</span>
				</dt>
				<dd class="truncate">{{ character.status }} - {{ character.species }}</dd>
			</div>
			<div data-test-id="character_location" class="flex items-center gap-1.5">
				<dt>
					<UIcon name="i-lucide-map-pin" class="block size-4 shrink-0" />
					<span class="sr-only">Last known location</span>
				</dt>
				<dd class="truncate" :title="character.location.name">
					{{ character.location.name }}
				</dd>
			</div>
			<div data-test-id="character_episodes" class="flex items-center gap-1.5">
				<dt>
					<UIcon name="i-lucide-clapperboard" class="block size-4 shrink-0" />
					<span class="sr-only">Appears in</span>
				</dt>
				<dd>{{ episodesLabel }}</dd>
			</div>
		</dl>
	</base-media-card>
</template>
