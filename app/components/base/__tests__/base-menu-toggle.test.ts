import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import BaseMenuToggle from '~/components/base/base-menu-toggle.vue';

function mountToggle(open: boolean) {
	return shallowMount(BaseMenuToggle, {
		props: { open },
		global: {
			stubs: {
				UButton: {
					template: '<button><slot /></button>',
				},
			},
		},
	});
}

describe('BaseMenuToggle', () => {
	it('should render three burger lines', () => {
		const wrapper = mountToggle(false);

		expect(wrapper.find('[data-test-id="menu_toggle"]').exists()).toBe(true);
		expect(wrapper.findAll('svg > *').length).toBe(3);
	});

	it('should label button as open menu when closed', () => {
		const button = mountToggle(false).find('[data-test-id="menu_toggle"]');

		expect(button.attributes('aria-label')).toBe('Open menu');
		expect(button.attributes('aria-expanded')).toBe('false');
	});

	it('should label button as close menu when open', () => {
		const button = mountToggle(true).find('[data-test-id="menu_toggle"]');

		expect(button.attributes('aria-label')).toBe('Close menu');
		expect(button.attributes('aria-expanded')).toBe('true');
	});

	it('should emit click', async () => {
		const wrapper = mountToggle(false);

		await wrapper.find('[data-test-id="menu_toggle"]').trigger('click');

		expect(wrapper.emitted('click')).toBeTruthy();
	});
});
