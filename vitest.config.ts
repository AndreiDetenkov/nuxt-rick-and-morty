import { defineVitestConfig } from '@nuxt/test-utils/config';
import { resolve } from 'node:path';

const appDir = resolve(process.cwd(), 'app');

export default defineVitestConfig({
	test: {
		environment: 'nuxt',
		setupFiles: ['./setup.ts'],
		globals: true,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			exclude: ['node_modules/', '.nuxt/', 'coverage/', 'tests/', '**/*.config.*', '**/*.test.*'],
		},
		onConsoleLog(log) {
			if (log.includes('<Suspense> is an experimental feature')) {
				return false;
			}
		},
	},
	resolve: {
		alias: {
			'~': appDir,
			'@': appDir,
		},
	},
});
