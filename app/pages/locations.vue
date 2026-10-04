<script setup lang="ts">
import ColumnLayout from '~/components/layout/column-layout.vue';
import GridLayout from '~/components/layout/grid-layout.vue';
import LocationCard from '~/components/location-card.vue';

usePageSeo({
	title: 'Rick and Morty Locations',
	description:
		'Browse through all locations of Rick and Morty, including their type, dimension, and the characters residing there.',
});

const page = usePageQuery();

const { $api } = useNuxtApp();
const { data } = await useAsyncData('locations', () => $api.locations.getByPage(page.value), {
	watch: [page],
});
</script>

<template>
	<column-layout>
		<grid-layout class="mb-10">
			<location-card v-for="location in data?.results" :key="location.id" :location="location" />
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
