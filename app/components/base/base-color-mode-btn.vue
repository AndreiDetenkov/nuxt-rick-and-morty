<script setup>
const colorMode = useColorMode();

const isDark = computed({
	get() {
		return colorMode.value === 'dark';
	},
	set(_isDark) {
		colorMode.preference = _isDark ? 'dark' : 'light';
	},
});

const icon = computed(() => (isDark.value ? 'i-lucide-moon' : 'i-lucide-sun'));
</script>

<template>
	<ClientOnly v-if="!colorMode?.forced">
		<UButton
			:icon="icon"
			variant="ghost"
			data-test-id="color_mode_btn"
			class="text-primary dark:text-primary-light"
			@click="isDark = !isDark"
		/>

		<template #fallback>
			<div class="size-8" />
		</template>
	</ClientOnly>
</template>
