<script setup lang="ts">
import { motion } from 'motion-v';
import type { VariantType } from 'motion-v';

const { open } = defineProps<{
	open: boolean;
}>();

const TOP_LINE = 1;
const MIDDLE_LINE = 2;
const BOTTOM_LINE = 3;

const lines = [
	{ position: TOP_LINE, y: 6 },
	{ position: MIDDLE_LINE, y: 12 },
	{ position: BOTTOM_LINE, y: 18 },
];

const variants: Record<string, VariantType | ((position: number) => VariantType)> = {
	normal: { rotate: 0, y: 0, opacity: 1 },
	close: (position: number) => ({
		rotate: position === TOP_LINE ? 45 : position === BOTTOM_LINE ? -45 : 0,
		y: position === TOP_LINE ? 6 : position === BOTTOM_LINE ? -6 : 0,
		opacity: position === MIDDLE_LINE ? 0 : 1,
		transition: { type: 'spring', stiffness: 260, damping: 20 },
	}),
};
</script>

<template>
	<UButton
		variant="ghost"
		square
		data-test-id="menu_toggle"
		:aria-label="open ? 'Close menu' : 'Open menu'"
		:aria-expanded="open"
		class="text-primary dark:text-primary-light [-webkit-tap-highlight-color:transparent]"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="pointer-events-none size-5"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<motion.line
				v-for="line in lines"
				:key="line.position"
				x1="4"
				:y1="line.y"
				x2="20"
				:y2="line.y"
				:variants="variants"
				:animate="open ? 'close' : 'normal'"
				:custom="line.position"
			/>
		</svg>
	</UButton>
</template>
