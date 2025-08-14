<script setup lang="ts">
import type { Character } from '#shared/types';

const { character } = defineProps<{ character: Character }>();
</script>

<template>
	<UCard
		data-test-id="character_card"
		variant="outline"
		:ui="{ header: 'p-0 sm:px-0', body: 'sm:p-4' }"
		class="cursor-pointer bg-transparent"
		@click="navigateTo({ name: 'character-id', params: { id: character.id } })"
	>
		<template #header>
			<character-card-image :image="character.image" :name="character.name" />
		</template>

		<h2 class="dark:text-toned text-xl font-semibold sm:truncate">{{ character.name }}</h2>
		<div data-test-id="character_status" class="flex items-center">
			<live-indicator :status="character.status" />
			<span class="dark:text-toned opacity-80">
				{{ character.status }} - {{ character.species }}
			</span>
		</div>
	</UCard>
</template>
