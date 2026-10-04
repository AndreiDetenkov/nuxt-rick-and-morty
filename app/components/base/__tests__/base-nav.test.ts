import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import type { NavigationMenuItem } from '@nuxt/ui';
import BaseNav from '~/components/base/base-nav.vue';

const UNavigationMenuStub = {
	name: 'UNavigationMenu',
	props: ['items', 'orientation'],
	template: '<nav />',
};

function mountNav(props: { orientation?: 'horizontal' | 'vertical' } = {}) {
	return shallowMount(BaseNav, {
		props,
		global: {
			stubs: {
				UNavigationMenu: UNavigationMenuStub,
			},
		},
	});
}

describe('BaseNav.vue', () => {
	it('should render component', () => {
		expect(mountNav().find('[data-test-id="nav"]').exists()).toBe(true);
	});

	it('should pass navigation items', () => {
		const items: NavigationMenuItem[] = mountNav()
			.findComponent(UNavigationMenuStub)
			.props('items');

		expect(items.map(({ label, to, icon }) => ({ label, to, icon }))).toEqual([
			{ label: 'Characters', to: '/characters', icon: 'i-lucide-users' },
			{ label: 'Episodes', to: '/episodes', icon: 'i-lucide-clapperboard' },
			{ label: 'Locations', to: '/locations', icon: 'i-lucide-orbit' },
		]);
	});

	it('should be horizontal by default', () => {
		expect(mountNav().findComponent(UNavigationMenuStub).props('orientation')).toBe('horizontal');
	});

	it('should be vertical when orientation prop is vertical', () => {
		expect(
			mountNav({ orientation: 'vertical' }).findComponent(UNavigationMenuStub).props('orientation'),
		).toBe('vertical');
	});
});
