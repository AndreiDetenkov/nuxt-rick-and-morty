<script setup lang="ts">
import type { NuxtError } from '#app';
import BaseFooter from '~/components/base/base-footer.vue';
import BaseHeader from '~/components/base/base-header.vue';

const { error } = defineProps<{ error: NuxtError }>();

const router = useRouter();

const isNotFound = computed(() => error.status === 404);

const title = computed(
	() => error.statusText || (isNotFound.value ? 'Page not found' : 'Something went wrong'),
);

const description = computed(() =>
	isNotFound.value
		? 'This corner of the multiverse is empty. Maybe it never existed in this dimension.'
		: 'Something broke on our side of the portal. Please try again in a moment.',
);

useSeoMeta({
	title: () => title.value,
	robots: 'noindex',
});

function goHome() {
	return clearError({ redirect: '/' });
}

function retry() {
	return clearError({ redirect: router.currentRoute.value.fullPath });
}
</script>

<template>
	<UApp>
		<div class="grid min-h-screen grid-rows-[auto_1fr_auto]">
			<base-header />
			<UError
				data-test-id="error_page"
				:error="{ status: error.status, statusText: title, message: description }"
				:icon="isNotFound ? 'i-lucide-orbit' : 'i-lucide-circle-alert'"
				:clear="false"
				:ui="{
					statusCode: 'text-secondary',
					statusMessage: 'text-primary dark:text-primary-light',
				}"
			>
				<template #links>
					<UButton
						data-test-id="error_home_btn"
						label="Back to home"
						icon="i-lucide-house"
						size="lg"
						color="secondary"
						@click="goHome"
					/>
					<UButton
						v-if="!isNotFound"
						data-test-id="error_retry_btn"
						label="Try again"
						icon="i-lucide-rotate-cw"
						size="lg"
						color="neutral"
						variant="subtle"
						@click="retry"
					/>
				</template>
			</UError>
			<base-footer />
		</div>
	</UApp>
</template>
