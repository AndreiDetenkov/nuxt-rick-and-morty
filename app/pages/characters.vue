<script setup lang="ts">
import CharacterCard from '~/components/character-card.vue';
import ColumnLayout from '~/components/layout/column-layout.vue';
import GridLayout from '~/components/layout/grid-layout.vue';

useSeoMeta({
	title: 'Rick and Morty Characters',
	ogTitle: 'Rick and Morty Characters',
	description:
		'Explore all Rick and Morty characters from the multiverse. Browse through hundreds of characters with detailed information, images, and stats from the hit animated series.',
	ogDescription:
		'Explore all Rick and Morty characters from the multiverse. Browse through hundreds of characters with detailed information, images, and stats from the hit animated series.',
	ogImage: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
	ogUrl: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
	author: 'Rick and Morty Fan Site',
	robots: 'index, follow',
	ogType: 'website',
});

const page = usePageQuery();
const searchValue = ref('');

const { $api } = useNuxtApp();
const { data, error, execute, status } = await useAsyncData(
	'characters',
	() => $api.characters.filterCharacters(page.value, searchValue.value.trim()),
	{
		watch: [page],
	},
);

const notEmptyResults = computed(() => data.value?.results.length);

const nothingFound = computed(
	() => error.value?.status === 404 || (status.value === 'success' && !notEmptyResults.value),
);

const loadFailed = computed(() => !!error.value && error.value.status !== 404);

function searchCharacters() {
	if (page.value === 1) {
		execute();
		return;
	}

	page.value = 1;
}

function clearSearch() {
	searchValue.value = '';
	searchCharacters();
}
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
			class="mb-10 w-full sm:w-96"
			@keyup.enter="searchCharacters"
		/>

		<UEmpty
			v-if="nothingFound"
			data-test-id="characters_empty"
			icon="i-lucide-search-x"
			title="No characters found"
			description="Nobody in the multiverse matches this name. Try another one."
			:actions="[
				{
					label: 'Clear search',
					icon: 'i-lucide-x',
					color: 'neutral',
					variant: 'subtle',
					onClick: clearSearch,
				},
			]"
		/>

		<UAlert
			v-else-if="loadFailed"
			data-test-id="characters_error"
			title="Couldn't load characters"
			description="Something went wrong while loading characters."
			icon="i-lucide-circle-alert"
			color="error"
			variant="subtle"
			:actions="[
				{
					label: 'Try again',
					color: 'error',
					variant: 'outline',
					onClick: () => execute(),
				},
			]"
		/>

		<template v-else-if="notEmptyResults">
			<grid-layout class="mb-10">
				<character-card
					v-for="character in data?.results"
					:key="character.id.toString()"
					:character="character"
				/>
			</grid-layout>

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
