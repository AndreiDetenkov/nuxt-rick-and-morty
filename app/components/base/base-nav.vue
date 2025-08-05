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
			class="text-lg font-semibold transition-colors duration-300 hover:text-orange-500"
			inactive-class="text-primary"
			active-class="text-orange-500 underline underline-offset-4"
		>
			{{ nav.name }}
		</ULink>
	</nav>
</template>
