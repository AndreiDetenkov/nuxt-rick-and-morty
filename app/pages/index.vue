<script setup lang="ts">
import CharacterCard from '~/components/character/character-card.vue';

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
	<div class="dark:border-primary dark:border" />
	<section class="bg-primary dark:bg-default py-10 lg:py-20">
		<UContainer>
			<div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				<character-card
					v-for="character in characters"
					:key="character.created"
					:character="character"
				/>
			</div>
		</UContainer>
	</section>
	<div class="dark:border-primary dark:border" />
</template>
