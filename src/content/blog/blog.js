// @ts-nocheck
const img_map = new Map([
	[
		'20240202-my-2024-setup',
		[
			'My 2021 Danang trip',
			async () => import('$lib/assets/danang-2021.png?enhanced&w=360'),
			async () =>
				import('$lib/assets/danang-2021.png?enhanced&w=600;360'),
		],
	],
]);

export default {
	fetch_id: (/** @type String */ date, /** @type string */ title) =>
		date.split('-').join('') +
		'-' +
		title.toLowerCase().split(' ').join('-'),

	/**
	 * @function
	 * @param {string} id
	 * @returns {[
	 * 	alt: string,
	 * 	thumbnail: () => Promise<any>,
	 * 	image: () => Promise<any>,
	 * ]}
	 */
	fetch_image: (id) => {
		return img_map.get(id);
	},
};
