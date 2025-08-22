<script setup lang="ts">
const { $api } = useNuxtApp();

const { data } = await useAsyncData('episodes', () => $api.episodes.getAll());
</script>

<template>
	<section class="py-10 lg:py-20">
		<UContainer>
			<pre>{{ data }}</pre>
		</UContainer>
	</section>
</template>
