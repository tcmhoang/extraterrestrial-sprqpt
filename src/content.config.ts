import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const tweet = defineCollection({
	loader: glob({ base: './src/content/tweet', pattern: '**/*.{md,mdoc}' }),
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

const base_schema = z.object({
	date: z.coerce.date(),
	title: z.string(),
	created: z.coerce.date(),
	excerpt: z.string(),
});
const tab = defineCollection({
	loader: glob({ base: './src/content/tab', pattern: '**/*.{md,mdoc}' }),
	schema: base_schema,
});

const master = defineCollection({
	loader: glob({ base: './src/content/', pattern: '*.{md,mdoc}' }),
	schema: base_schema,
});

const blog = defineCollection({
	loader: glob({ base: './src/content/blog/', pattern: '*.{md,mdoc}' }),
	schema: base_schema.extend({
		tags: z.string().array().optional().default([]),
	}),
});

export const collections = { tweet, tab, master, blog };
