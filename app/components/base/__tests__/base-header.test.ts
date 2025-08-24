import { describe, it, expect, beforeEach } from 'vitest';
import type { VueWrapper } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';
import BaseHeader from '~/components/base/base-header.vue';

describe('BaseHeader', () => {
	let wrapper: VueWrapper;

	beforeEach(() => {
		wrapper = shallowMount(BaseHeader, {
			global: {
				stubs: {
					UContainer: {
						template: '<div><slot /></div>',
					},
				},
			},
		});
	});

	it('should render component', async () => {
		expect(wrapper.find('[data-test-id="header"]').exists()).toBe(true);
	});

	it('should render all sections', () => {
		expect(wrapper.find('[data-test-id="logo_section"]').exists()).toBe(true);
		expect(wrapper.find('[data-test-id="nav_section"]').exists()).toBe(true);
		expect(wrapper.find('[data-test-id="actions_section"]').exists()).toBe(true);
	});
});
