<script setup lang="ts">
const { image, name } = defineProps<{ image: string; name: string }>();
</script>

<template>
	<nuxt-img
		:src="image"
		:alt="name"
		class="h-80 w-full rounded-t-lg object-fill transition-all duration-300 hover:scale-105 sm:h-68 md:h-62 lg:h-54"
		placeholder
	/>
</template>
