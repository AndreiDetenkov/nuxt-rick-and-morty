import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount, type VueWrapper } from '@vue/test-utils';
import BaseNav from '~/components/base/base-nav.vue';

describe('BaseNav.vue', () => {
	let wrapper: VueWrapper;

	beforeEach(() => {
		wrapper = shallowMount(BaseNav, {
			global: {
				stubs: {
					ULink: {
						template: '<a :class="$attrs.class" :href="$attrs.to"><slot /></a>',
					},
				},
			},
		});
	});

	it('should render component', () => {
		expect(wrapper.find('[data-test-id="nav"]').exists()).toBe(true);
	});

	it('renders navigation links correctly', () => {
		const navLinks = wrapper.findAll('[data-test-id="nav_link"]');

		expect(navLinks.length).toBe(2);

		expect(navLinks[0]).toBeDefined();
		expect(navLinks[1]).toBeDefined();

		expect(navLinks[0]!.text()).toBe('Characters');
		expect(navLinks[0]!.attributes('to')).toBe('/characters');

		expect(navLinks[1]!.text()).toBe('Episodes');
		expect(navLinks[1]!.attributes('to')).toBe('/episodes');
	});
});
