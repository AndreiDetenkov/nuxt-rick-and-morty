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

	runtimeConfig: {
		public: {
			baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
		},
	},

	compatibilityDate: 'latest',
});
