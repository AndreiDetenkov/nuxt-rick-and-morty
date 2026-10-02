import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount, type VueWrapper } from '@vue/test-utils';
import BaseBackLink from '~/components/base/base-back-link.vue';

describe('BaseBackLink.vue', () => {
	let wrapper: VueWrapper;

	beforeEach(() => {
		wrapper = shallowMount(BaseBackLink, {
			props: {
				to: '/episodes',
				label: 'All episodes',
			},
			global: {
				stubs: {
					UButton: {
						template: '<a>{{ $attrs.label }}</a>',
					},
				},
			},
		});
	});

	it('should render component', () => {
		expect(wrapper.find('[data-test-id="back_link"]').exists()).toBe(true);
	});

	it('renders link with passed props', () => {
		const link = wrapper.find('[data-test-id="back_link"]');

		expect(link.text()).toBe('All episodes');
		expect(link.attributes('to')).toBe('/episodes');
		expect(link.attributes('icon')).toBe('i-lucide-arrow-left');
	});
});
