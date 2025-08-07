<script setup>
import BaseHeader from './components/base/base-header.vue';
</script>

<template>
	<UApp>
		<nuxt-loading-indicator />
		<div class="grid h-dvh grid-rows-[auto_1fr_auto]">
			<base-header />
			<main>
				<NuxtPage />
			</main>
			<footer>Footer</footer>
		</div>
	</UApp>
</template>
