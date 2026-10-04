import { describe, it, expect, beforeEach } from 'vitest';
import type { VueWrapper } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';
import BaseHeader from '~/components/base/base-header.vue';
import BaseLogo from '~/components/base/base-logo.vue';
import BaseNav from '~/components/base/base-nav.vue';
import BaseColorModeBtn from '~/components/base/base-color-mode-btn.vue';
import BaseMenuToggle from '~/components/base/base-menu-toggle.vue';

describe('BaseHeader', () => {
	let wrapper: VueWrapper;

	beforeEach(() => {
		wrapper = shallowMount(BaseHeader, {
			global: {
				stubs: {
					UHeader: {
						template:
							'<header><slot name="left" /><slot /><slot name="right" /><slot name="toggle" :open="false" :toggle="toggle" :ui="ui" /><slot name="body" /></header>',
						setup: () => ({ toggle: () => {}, ui: { toggle: () => '' } }),
					},
				},
			},
		});
	});

	it('should render component', () => {
		expect(wrapper.find('[data-test-id="header"]').exists()).toBe(true);
	});

	it('should render logo and color mode button', () => {
		expect(wrapper.findComponent(BaseLogo).exists()).toBe(true);
		expect(wrapper.findComponent(BaseColorModeBtn).exists()).toBe(true);
	});

	it('should render horizontal nav for desktop and vertical nav for mobile menu', () => {
		const navs = wrapper.findAllComponents(BaseNav);

		expect(navs.length).toBe(2);
		expect(navs[0]!.props('orientation')).toBe('horizontal');
		expect(navs[1]!.props('orientation')).toBe('vertical');
	});

	it('should render animated menu toggle', () => {
		const toggle = wrapper.findComponent(BaseMenuToggle);

		expect(toggle.exists()).toBe(true);
		expect(toggle.props('open')).toBe(false);
	});
});
