<script setup lang="ts">
import ColumnLayout from '~/components/layout/column-layout.vue';
import GridLayout from '~/components/layout/grid-layout.vue';

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
			<UCard
				v-for="episode in data?.results"
				:key="episode.id"
				class="hover:border-secondary cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-2"
			>
				<template #header>
					<NuxtImg
						format="webp"
						src="/noImage.webp"
						alt="no image picture"
						class="hidden md:block"
					/>
					<h2 class="dark:text-toned text-xl font-semibold sm:truncate">{{ episode.name }}</h2>
					<h3 class="text-sm">{{ episode.episode }}</h3>
					<span class="text-dimmed text-sm">{{ episode.air_date }}</span>
				</template>
			</UCard>
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
