<script setup lang="ts">
const { registration, verificationResponse } = useWebAuth();

const email = ref();

function reg() {
	registration({ id: new Date().getTime(), email: email.value });
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
			<UButton @click="reg">Registration</UButton>
			<UAlert
				v-if="verificationResponse?.verified"
				title="Register successfully!"
				class="mt-4"
				color="success"
				icon="i-lucide-terminal"
			/>
			<USeparator class="my-4" />
		</UContainer>
	</section>
</template>
