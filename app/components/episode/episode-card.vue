<script setup lang="ts">
import type { Episode } from '#shared/types';
import BaseMediaCard from '~/components/base/base-media-card.vue';

const { episode } = defineProps<{
	episode: Episode;
}>();
</script>

<template>
	<base-media-card
		data-test-id="episode_card"
		:to="{ name: 'episode-id', params: { id: episode.id } }"
		:title="episode.name"
	>
		<template #media>
			<NuxtImg
				format="webp"
				src="/noImage.webp"
				alt=""
				width="600"
				height="500"
				class="aspect-6/5 h-full w-full object-contain transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none dark:invert"
			/>
		</template>

		<div class="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-sm">
			<UBadge :label="episode.episode" color="secondary" variant="subtle" />
			<span class="text-dimmed">{{ episode.air_date }}</span>
		</div>
	</base-media-card>
</template>
