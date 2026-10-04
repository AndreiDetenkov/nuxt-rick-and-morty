<script setup lang="ts">
import BaseColorModeBtn from '~/components/base/base-color-mode-btn.vue';
import BaseLogo from '~/components/base/base-logo.vue';
import BaseMenuToggle from '~/components/base/base-menu-toggle.vue';
import BaseNav from '~/components/base/base-nav.vue';
</script>

<template>
	<UHeader
		data-test-id="header"
		:ui="{
			center: 'hidden md:flex',
			content: 'md:hidden',
			overlay: 'md:hidden',
		}"
	>
		<template #left>
			<base-logo />
		</template>

		<base-nav />

		<template #right>
			<base-color-mode-btn />
		</template>

		<template #toggle="{ open, toggle, ui }">
			<base-menu-toggle
				:open="open"
				:class="ui.toggle({ class: 'md:hidden', toggleSide: 'right' })"
				@click="toggle"
			/>
		</template>

		<template #body>
			<base-nav orientation="vertical" />
		</template>
	</UHeader>
</template>
