<script setup>
import BaseFooter from './components/base/base-footer.vue';
import BaseHeader from './components/base/base-header.vue';
</script>

<template>
	<UApp>
		<div class="grid min-h-screen grid-rows-[auto_1fr_auto]">
			<base-header />
			<main>
				<NuxtPage />
			</main>
			<base-footer />
		</div>
	</UApp>
</template>
