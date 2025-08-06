<script setup lang="ts">
useSeoMeta({
	title: 'Rick and Morty',
	ogTitle: 'Rick and Morty',
	description: 'Rick and Morty random characters',
	ogDescription: 'Rick and Morty random characters',
	ogImage: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
});

const { $api } = useNuxtApp();
const { data: characters } = await useAsyncData('randomCharacters', () =>
	$api.characters.getRandom(),
);
</script>

<template>
	<hero-section />

	<section
		class="border-t-muted border-b-muted dark:border-b-primary dark:border-t-primary bg-primary dark:bg-default border-t border-b py-10 lg:py-20"
	>
		<UContainer>
			<div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				<UCard
					v-for="character in characters"
					:key="character.created"
					data-test-id="character_card"
					variant="solid"
					class="bg-bg-card relative pt-62 lg:pt-54"
					@click="navigateTo({ name: 'character-id', params: { id: character.id } })"
				>
					<nuxt-img
						:src="character.image"
						:alt="character.name"
						class="absolute top-0 left-0 h-62 w-full rounded-t-lg object-fill lg:h-54"
						placeholder
						loading="lazy"
					/>

					<h2>{{ character.name }}</h2>
					<div data-test-id="character_status" class="flex items-center">
						<live-indicator :status="character.status" />
						<span>{{ character.status }} - {{ character.species }}</span>
					</div>
				</UCard>
			</div>
		</UContainer>
	</section>
</template>
