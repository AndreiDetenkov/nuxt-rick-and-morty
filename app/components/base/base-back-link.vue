<script setup lang="ts">
const { to, label } = defineProps<{ to: string; label: string }>();
</script>

<template>
	<UButton
		data-test-id="back_link"
		:to="to"
		:label="label"
		icon="i-lucide-arrow-left"
		color="neutral"
		variant="link"
		class="-ml-2.5"
	/>
</template>
