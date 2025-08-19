import { vi } from 'vitest';

// Mock Nuxt composables and components that might be used in tests
vi.mock('#app', () => ({
	useNuxtApp: () => ({
		$router: {
			push: vi.fn(),
			replace: vi.fn(),
			go: vi.fn(),
			back: vi.fn(),
			forward: vi.fn(),
		},
	}),
	navigateTo: vi.fn(),
}));
