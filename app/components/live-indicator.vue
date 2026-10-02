<script setup lang="ts">
import { StatusEnum } from '#shared/types';

const { status } = defineProps<{ status: string }>();

const statusClasses = computed(() => {
	return {
		'bg-red-500': status === StatusEnum.Dead,
		'bg-green-500': status === StatusEnum.Alive,
		'bg-neutral-400': status === StatusEnum.unknown,
	};
});
</script>

<template>
	<div class="size-3 rounded-full" :class="statusClasses" data-test-id="live_indicator" />
</template>
