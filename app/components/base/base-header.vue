<template>
	<header class="grid min-h-14 grid-cols-[auto_1fr_auto] items-center gap-4">
		<section>
			<ULink to="/">
				<UIcon
					name="custom-icon:logo"
					class="fill-primary dark:fill-primary-light size-10"
					mode="svg"
				/>
			</ULink>
		</section>

		<section class="flex items-center justify-end">
			<base-nav />
		</section>

		<section>
			<base-color-mode-btn />
		</section>
	</header>
</template>
