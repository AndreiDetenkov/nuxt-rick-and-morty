// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2026-07-02',

	devtools: { enabled: true },

	modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/test-utils/module', '@nuxt/image'],

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
		apiBaseUrl: 'https://rickandmortyapi.com/api',
	},

	experimental: {
		typedPages: true,
	},

	typescript: {
		typeCheck: true,
	},

	vite: {
		optimizeDeps: {
			include: ['@vue/devtools-core', '@vue/devtools-kit'],
		},
	},
});
