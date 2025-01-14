// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
	site: 'https://sprqpt.com',
	integrations: [mdx(), sitemap(), svelte({ extensions: ['.svelte'] })],
	experimental: {
		svg: true,
	},
	image: {
		service: passthroughImageService(),
	},
});
