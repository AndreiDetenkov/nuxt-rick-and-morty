<script setup lang="ts">
const { image, name } = defineProps<{ image: string; name: string }>();
</script>

<template>
	<nuxt-img
		:src="image"
		:alt="name"
		width="300"
		height="300"
		class="aspect-square h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
		placeholder
	/>
</template>
