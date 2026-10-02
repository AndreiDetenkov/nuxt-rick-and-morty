<script setup lang="ts">
import type { Episode } from '#shared/types';

const { episode } = defineProps<{
	episode: Episode;
}>();
</script>

<template>
	<NuxtLink
		:to="{ name: 'episode-id', params: { id: episode.id } }"
		class="group focus-visible:outline-secondary block h-full min-w-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
	>
		<UCard
			data-test-id="episode_card"
			variant="outline"
			:ui="{ body: 'p-0 sm:p-0' }"
			class="group-hover:ring-secondary h-full overflow-hidden transition-[translate,box-shadow] duration-200 ease-out group-hover:-translate-y-1 group-hover:shadow-lg motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
		>
			<div class="flex h-full sm:flex-col">
				<div class="w-28 shrink-0 overflow-hidden sm:w-full">
					<NuxtImg
						format="webp"
						src="/noImage.webp"
						alt=""
						width="600"
						height="500"
						class="aspect-6/5 h-full w-full object-contain transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
					/>
				</div>

				<div
					class="border-default flex min-w-0 flex-1 flex-col justify-center gap-2 border-l p-3 sm:border-t sm:border-l-0 sm:p-4"
				>
					<h2
						class="dark:text-toned group-hover:text-secondary truncate text-lg font-semibold transition-colors sm:text-xl"
						:title="episode.name"
					>
						{{ episode.name }}
					</h2>
					<div class="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-sm">
						<UBadge :label="episode.episode" color="secondary" variant="subtle" />
						<span class="text-dimmed">{{ episode.air_date }}</span>
					</div>
				</div>
			</div>
		</UCard>
	</NuxtLink>
</template>
