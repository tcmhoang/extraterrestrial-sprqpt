import { component, defineMarkdocConfig } from '@astrojs/markdoc/config';
import shiki from '@astrojs/markdoc/shiki';

export default defineMarkdocConfig({
	tags: {
		cv: {
			render: component('./src/components/nodes/CV.astro'),
			attributes: {
				full_name: { type: String },
				title: { type: String },
				infos: { type: Array },
			},
		},
		link_me: {
			render: component('./src/components/nodes/LinkMe.astro'),
		},
		overview: {
			render: component('./src/components/nodes/Overview.astro'),
		},
		perma_link: {
			attributes: {
				id: { type: String },
			},
			render: component('./src/components/nodes/PermaLink.astro'),
		},
	},
	extends: [
		shiki({
			themes: {
				light: 'catppuccin-latte',
				dark: 'catppuccin-mocha',
			},
			defaultColor: false,
			wrap: true,
		}),
	],
});
