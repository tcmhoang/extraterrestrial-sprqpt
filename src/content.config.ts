import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const tweet = defineCollection({
	loader: glob({ base: './src/content/tweet', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
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

export const collections = { tweet };
