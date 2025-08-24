import { beforeEach, describe, expect, it } from 'vitest';
import { shallowMount, type VueWrapper } from '@vue/test-utils';
import BaseLogo from '~/components/base/base-logo.vue';

describe('BaseLogo.vue', () => {
	let wrapper: VueWrapper;

	beforeEach(() => {
		wrapper = shallowMount(BaseLogo, {
			global: {
				stubs: {
					ULink: {
						template: '<a><slot /></a>',
					},
					UIcon: {
						template: '<i><slot /></i>',
					},
				},
			},
		});
	});

	it('should render component', () => {
		expect(wrapper.find('[data-test-id="logo"]').exists()).toBe(true);
		expect(wrapper.find('[data-test-id="logo"]').attributes('to')).toEqual('/');
		expect(wrapper.findComponent('i').attributes('name')).toEqual('custom:logo');
	});
});
