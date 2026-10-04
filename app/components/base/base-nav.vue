<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const { orientation = 'horizontal' } = defineProps<{
	orientation?: 'horizontal' | 'vertical';
}>();

const navItems: NavigationMenuItem[] = [
	{
		label: 'Characters',
		icon: 'i-lucide-users',
		to: '/characters',
	},
	{
		label: 'Episodes',
		icon: 'i-lucide-clapperboard',
		to: '/episodes',
	},
	{
		label: 'Locations',
		icon: 'i-lucide-orbit',
		to: '/locations',
	},
];
</script>

<template>
	<UNavigationMenu
		data-test-id="nav"
		:items="navItems"
		:orientation="orientation"
		color="secondary"
		:class="{ '-mx-2.5': orientation === 'vertical' }"
		:ui="{
			link: 'text-primary dark:text-primary-light hover:text-secondary dark:hover:text-secondary aria-[current=page]:text-secondary dark:aria-[current=page]:text-secondary text-base font-semibold transition-colors duration-300',
			linkLeadingIcon: 'text-inherit group-hover:text-inherit',
		}"
	/>
</template>
