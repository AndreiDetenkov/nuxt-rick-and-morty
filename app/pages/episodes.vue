<script setup lang="ts">
import ColumnLayout from '~/components/layout/column-layout.vue';
import GridLayout from '~/components/layout/grid-layout.vue';
import EpisodeCard from '~/components/episode-card.vue';

usePageSeo({
	title: 'Rick and Morty Episodes',
	description:
		'Browse through all episodes of Rick and Morty, including detailed information about each episode, air dates, and characters appearing in them.',
});

const page = usePageQuery();

const { $api } = useNuxtApp();
const { data } = await useAsyncData('episodes', () => $api.episodes.getByPage(page.value), {
	watch: [page],
});
</script>

<template>
	<column-layout>
		<grid-layout class="mb-10">
			<episode-card v-for="episode in data?.results" :key="episode.id" :episode="episode" />
		</grid-layout>

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
