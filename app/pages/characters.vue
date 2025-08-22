<script setup lang="ts">
import CharacterCard from '~/components/character/character-card.vue';
import ColumnLayout from '~/components/layout/column-layout.vue';

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

const page = ref(1);
const searchValue = ref('');

const { $api } = useNuxtApp();
const { data, execute, status } = await useAsyncData(
	'characters',
	() => $api.characters.filterCharacters(page.value, searchValue.value.trim()),
	{
		watch: [page],
	},
);

const notEmptyResults = computed(() => data.value?.results.length);
</script>

<template>
	<column-layout>
		<UInput
			v-model="searchValue"
			:loading="status === 'pending'"
			size="xl"
			color="secondary"
			placeholder="Search characters"
			icon="i-lucide-search"
			class="mb-10 w-96"
			@keyup.enter="execute"
		/>

		<template v-if="notEmptyResults">
			<div class="mb-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				<character-card
					v-for="character in data?.results"
					:key="character.id.toString()"
					:character="character"
				/>
			</div>

			<ClientOnly>
				<UPagination
					v-model:page="page"
					:items-per-page="20"
					:total="data?.info.count"
					active-color="secondary"
				/>
			</ClientOnly>
		</template>
	</column-layout>
</template>
