// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },

	modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/test-utils', '@nuxt/image'],

	css: ['~/assets/css/main.css'],

	icon: {
		customCollections: [
			{
				prefix: 'custom',
				dir: './app/assets/icons',
			},
		],
	},

	compatibilityDate: '2025-07-16',
});
