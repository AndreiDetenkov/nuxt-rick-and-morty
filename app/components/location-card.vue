<script setup lang="ts">
import type { Location } from '#shared/types.ts';
import BaseMediaCard from '~/components/base/base-media-card.vue';

const { location } = defineProps<{ location: Location }>();

const residentsLabel = computed(() => {
	const count = location.residents.length;
	return `${count} ${count === 1 ? 'resident' : 'residents'}`;
});
</script>

<template>
	<base-media-card
		data-test-id="location_card"
		:to="{ name: 'location-id', params: { id: location.id } }"
		:title="location.name"
	>
		<template #media>
			<div
				class="bg-elevated flex aspect-6/5 h-full w-full items-center justify-center transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
			>
				<UIcon name="i-lucide-orbit" class="text-dimmed size-12 sm:size-20" />
			</div>
		</template>

		<UBadge
			v-if="location.type"
			data-test-id="location_type"
			:label="location.type"
			color="secondary"
			variant="subtle"
			class="self-start"
		/>

		<dl class="text-muted flex flex-col gap-1 text-sm">
			<div data-test-id="location_dimension" class="flex items-center gap-1.5">
				<dt>
					<UIcon name="i-lucide-globe" class="block size-4 shrink-0" />
					<span class="sr-only">Dimension</span>
				</dt>
				<dd class="truncate" :title="location.dimension">{{ location.dimension }}</dd>
			</div>
			<div data-test-id="location_residents" class="flex items-center gap-1.5">
				<dt>
					<UIcon name="i-lucide-users" class="block size-4 shrink-0" />
					<span class="sr-only">Residents</span>
				</dt>
				<dd>{{ residentsLabel }}</dd>
			</div>
		</dl>
	</base-media-card>
</template>
