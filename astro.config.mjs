// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';

export const k_no_index_urls = ['resume'];

// https://astro.build/config
export default defineConfig({
	site: 'https://sprqpt.com',
	trailingSlash: 'never',
	prefetch: {
		prefetchAll: true,
	},
	integrations: [
		markdoc(),
		sitemap({
			filter: (page) => !k_no_index_urls.some((v) => page.endsWith(v)),
			lastmod: new Date(),
		}),
		svelte({ extensions: ['.svelte'] }),
	],
	experimental: {
		svg: true,
	},
	image: {
		service: passthroughImageService(),
	},
});
