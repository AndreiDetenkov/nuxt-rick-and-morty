<script setup lang="ts">
const { id } = useRoute().params;
const { $api } = useNuxtApp();
const { data } = await useAsyncData(`character:${id}`, () => $api.episodes.getById(Number(id)));
</script>

<template>
	<section class="py-10 lg:py-20">
		<UContainer>
			<pre>{{ data }}</pre>
		</UContainer>
	</section>
</template>
