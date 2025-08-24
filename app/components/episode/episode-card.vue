<script setup lang="ts">
import type { Episode } from '#shared/types';

const { episode } = defineProps<{
	episode: Episode;
}>();
</script>

<template>
	<UCard
		data-test-id="episode_card"
		variant="outline"
		class="hover:border-secondary cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-2"
		@click="navigateTo({ name: 'episode-id', params: { id: episode.id } })"
	>
		<template #header>
			<NuxtImg format="webp" src="/noImage.webp" alt="no image picture" class="hidden md:block" />
			<h2 class="dark:text-toned text-xl font-semibold sm:truncate">{{ episode.name }}</h2>
			<h3 class="text-sm">{{ episode.episode }}</h3>
			<span class="text-dimmed text-sm">{{ episode.air_date }}</span>
		</template>
	</UCard>
</template>
