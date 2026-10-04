import { beforeEach, describe, expect, it } from 'vitest';
import { shallowMount, type VueWrapper } from '@vue/test-utils';
import BaseFooter from '~/components/base/base-footer.vue';

describe('BaseFooter', () => {
	let wrapper: VueWrapper;

	beforeEach(() => {
		wrapper = shallowMount(BaseFooter, {
			global: {
				stubs: {
					UFooter: {
						template: '<footer><slot name="left" /><slot /><slot name="right" /></footer>',
					},
					ULink: {
						template: '<a><slot /></a>',
					},
					UButton: {
						template: '<a />',
					},
				},
			},
		});
	});

	it('should render component', () => {
		expect(wrapper.find('[data-test-id="footer"]').exists()).toBe(true);
	});

	it('should link to the Rick and Morty API in a new tab', () => {
		const apiLink = wrapper.find('[data-test-id="footer_api_link"]');

		expect(apiLink.text()).toBe('The Rick and Morty API');
		expect(apiLink.attributes('to')).toBe('https://rickandmortyapi.com');
		expect(apiLink.attributes('target')).toBe('_blank');
	});

	it('should link to the GitHub repository in a new tab', () => {
		const githubLink = wrapper.find('[data-test-id="footer_github_link"]');

		expect(githubLink.attributes('to')).toBe(
			'https://github.com/AndreiDetenkov/nuxt-rick-and-morty',
		);
		expect(githubLink.attributes('target')).toBe('_blank');
		expect(githubLink.attributes('aria-label')).toBe('GitHub repository');
	});
});
