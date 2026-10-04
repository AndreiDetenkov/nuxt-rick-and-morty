<template>
	<UFooter data-test-id="footer" :ui="{ root: 'border-default border-t' }">
		<template #left>
			<p class="text-muted text-sm">
				Data from
				<ULink
					to="https://rickandmortyapi.com"
					target="_blank"
					data-test-id="footer_api_link"
					class="text-primary dark:text-primary-light hover:text-secondary dark:hover:text-secondary font-semibold transition-colors"
				>
					The Rick and Morty API
				</ULink>
			</p>
		</template>

		<template #right>
			<UButton
				to="https://github.com/AndreiDetenkov/nuxt-rick-and-morty"
				target="_blank"
				icon="i-lucide-github"
				variant="ghost"
				aria-label="GitHub repository"
				data-test-id="footer_github_link"
				class="text-primary dark:text-primary-light"
			/>
		</template>
	</UFooter>
</template>
