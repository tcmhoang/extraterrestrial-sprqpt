// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
	site: 'https://sprqpt.com',
	integrations: [markdoc(), sitemap(), svelte({ extensions: ['.svelte'] })],
	experimental: {
		svg: true,
	},
	image: {
		service: passthroughImageService(),
	},
});
