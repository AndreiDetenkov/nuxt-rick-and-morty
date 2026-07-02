<script setup lang="ts">
const { generateRegistrationOptions, verificationResponse } = useWebAuth();

const email = ref();

function generate() {
	generateRegistrationOptions({ id: new Date().getTime(), email: email.value });
}
</script>

<template>
	<section class="py-10 lg:py-20">
		<UContainer>
			<UFormField label="Email" class="mb-2">
				<UInput
					v-model="email"
					placeholder="Enter your email"
					icon="i-lucide-at-sign"
					class="w-full max-w-sm"
				/>
			</UFormField>
			<UButton @click="generate">Registration</UButton>
			<pre>{{ verificationResponse }}</pre>
			<USeparator class="my-4" />
		</UContainer>
	</section>
</template>
