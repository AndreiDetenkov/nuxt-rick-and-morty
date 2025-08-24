<script setup lang="ts">
import ColumnLayout from '~/components/layout/column-layout.vue';
import GridLayout from '~/components/layout/grid-layout.vue';
import EpisodeCard from '~/components/episode/episode-card.vue';

useSeoMeta({
	title: 'Rick and Morty Episodes',
	ogTitle: 'Rick and Morty Episodes',
	description:
		'Browse through all episodes of Rick and Morty, including detailed information about each episode, air dates, and characters appearing in them.',
	ogDescription:
		'Browse through all episodes of Rick and Morty, including detailed information about each episode, air dates, and characters appearing in them.',
	ogImage: 'https://rickandmortyapi.com/api/episode/avatar/1.jpeg',
	ogUrl: 'https://rickandmortyapi.com/api/episode',
	twitterTitle: 'Rick and Morty Episodes',
	twitterDescription:
		'Find all Rick and Morty episodes with details, air dates, and character appearances.',
	twitterImage: 'https://rickandmortyapi.com/api/episode/avatar/1.jpeg',
	keywords: 'Rick and Morty, episodes, animated series, cartoon, seasons',
	author: 'Rick and Morty Fan Site',
	robots: 'index, follow',
	ogType: 'website',
});

const page = ref(1);

const { $api } = useNuxtApp();
const { data } = await useAsyncData('episodes', () => $api.episodes.getByPage(page.value), {
	watch: [page],
});
</script>

<template>
	<column-layout>
		<grid-layout class="mb-10">
			<episode-card v-for="episode in data?.results" :key="episode.id" :episode="episode"
		/></grid-layout>

		<LazyClientOnly>
			<UPagination
				v-model:page="page"
				:items-per-page="20"
				:total="data?.info.count"
				active-color="secondary"
			/>
		</LazyClientOnly>
	</column-layout>
</template>
