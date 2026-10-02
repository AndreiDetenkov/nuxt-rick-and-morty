export default defineAppConfig({
	// https://ui.nuxt.com/getting-started/theme#design-system
	ui: {
		colors: {
			secondary: 'amber',
		},
		badge: {
			compoundVariants: [
				{ color: 'secondary', variant: 'subtle', class: 'text-secondary-700 dark:text-secondary' },
			],
		},
	},
});
