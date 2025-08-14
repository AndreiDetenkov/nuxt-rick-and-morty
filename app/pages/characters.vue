<script setup lang="ts">
import CharacterCard from '~/components/character/character-card.vue';

useSeoMeta({
	title: 'Rick and Morty Characters',
	ogTitle: 'Rick and Morty Characters',
	description:
		'Explore all Rick and Morty characters from the multiverse. Browse through hundreds of characters with detailed information, images, and stats from the hit animated series.',
	ogDescription:
		'Explore all Rick and Morty characters from the multiverse. Browse through hundreds of characters with detailed information, images, and stats from the hit animated series.',
	ogImage: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
	ogUrl: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
	twitterTitle: 'Rick and Morty Characters',
	twitterDescription:
		'Explore all Rick and Morty characters from the multiverse. Browse hundreds of characters with detailed info and images.',
	twitterImage: "'https://rickandmortyapi.com/api/character/avatar/1.jpeg",
	keywords: 'Rick and Morty, characters, animated series, multiverse, cartoon characters',
	author: 'Rick and Morty Fan Site',
	robots: 'index, follow',
	ogType: 'website',
});

const { $api } = useNuxtApp();
const page = ref(1);

const { data: characters, status } = await useAsyncData(
	computed(() => `characters.page-${page.value}`),
	() => $api.characters.filterCharacters(page.value, ''),
	{ watch: [page], server: false },
);

const success = computed(() => status.value === 'success');
</script>

<template>
	<section v-if="success" class="py-10 lg:py-20">
		<u-container>
			<div class="mb-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				<character-card
					v-for="character in characters?.results"
					:key="character.id.toString()"
					:character="character"
				/>
			</div>

			<u-pagination v-model:page="page" :items-per-page="20" :total="characters?.info.count" />
		</u-container>
	</section>
</template>
