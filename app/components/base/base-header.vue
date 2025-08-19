<template>
	<header class="h-16" data-test-id="header">
		<UContainer class="grid h-full grid-cols-[auto_1fr_auto] items-center gap-4">
			<section data-test-id="logo">
				<base-logo />
			</section>

			<section class="flex items-center justify-end" data-test-id="nav">
				<base-nav />
			</section>

			<section data-test-id="actions">
				<base-color-mode-btn />
			</section>
		</UContainer>
	</header>
</template>
