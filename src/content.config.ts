import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const tweet = defineCollection({
	loader: glob({ base: './src/content/tweet', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		date: z.coerce.date(),
		emo: z.string(),
		emodesc: z.string(),
		title: z.string().optional(),
		description: z.string(),
		pinned: z.boolean().optional().default(false),
		author: z.string().optional().default('Conrad'),
	}),
});

const tab = defineCollection({
	loader: glob({ base: './src/content/tab', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		date: z.coerce.date(),
		title: z.string(),
		created: z.coerce.date(),
		excerpt: z.string(),
	}),
});

export const collections = { tweet, tab };
