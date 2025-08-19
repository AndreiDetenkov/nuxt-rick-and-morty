<script setup lang="ts">
export interface NavItem {
	name: string;
	path: string;
}

const navList: NavItem[] = [
	{
		name: 'Characters',
		path: '/characters',
	},
	{
		name: 'Episodes',
		path: '/episodes',
	},
];
</script>

<template>
	<nav data-test-id="nav" class="flex items-center gap-7">
		<ULink
			v-for="(nav, index) in navList"
			:key="`nav-item-${index}`"
			data-test-id="nav_link"
			:to="nav.path"
			raw
			class="dark:text-primary-light hover:text-secondary font-semibold transition-colors duration-300"
			inactive-class="text-primary"
			active-class="text-secondary"
		>
			{{ nav.name }}
		</ULink>
	</nav>
</template>
