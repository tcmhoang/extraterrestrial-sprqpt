import { vitePreprocess } from '@astrojs/svelte';
import combineDuplicatedSelectors from 'postcss-combine-duplicated-selectors';
import postcssPresetEnv from 'postcss-preset-env';
import purgecss from '@fullhuman/postcss-purgecss';
import cssnano from 'cssnano';
import * as path from '@std/path';

export default {
	extensions: ['.svelte'],
	'resolve.alias': {
		'@': path.resolve(import.meta.dirname ?? '', './src/'),
		'@styles': path.resolve(import.meta.dirname ?? '', './src/styles/'),
		'@components': path.resolve(
			import.meta.dirname ?? '',
			'./src/components/',
		),
		'@layouts': path.resolve(import.meta.dirname ?? '', './src/layouts/'),
		'@assets': path.resolve(import.meta.dirname ?? '', './src/assets/'),
		'@content': path.resolve(import.meta.dirname ?? '', './src/content/'),
		'@states': path.resolve(import.meta.dirname ?? '', './src/states/'),
	},
	preprocess: [
		vitePreprocess({
			style: {
				css: {
					postcss: {
						plugins: [
							purgecss.default({
								content: ['./**/*.css'],
							}),
							postcssPresetEnv({
								features: {
									'nesting-rules': {
										noIsPseudoSelector: false,
									},
								},
								minimumVendorImplementations: 2,
								browsers: '> 1%, last 2 versions, not dead',
							}),
							combineDuplicatedSelectors({
								removeDuplicatedProperties: true,
							}),
							cssnano({
								preset: 'default',
							}),
						],
					},
				},
			},
		}),
	],
};
