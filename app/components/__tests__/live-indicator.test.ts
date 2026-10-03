import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { StatusEnum } from '#shared/types';
import LiveIndicator from '~/components/live-indicator.vue';

const STATUS_COLOR_CLASSES = ['bg-green-500', 'bg-red-500', 'bg-neutral-400'];

function mountLiveIndicator(status: string) {
	return shallowMount(LiveIndicator, { props: { status } });
}

describe('LiveIndicator.vue', () => {
	it('should render component', () => {
		const wrapper = mountLiveIndicator(StatusEnum.Alive);

		expect(wrapper.find('[data-test-id="live_indicator"]').exists()).toBe(true);
	});

	it.each([
		[StatusEnum.Alive, 'bg-green-500'],
		[StatusEnum.Dead, 'bg-red-500'],
		[StatusEnum.unknown, 'bg-neutral-400'],
	])('should apply only matching color for "%s" status', (status, expectedClass) => {
		const classes = mountLiveIndicator(status).classes();

		expect(classes).toContain(expectedClass);
		STATUS_COLOR_CLASSES.filter((colorClass) => colorClass !== expectedClass).forEach(
			(colorClass) => expect(classes).not.toContain(colorClass),
		);
	});

	it('should not apply any color for unexpected status', () => {
		const classes = mountLiveIndicator('Zombie').classes();

		STATUS_COLOR_CLASSES.forEach((colorClass) => expect(classes).not.toContain(colorClass));
	});
});
