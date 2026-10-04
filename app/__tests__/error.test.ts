import { beforeEach, describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import type { NuxtError } from '#app';
import ErrorPage from '~/error.vue';

const { clearErrorMock } = vi.hoisted(() => ({ clearErrorMock: vi.fn() }));

mockNuxtImport('clearError', () => clearErrorMock);
mockNuxtImport('useRoute', () => () => ({ fullPath: '/characters' }));

function mountErrorPage(error: Partial<NuxtError>) {
	return shallowMount(ErrorPage, {
		props: { error: error as NuxtError },
		global: {
			stubs: {
				App: { template: '<div><slot /></div>' },
				UError: {
					props: ['error', 'icon'],
					template:
						'<main><p data-test-id="error_status">{{ error.status }}</p><h1 data-test-id="error_title">{{ error.statusText }}</h1><p data-test-id="error_message">{{ error.message }}</p><slot name="links" /></main>',
				},
				UButton: {
					props: ['label'],
					emits: ['click'],
					template: '<button @click="$emit(\'click\')">{{ label }}</button>',
				},
			},
		},
	});
}

describe('ErrorPage', () => {
	beforeEach(() => {
		clearErrorMock.mockReset();
	});

	it('should render status and status text of the error', () => {
		const wrapper = mountErrorPage({ status: 404, statusText: 'Character not found' });

		expect(wrapper.find('[data-test-id="error_status"]').text()).toBe('404');
		expect(wrapper.find('[data-test-id="error_title"]').text()).toBe('Character not found');
	});

	it('should fall back to generic title when status text is missing', () => {
		const wrapper = mountErrorPage({ status: 500 });

		expect(wrapper.find('[data-test-id="error_title"]').text()).toBe('Something went wrong');
	});

	it('should show only home button for not found error', () => {
		const wrapper = mountErrorPage({ status: 404 });

		expect(wrapper.find('[data-test-id="error_home_btn"]').exists()).toBe(true);
		expect(wrapper.find('[data-test-id="error_retry_btn"]').exists()).toBe(false);
	});

	it('should clear error and redirect home on home button click', async () => {
		const wrapper = mountErrorPage({ status: 404 });

		await wrapper.find('[data-test-id="error_home_btn"]').trigger('click');

		expect(clearErrorMock).toHaveBeenCalledWith({ redirect: '/' });
	});

	it('should clear error and reload current route on retry button click', async () => {
		await useRouter().replace('/character/5');
		const wrapper = mountErrorPage({ status: 500, statusText: "Couldn't load character" });

		await wrapper.find('[data-test-id="error_retry_btn"]').trigger('click');

		expect(clearErrorMock).toHaveBeenCalledWith({ redirect: '/character/5' });
	});
});
