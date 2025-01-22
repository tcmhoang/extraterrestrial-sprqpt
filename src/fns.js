import { k_hostname } from '@/consts.js';

export const build_title = (/** @type string */ title) =>
	`${title} • ${k_hostname}`;

const img_map = new Map([
	[
		'20240202-my-setup',
		{
			fetcher: async () => await import('./assets/danang-2021.png'),
			alt: 'A senere view from the balcony back in the day I was in Danang',
		},
	],
]);

export const fetch_blog_image_metadata = (/** @type string */ id) =>
	img_map.get(id);

export const format_date = (/** @type Date */ date) =>
	date.toLocaleDateString('en-US', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	});
