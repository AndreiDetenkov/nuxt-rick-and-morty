import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import BaseHeader from '~/components/base/base-header.vue';

describe('BaseHeader', () => {
	it('should render component', async () => {
		const wrapper = shallowMount(BaseHeader, {
			global: {
				stubs: {
					UContainer: {
						template: '<div><slot /></div>',
					},
				},
			},
		});

		expect(wrapper.find('[data-test-id="header"]').exists()).toBe(true);
	});

	it('should render all sections', () => {
		const wrapper = shallowMount(BaseHeader, {
			global: {
				stubs: {
					UContainer: {
						template: '<div><slot /></div>',
					},
				},
			},
		});

		expect(wrapper.find('[data-test-id="logo"]').exists()).toBe(true);
		expect(wrapper.find('[data-test-id="nav"]').exists()).toBe(true);
		expect(wrapper.find('[data-test-id="actions"]').exists()).toBe(true);
	});
});
