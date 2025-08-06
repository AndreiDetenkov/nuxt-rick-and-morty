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

	<section class="dark:border-b-primary dark:border-t-primary border-t border-b py-10 lg:py-20">
		<div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
			<UCard
				v-for="character in characters"
				:key="character.created"
				class="cursor-pointer"
				@click="navigateTo({ name: 'character-id', params: { id: character.id } })"
			>
				<nuxt-img
					:src="character.image"
					:alt="character.name"
					class="h-62 w-full rounded-t-lg object-fill lg:h-54"
					placeholder
					loading="lazy"
				/>

				{{ character.name }}
				<div data-test="character-status" class="flex items-center">
					<!--					<live-indicator data-test="character-status-indicator" :status="character.status" />-->
					{{ character.status }} - {{ character.species }}
				</div>
			</UCard>
		</div>
	</section>
</template>
