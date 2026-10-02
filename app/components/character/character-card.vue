<script setup lang="ts">
import type { Character } from '#shared/types';

const { character } = defineProps<{ character: Character }>();

const episodesLabel = computed(() => {
	const count = character.episode.length;
	return `${count} ${count === 1 ? 'episode' : 'episodes'}`;
});
</script>

<template>
	<NuxtLink
		:to="{ name: 'character-id', params: { id: character.id } }"
		class="group focus-visible:outline-secondary block h-full min-w-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
	>
		<UCard
			data-test-id="character_card"
			variant="outline"
			:ui="{ body: 'p-0 sm:p-0' }"
			class="group-hover:ring-secondary h-full overflow-hidden transition-[translate,box-shadow] duration-200 ease-out group-hover:-translate-y-1 group-hover:shadow-lg motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
		>
			<div class="flex h-full sm:flex-col">
				<div class="w-28 shrink-0 overflow-hidden sm:w-full">
					<character-card-image :image="character.image" :name="character.name" />
				</div>

				<div
					class="border-default flex min-w-0 flex-1 flex-col justify-center gap-2 border-l p-3 sm:border-t sm:border-l-0 sm:p-4"
				>
					<h2
						class="dark:text-toned group-hover:text-secondary truncate text-lg font-semibold transition-colors sm:text-xl"
						:title="character.name"
					>
						{{ character.name }}
					</h2>
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
				</div>
			</div>
		</UCard>
	</NuxtLink>
</template>
