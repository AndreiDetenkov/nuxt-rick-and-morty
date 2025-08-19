<script setup lang="ts">
import CharacterCard from '~/components/character/character-card.vue';

useSeoMeta({
	title: 'Rick and Morty Random Characters',
	ogTitle: 'Rick and Morty Random Characters',
	description:
		'Explore all Rick and Morty characters from the multiverse. Browse through hundreds of characters with detailed information, images, and stats from the hit animated series.',
	ogDescription:
		'Explore all Rick and Morty characters from the multiverse. Browse through hundreds of characters with detailed information, images, and stats from the hit animated series.',
	ogImage: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
	ogUrl: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
	twitterTitle: 'Rick and Morty Random Characters',
	twitterDescription:
		'Explore all Rick and Morty characters from the multiverse. Browse hundreds of characters with detailed info and images.',
	twitterImage: "'https://rickandmortyapi.com/api/character/avatar/1.jpeg",
	keywords: 'Rick and Morty, characters, animated series, multiverse, cartoon characters',
	author: 'Rick and Morty Fan Site',
	robots: 'index, follow',
	ogType: 'website',
});

const { $api } = useNuxtApp();

const { data: characters } = await useAsyncData('randomCharacters', () =>
	$api.characters.getRandom(),
);
</script>

<template>
	<hero-section />
	<section class="py-10 lg:py-20">
		<UContainer class="flex flex-col items-center">
			<div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				<character-card
					v-for="character in characters"
					:key="character.created"
					:character="character"
				/>
			</div>
		</UContainer>
	</section>
</template>
