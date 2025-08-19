import { defineVitestConfig } from '@nuxt/test-utils/config';
import { resolve } from 'node:path';

const appDir = resolve(process.cwd(), 'app');

export default defineVitestConfig({
	test: {
		environment: 'nuxt',
		setupFiles: ['./tests/setup.ts'],
		globals: true,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			exclude: ['node_modules/', '.nuxt/', 'coverage/', 'tests/', '**/*.config.*', '**/*.test.*'],
		},
	},
	resolve: {
		alias: {
			'~': appDir,
			'@': appDir,
		},
	},
});
