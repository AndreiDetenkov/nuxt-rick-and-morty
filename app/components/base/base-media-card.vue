<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

const { to, title } = defineProps<{ to: RouteLocationRaw; title: string }>();
</script>

<template>
	<NuxtLink
		:to="to"
		class="group focus-visible:outline-secondary block h-full min-w-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
	>
		<UCard
			variant="outline"
			:ui="{ body: 'p-0 sm:p-0' }"
			class="group-hover:ring-secondary h-full overflow-hidden transition-[translate,box-shadow] duration-200 ease-out group-hover:-translate-y-1 group-hover:shadow-lg motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
		>
			<div class="flex h-full sm:flex-col">
				<div data-test-id="media_card_media" class="w-28 shrink-0 overflow-hidden sm:w-full">
					<slot name="media" />
				</div>

				<div
					class="border-default flex min-w-0 flex-1 flex-col justify-center gap-2 border-l p-3 sm:border-t sm:border-l-0 sm:p-4"
				>
					<h2
						data-test-id="media_card_title"
						class="dark:text-toned group-hover:text-secondary truncate text-lg font-semibold transition-colors sm:text-xl"
						:title="title"
					>
						{{ title }}
					</h2>
					<slot />
				</div>
			</div>
		</UCard>
	</NuxtLink>
</template>
