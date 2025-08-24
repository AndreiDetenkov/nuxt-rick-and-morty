import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount, type VueWrapper } from '@vue/test-utils';
import BaseColorModeBtn from '~/components/base/base-color-mode-btn.vue';

describe('BaseColorModeBtn.vue', () => {
	let wrapper: VueWrapper;

	const mountComponent = () => {
		wrapper = shallowMount(BaseColorModeBtn, {
			global: {
				stubs: {
					ClientOnly: {
						template: '<div><slot /></div>',
					},
					UButton: {
						template: '<button v-bind="$attrs" @click="$emit(\'click\')"><slot /></button>',
					},
				},
			},
		});
	};

	beforeEach(() => {
		mountComponent();
	});

	it('should renders the button', () => {
		const btn = wrapper.find('[data-test-id="color_mode_btn"]');
		expect(btn.exists()).toBe(true);
	});
});
